import { createAnimatedFunctionalComponent } from "@app/core/animations/createAnimatedFunctionalComponent";
import { color } from "@app/core/theme/color";
import { t } from "@lingui/macro";
import { lerp } from "@madeja-studio/cepillo";
import { Button, Row, VectorIcon } from "@madeja-studio/telar";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { TextInput, View } from "react-native";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";

const AnimatedRow = createAnimatedFunctionalComponent(Row);

export interface SearchBarRef {
  setSearch: (text: string) => void;
}

interface Props {
  onSearchChange: (search: string) => Promise<void> | void;
  scroll: number;
}

export const SearchBar = forwardRef<SearchBarRef, Props>(
  ({ onSearchChange, scroll }, ref) => {
    const [searchText, setSearchText] = useState("");
    const opacity = useSharedValue(1);
    const bottom = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: -bottom.value }],
    }));

    useEffect(() => {
      opacity.value = 1 - lerp(scroll, { max: 40, min: 0 });
      bottom.value = 0.75 * Math.max(0, scroll);
    }, [scroll]);

    const onSearch = useCallback(
      (text: string) => {
        setSearchText(text);
        onSearchChange(text);
      },
      [onSearchChange]
    );

    useImperativeHandle(ref, () => ({
      setSearch: (text) => onSearch(`${searchText} ${text}`),
    }));

    return (
      <AnimatedRow
        style={[
          tw`justify-between items-center px-4 mb-4 absolute`,
          animatedStyle,
        ]}
      >
        <View
          style={tw`bg-ash opacity-10 rounded-full absolute inset-0 mx-4`}
        />

        <VectorIcon
          color={color.coldAsh}
          icon={{ family: "Feather", name: "search" }}
          size={24}
          style={tw`ml-4`}
        />

        <TextInput
          onChangeText={onSearch}
          placeholder={t`Search project...`}
          placeholderTextColor={color.coldAsh}
          style={tw`body py-4 flex-1 ml-2`}
          value={searchText}
        />

        <Button.Icon
          icon={{ family: "Feather", name: "x-circle" }}
          iconTint={color.coldAsh}
          onPress={() => onSearch("")}
          style={tw.style(`mr-2`, { display: searchText ? "flex" : "none" })}
          variant="text"
        />
      </AnimatedRow>
    );
  }
);
