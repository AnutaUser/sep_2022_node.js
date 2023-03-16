import { EEmailActions } from "../enums";

export const emailTemplates = {
  [EEmailActions.WELCOME]: {
    subject: "Welcome on board",
    template: "welcome",
  },

  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Opps looks like you forgot password",
    template: "forgot-password",
  },

  [EEmailActions.LOGOUT]: {
    subject: "Account was blocked",
    template: "logout",
  },

  [EEmailActions.DELETE_ACCOUNT]: {
    subject: "Account was deleted",
    template: "delete-account",
  },
};
