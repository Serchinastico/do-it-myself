import { Platform } from "react-native";
import {
  RequestPurchase,
  getAvailablePurchases,
  getProducts,
  requestPurchase as requestIapPurchase,
} from "react-native-iap";

export const useInAppPurchase = () => {
  const getAvailableProducts = () => getProducts({ skus: ["full_version"] });

  const getPurchaseOptions = (sku: string): RequestPurchase => {
    switch (Platform.OS) {
      case "android":
        return {
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
          skus: [sku],
        };
      case "ios":
      default:
        return {
          andDangerouslyFinishTransactionAutomaticallyIOS: false,
          sku,
        };
    }
  };

  const requestPurchase = (sku: string) => {
    try {
      return requestIapPurchase(getPurchaseOptions(sku));
    } catch (err: any) {
      console.log(err.code, err.message);
      return null;
    }
  };

  const hasPurchasedApp = async (): Promise<boolean> => {
    const purchases = await getAvailablePurchases();
    return purchases.length > 0;
  };

  return {
    getAvailableProducts,
    hasPurchasedApp,
    requestPurchase,
  };
};
