import { Accordion } from "@app/core/components/Accordion";
import { Cue } from "@app/core/components/Cue";
import { ScrollView } from "@app/core/components/ScrollView";
import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { Layout, LayoutId } from "@app/domain/project/export";
import { t } from "@lingui/macro";
import { Button, Column, Row } from "@madeja-studio/telar";
import { Image, View } from "react-native";

interface Props {
  onLayoutSelect: (layoutId: LayoutId) => Promise<void> | void;
  selectedLayoutId: LayoutId;
}

export const ExportLayoutPicker = ({
  onLayoutSelect,
  selectedLayoutId,
}: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();
  const { colorScheme } = useColorSwitch();

  return (
    <Accordion
      childrenHeight={220}
      fieldName={t`Layout`}
      selectedValue={Layout[selectedLayoutId].name}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[tw`px-4`]}
      >
        <Row style={tw`gap-4`}>
          {Object.entries(Layout).map(([id, layout]) => (
            <Button.Container
              hasHapticFeedback={isHapticFeedbackEnabled}
              key={id}
              onPress={() => onLayoutSelect(id as LayoutId)}
            >
              <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                <View style={tw`w-[100px] aspect-square`}>
                  <Image
                    source={layout.getPreview(colorScheme ?? "light")}
                    style={tw.style(`contain`, {
                      height: 100,
                      width: 100,
                    })}
                  />
                </View>
                <Cue.Selectable isSelected={id === selectedLayoutId} key={id}>
                  {layout.name.replace("-", "\n")}
                </Cue.Selectable>
              </Column>
            </Button.Container>
          ))}
        </Row>
      </ScrollView>
    </Accordion>
  );
};
