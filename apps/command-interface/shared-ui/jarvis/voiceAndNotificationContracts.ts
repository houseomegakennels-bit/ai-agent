export interface VoiceCommandContract {
  rawVoiceCanExecuteDestructiveAction: false;
  requiresTranscriptReview: true;
  requiresConfirmationForPaidSecurityDeploymentTrading: true;
  captionsRequired: true;
  textAlternativeRequired: true;
  implementedRuntime: false;
}

export interface NotificationContract {
  telegramPrimary: true;
  pwaSecondary: true;
  deduplicateBySeverityAndChannel: true;
  implementedRuntime: false;
}

export const voiceCommandContract: VoiceCommandContract = {
  rawVoiceCanExecuteDestructiveAction: false,
  requiresTranscriptReview: true,
  requiresConfirmationForPaidSecurityDeploymentTrading: true,
  captionsRequired: true,
  textAlternativeRequired: true,
  implementedRuntime: false,
};

export const notificationContract: NotificationContract = {
  telegramPrimary: true,
  pwaSecondary: true,
  deduplicateBySeverityAndChannel: true,
  implementedRuntime: false,
};
