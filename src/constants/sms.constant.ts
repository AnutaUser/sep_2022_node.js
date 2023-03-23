import { ESmsActions } from "../enums";

export const smsTemplates: { [key: string]: string } = {
  [ESmsActions.WELCOME]: "Welcome to us",
  [ESmsActions.FORGOT_PASSWORD]:
    "Forgot your password? Just follow all steps & everything will be OK)",
  [ESmsActions.REMINDER]: `Hello my dear friend! Remind, that you were missing too long! https://google.com`,
};
