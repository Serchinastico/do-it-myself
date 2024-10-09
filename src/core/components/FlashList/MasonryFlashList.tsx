import {
  MasonryFlashListProps,
  MasonryFlashList as MasonryShopifyFlashList,
} from "@shopify/flash-list";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type MasonryFlashListNoEmptyComponent<TItem> = Omit<
  MasonryFlashListProps<TItem>,
  "ListEmptyComponent"
>;

interface Props<TItem> extends MasonryFlashListNoEmptyComponent<TItem> {
  ListEmptyComponent: React.ReactNode;
  ListEmptyComponentStyle?: StyleProp<ViewStyle> | undefined;
}

export const MasonryFlashList = <T,>({
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

  return <MasonryShopifyFlashList {...props} />;
};
