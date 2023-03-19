import { EEmailActions } from "../enums";

export const emailTemplates: {
  [key: string]: { subject: string; template: string };
} = {
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

  [EEmailActions.ACTIVATE]: {
    subject: "Account was activated",
    template: "activate",
  },
};
