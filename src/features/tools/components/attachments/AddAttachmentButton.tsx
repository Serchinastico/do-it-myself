import { Button } from "@app/core/components/Button";
import { ImageSource } from "@app/core/utils/imagePicker";
import { t } from "@lingui/macro";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";

interface Props {
  onAddAttachment: (source: ImageSource) => Promise<void> | void;
}

export const AddAttachmentButton = ({ onAddAttachment }: Props) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <DropdownMenu.Root
      style={tw.style(`absolute mb-4 inset-x-0 shadow-lg`, { bottom })}
    >
      <DropdownMenu.Trigger>
        <Button
          icon={{ family: "Feather", name: "plus" }}
          text={t`Add attachment`}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item
          key="library"
          onSelect={() => onAddAttachment("media_library")}
        >
          <DropdownMenu.ItemTitle>{t`Photo Library`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>

        <DropdownMenu.Item
          key="camera"
          onSelect={() => onAddAttachment("camera")}
        >
          <DropdownMenu.ItemTitle>{t`Take Photo`}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
