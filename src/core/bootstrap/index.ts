import "./translations";
import "./tw";

/**
 * We need 👆 those imports to be before anything else
 * that's why we ignore perfectionist's rules
 */

import * as SplashScreen from "expo-splash-screen";

export const bootstrap = () => {
  SplashScreen.preventAutoHideAsync();
  /**
   * Put here everything that must be executed before the app
   * loads
   */
};
