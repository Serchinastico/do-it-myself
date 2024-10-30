import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { Dimensions, Image, ImageProps } from "react-native";
import { ImageSourcePropType } from "react-native/Libraries/Image/Image";
import invariant from "tiny-invariant";

interface Props extends Omit<ImageProps, "source"> {
  heightWindowRatio: `${number}/${number}`;
  name:
    | "app_purchased"
    | "arrow"
    | "confirmation"
    | "error"
    | "no_media"
    | "not_found"
    | "paywall"
    | "purchase"
    | "settings";
}

type ImageName = Props["name"];
type IllustrationName = `${ImageName}_${"dark" | "light"}`;

const illustrationMap: Record<IllustrationName, () => ImageSourcePropType> = {
  app_purchased_dark: () => require("@assets/img/app_purchased_dark.png"),
  app_purchased_light: () => require("@assets/img/app_purchased_light.png"),
  arrow_dark: () => require("@assets/img/arrow.png"),
  arrow_light: () => require("@assets/img/arrow.png"),
  confirmation_dark: () => require("@assets/img/confirmation_dark.png"),
  confirmation_light: () => require("@assets/img/confirmation_light.png"),
  error_dark: () => require("@assets/img/error_dark.png"),
  error_light: () => require("@assets/img/error_light.png"),
  no_media_dark: () => require("@assets/img/no_media_dark.png"),
  no_media_light: () => require("@assets/img/no_media_light.png"),
  not_found_dark: () => require("@assets/img/not_found_dark.png"),
  not_found_light: () => require("@assets/img/not_found_light.png"),
  paywall_dark: () => require("@assets/img/paywall_dark.png"),
  paywall_light: () => require("@assets/img/paywall_light.png"),
  purchase_dark: () => require("@assets/img/purchase_dark.png"),
  purchase_light: () => require("@assets/img/purchase_light.png"),
  settings_dark: () => require("@assets/img/settings_dark.png"),
  settings_light: () => require("@assets/img/settings_light.png"),
};

export const Illustration = ({
  heightWindowRatio,
  name,
  style,
  ...props
}: Props) => {
  const { colorScheme } = useColorSwitch();
  const { height: windowHeight } = Dimensions.get("window");

  const [a, b] = heightWindowRatio
    .split("/")
    .map((n) => Number.parseInt(n, 10));
  const height = (windowHeight * a) / b;

  const illustrationName: IllustrationName = `${name}_${colorScheme ?? "light"}`;
  invariant(illustrationMap[illustrationName]);
  const source = illustrationMap[illustrationName]();

  return (
    <Image
      source={source}
      style={[tw`contain`, { height }, style]}
      {...props}
    />
  );
};
