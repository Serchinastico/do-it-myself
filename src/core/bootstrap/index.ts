import "./translations";
import "./tw";

import { configureGoogleSignIn } from "@app/core/bootstrap/googleSignIn";
import * as SplashScreen from "expo-splash-screen";

export const bootstrap = async () => {
  await SplashScreen.preventAutoHideAsync();
  /**
   * Put here everything that must be executed before the app
   * loads
   */
  configureGoogleSignIn();
};
