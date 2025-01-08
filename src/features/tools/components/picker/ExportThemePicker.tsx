import { Accordion } from "@app/core/components/Accordion";
import { Cue } from "@app/core/components/Cue";
import { ScrollView } from "@app/core/components/ScrollView";
import { useHapticFeedback } from "@app/core/hooks/useHapticFeedback";
import { ExportTheme, ExportThemeId } from "@app/domain/project/export";
import { t } from "@lingui/core/macro";
import { Button, Column, Row } from "@madeja-studio/telar";
import { Image, View } from "react-native";

interface Props {
  onThemeSelect: (themeId: ExportThemeId) => Promise<void> | void;
  selectedThemeId: ExportThemeId;
}

export const ExportThemePicker = ({
  onThemeSelect,
  selectedThemeId,
}: Props) => {
  const { isHapticFeedbackEnabled } = useHapticFeedback();

  return (
    <Accordion
      childrenHeight={220}
      fieldName={t`Theme`}
      selectedValue={ExportTheme[selectedThemeId].name}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[tw`px-4`]}
      >
        <Row style={tw`gap-4 center`}>
          {Object.entries(ExportTheme).map(([id, theme]) => (
            <Button.Container
              hasHapticFeedback={isHapticFeedbackEnabled}
              key={id}
              onPress={() => onThemeSelect(id as ExportThemeId)}
            >
              <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                <View style={tw`w-[100px] aspect-square`}>
                  <Image
                    source={theme.getPreview()}
                    style={tw.style(`contain`, {
                      height: 100,
                      width: 100,
                    })}
                  />
                </View>

                <Cue.Selectable isSelected={id === selectedThemeId} key={id}>
                  {theme.name.replace("-", "\n")}
                </Cue.Selectable>
              </Column>
            </Button.Container>
          ))}
        </Row>
      </ScrollView>
    </Accordion>
  );
};
