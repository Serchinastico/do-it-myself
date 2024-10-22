import { useCallback, useState } from "react";
import { Platform } from "react-native";
import {
  Product as IapProduct,
  RequestPurchase,
  getAvailablePurchases,
  getProducts,
  requestPurchase as requestIapPurchase,
} from "react-native-iap";
import useAsyncEffect from "use-async-effect";

interface Product {
  iapProduct: IapProduct;
  priceTag: string;
}

const formatPrice = (product: IapProduct) => {
  const price = product.price.replaceAll(/[^0-9,.]+/g, "");

  switch (product.currency) {
    case "EUR":
      return `${price}€`;
    case "USD":
      return `$${price}`;
    default:
      return product.price;
  }
};

export const useInAppPurchase = () => {
  const [product, setProduct] = useState<Product | null>(null);

  const getAvailableProducts = useCallback(
    () => getProducts({ skus: ["full_version"] }),
    []
  );

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

  useAsyncEffect(async () => {
    const products = await getAvailableProducts();
    const iapProduct = products[0];

    if (!iapProduct) {
      return;
    }

    setProduct({ iapProduct, priceTag: formatPrice(iapProduct) });
  }, [getAvailableProducts]);

  return {
    getAvailableProducts,
    hasPurchasedApp,
    product,
    requestPurchase,
  };
};
