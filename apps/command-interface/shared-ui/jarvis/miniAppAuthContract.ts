export interface TelegramMiniAppAuthContract {
  validatesSignedInitDataServerSide: true;
  enforcesAllowedTelegramUserIdServerSide: true;
  trustsDisplayName: false;
  trustsClientSideIdentityOnly: false;
  sessionExpires: true;
  realSecretRequiredInRepo: false;
  implementedRuntime: false;
}

export const telegramMiniAppAuthContract: TelegramMiniAppAuthContract = {
  validatesSignedInitDataServerSide: true,
  enforcesAllowedTelegramUserIdServerSide: true,
  trustsDisplayName: false,
  trustsClientSideIdentityOnly: false,
  sessionExpires: true,
  realSecretRequiredInRepo: false,
  implementedRuntime: false,
};
