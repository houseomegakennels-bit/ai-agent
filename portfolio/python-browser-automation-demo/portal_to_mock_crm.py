"""AI-assisted application demo. Synthetic portal -> Playwright -> LOCAL mock CRM.
Not a paid-client case study or a live GoHighLevel integration.
Only loopback HTTP is allowed; no credentials, private data, or external writes.
"""
from __future__ import annotations

import argparse
import json
import re
import threading
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import urlsplit

from playwright.sync_api import sync_playwright

ROWS = [
    {"source_id": "demo-001", "name": "Alex Example", "email": "alex@example.test"},
    {"source_id": "demo-002", "name": "Morgan Sample", "email": "morgan@example.test"},
    {"source_id": "demo-003", "name": "Invalid Demo", "email": "not-an-email"},
]
STYLE = """body{font:16px/1.6 system-ui;background:#eef2f6;color:#182335;margin:0;padding:40px}
main{max-width:1020px;margin:auto}h1{line-height:1.15;font-size:36px;margin:18px 0}
.card{background:white;border:1px solid #dce3eb;border-radius:14px;padding:26px;margin-top:20px}
table{border-collapse:collapse;width:100%;margin-top:18px}td,th{text-align:left;padding:14px 10px;border-bottom:1px solid #e4e9ef}
th{font-size:13px;text-transform:uppercase;color:#516378}.badge{font-size:13px;background:#142b46;color:white;padding:7px 12px;border-radius:30px}
.small{font-size:14px;color:#536276}pre{white-space:pre-wrap;font-size:14px}b{color:#195d4b}footer{margin-top:24px;font-size:13px;color:#536276}"""


def validate_record(raw: dict[str, Any]) -> dict[str, str]:
    """Validate stable identity and required fields before any mock CRM write."""
    if not isinstance(raw, dict):
        raise ValueError("Record must be an object")
    keys = ("source_id", "name", "email")
    if any(not isinstance(raw.get(key), str) for key in keys):
        raise ValueError("Required fields must be strings")
    record = {key: raw[key].strip() for key in keys}
    if not record["source_id"] or not record["name"]:
        raise ValueError("Missing source ID or name")
    record["email"] = record["email"].lower()
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", record["email"]):
        raise ValueError("Invalid demo email")
    return record


def require_loopback(url: str) -> None:
    parsed = urlsplit(url)
    if parsed.scheme != "http" or parsed.hostname != "127.0.0.1" or parsed.username or parsed.password:
        raise ValueError("This demonstration only permits http://127.0.0.1 URLs")


def json_request(url: str, record: dict[str, str]) -> dict[str, Any]:
    require_loopback(url)
    request = urllib.request.Request(url, data=json.dumps(record).encode(),
                                     headers={"Content-Type": "application/json"}, method="POST")
    # No externally supplied redirects are used by the local fixture server.
    with urllib.request.urlopen(request, timeout=5) as response:
        if response.status != 200:
            raise RuntimeError(f"Unexpected mock CRM response: {response.status}")
        return json.load(response)


def scrape_and_sync(page: Any, base: str, fixture_html: str) -> dict[str, Any]:
    require_loopback(base)
    # A synthetic HTML fixture, not a live customer portal.
    page.set_content(fixture_html, wait_until="domcontentloaded", timeout=10000)
    table = page.get_by_test_id("lead-table")
    table.wait_for(state="visible", timeout=5000)
    rows = table.locator("tbody tr")
    synced, rejected = [], []
    for index in range(rows.count()):
        row = rows.nth(index)
        raw = {"source_id": row.get_attribute("data-source-id"),
               "name": row.locator("td").nth(0).inner_text(),
               "email": row.locator("td").nth(1).inner_text()}
        try:
            record = validate_record(raw)
        except ValueError as error:
            rejected.append({"source_id": raw["source_id"], "reason": str(error)})
            continue
        synced.append(json_request(f"{base}/mock-crm/upsert", record))
    return {"synced": synced, "rejected": rejected}


def run_demo(output: Path) -> dict[str, Any]:
    from html import escape
    output.mkdir(parents=True, exist_ok=True)
    contacts: dict[str, dict[str, str]] = {}
    report: dict[str, Any] = {}
    lock = threading.Lock()

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_: Any) -> None:
            pass

        def reply(self, data: bytes, content_type: str, status: int = 200) -> None:
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Content-Length", str(len(data)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(data)

        def do_GET(self) -> None:
            if self.path == "/portal":
                table_rows = "".join(f'<tr data-source-id="{escape(r["source_id"])}"><td>{escape(r["name"])}</td><td>{escape(r["email"])}</td></tr>' for r in ROWS)
                content = f'<span class="badge">BLACKSPIRE / ORIGINAL APPLICATION SAMPLE</span><h1>Portal to CRM automation</h1><p>Playwright extracts a local test portal and sends validated records to a local mock CRM.</p><section class="card"><h2>Synthetic source portal</h2><table data-testid="lead-table"><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>{table_rows}</tbody></table></section>'
            elif self.path == "/results":
                table_rows = "".join(f'<tr><td>{escape(r["source_id"])}</td><td>{escape(r["name"])}</td><td>{escape(r["email"])}</td></tr>' for r in contacts.values())
                content = f'<span class="badge">BLACKSPIRE / VERIFIED LOCAL DEMO</span><h1>Extract. Validate. Sync once.</h1><p>A working AI-assisted Python + Playwright example, created for this application.</p><section class="card"><h2>Observed end-to-end results</h2><p><b>{len(contacts)} unique mock CRM records</b> after two complete browser runs.</p><p>Each run rejected the malformed email. Re-running reused existing source IDs instead of creating duplicate records.</p><table><thead><tr><th>Source ID</th><th>Name</th><th>Email</th></tr></thead><tbody>{table_rows}</tbody></table></section><section class="card"><h2>Scope and limits</h2><p>All records are synthetic. A synthetic HTML fixture is loaded directly into the browser. Python sends validated records to a localhost mock CRM; the browser makes no network requests.</p><p>This is not a live GoHighLevel test, a customer deployment, or a production-ready bot. Real portal login, field mapping, permissions, retries and live API behavior must be scoped and verified separately.</p></section>'
            else:
                self.reply(b"Not found", "text/plain", 404)
                return
            html = f'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Blackspire | Local browser automation demo</title><style>{STYLE}</style><main>{content}<footer>New AI-assisted application demonstration. Not a claim of previous paid client work.</footer></main></html>'
            self.reply(html.encode(), "text/html; charset=utf-8")

        def do_POST(self) -> None:
            if self.path != "/mock-crm/upsert":
                self.reply(b"Not found", "text/plain", 404)
                return
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if not 0 < length <= 4096:
                    raise ValueError("Invalid request length")
                record = validate_record(json.loads(self.rfile.read(length)))
                with lock:
                    exists = record["source_id"] in contacts
                    contacts[record["source_id"]] = record
                result = {"source_id": record["source_id"], "action": "updated" if exists else "created"}
                self.reply(json.dumps(result).encode(), "application/json")
            except (ValueError, TypeError, json.JSONDecodeError):
                self.reply(b'{"error":"Invalid demo record"}', "application/json", 400)

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{server.server_port}"
    try:
        with sync_playwright() as p:
            import shutil
            executable = shutil.which("chromium") or shutil.which("google-chrome")
            browser = p.chromium.launch(headless=True, executable_path=executable,
                                        args=["--no-sandbox"] if executable else [])
            context = browser.new_context(viewport={"width": 1160, "height": 920})
            # The demo browser loads supplied HTML and makes no network requests.
            context.route("**/*", lambda route: route.abort())
            page = context.new_page()
            with urllib.request.urlopen(f"{base}/portal", timeout=5) as response:
                fixture_html = response.read().decode()
            first = scrape_and_sync(page, base, fixture_html)
            second = scrape_and_sync(page, base, fixture_html)
            checks = {
                "first_run_created_two": [r["action"] for r in first["synced"]] == ["created", "created"],
                "second_run_updated_two": [r["action"] for r in second["synced"]] == ["updated", "updated"],
                "first_run_rejected_bad_email": len(first["rejected"]) == 1,
                "second_run_rejected_bad_email": len(second["rejected"]) == 1,
                "no_duplicate_contacts": len(contacts) == 2,
                "stable_ids_preserved": set(contacts) == {"demo-001", "demo-002"},
                "invalid_row_never_written": "demo-003" not in contacts,
                "email_mapping_correct": contacts["demo-001"]["email"] == "alex@example.test",
            }
            report = {"kind": "new_application_sample", "live_ghl_tested": False,
                      "checks": checks, "passed": sum(checks.values()), "total": len(checks),
                      "first_run": first, "second_run": second, "unique_contacts": len(contacts)}
            (output / "run_report.json").write_text(json.dumps(report, indent=2))
            if not all(checks.values()):
                raise RuntimeError("End-to-end assertion failure; see run_report.json")
            with urllib.request.urlopen(f"{base}/results", timeout=5) as response:
                results_html = response.read().decode()
            page.set_content(results_html, wait_until="domcontentloaded")
            page.screenshot(path=str(output / "demo_results.png"), full_page=True)
            context.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)
    return report


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("evidence"))
    arguments = parser.parse_args()
    result = run_demo(arguments.output)
    print(json.dumps(result, indent=2))
