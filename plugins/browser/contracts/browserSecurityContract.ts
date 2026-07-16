export interface BrowserSecurityContract {
  publicControlPortAllowed: false;
  dockerSocketExposed: false;
  secretsMountedIntoBrowser: false;
  captchaBypassAllowed: false;
  proxyFingerprintRotationAllowed: false;
  parallelTradingViewSessionsAllowed: false;
  implementedRuntime: false;
}

export const browserSecurityContract: BrowserSecurityContract = {
  publicControlPortAllowed: false,
  dockerSocketExposed: false,
  secretsMountedIntoBrowser: false,
  captchaBypassAllowed: false,
  proxyFingerprintRotationAllowed: false,
  parallelTradingViewSessionsAllowed: false,
  implementedRuntime: false,
};
