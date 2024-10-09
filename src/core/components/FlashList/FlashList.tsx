import {
  FlashListProps,
  FlashList as ShopifyFlashList,
} from "@shopify/flash-list";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type FlashListNoEmptyComponent<TItem> = Omit<
  FlashListProps<TItem>,
  "ListEmptyComponent"
>;

interface Props<TItem> extends FlashListNoEmptyComponent<TItem> {
  ListEmptyComponent: React.ReactNode;
  ListEmptyComponentStyle?: StyleProp<ViewStyle> | undefined;
}

export const FlashList = <T,>({
  ListEmptyComponent,
  ListEmptyComponentStyle,
  ...props
}: Props<T>) => {
  if (props.data?.length === 0) {
    return (
      <View style={[tw`flex-1`, ListEmptyComponentStyle]}>
        {ListEmptyComponent}
      </View>
    );
  }

  return <ShopifyFlashList {...props} />;
};
