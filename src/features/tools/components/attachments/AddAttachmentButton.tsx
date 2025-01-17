import { Button } from "@app/core/components/Button";
import { ImageSource } from "@app/core/utils/mediaAssetPicker";
import { t } from "@lingui/core/macro";
import { useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";

interface Props {
  onAddAttachment: (source: ImageSource) => Promise<void> | void;
}

export const AddAttachmentButton = ({ onAddAttachment }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const addAttachment = useCallback(
    async (source: ImageSource) => {
      setIsLoading(true);

      try {
        await onAddAttachment(source);
      } finally {
        setIsLoading(false);
      }
    },
    [onAddAttachment]
  );

  return (
    <DropdownMenu.Root
      // @ts-expect-error DropdownMenu.Root prop type does not accept style, but it actually uses it
      style={tw.style(`absolute mb-4 inset-x-0 shadow-lg`, { bottom })}
    >
      <DropdownMenu.Trigger>
        <Button
          icon={{ family: "Feather", name: "plus" }}
          isLoading={isLoading}
          text={t`Add attachment`}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="library"
          onSelect={() => addAttachment("media_library")}
        >
          <DropdownMenu.ItemTitle>{t`Photo Library`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          key="camera"
          onSelect={() => addAttachment("camera")}
        >
          <DropdownMenu.ItemTitle>{t`Take Photo`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
