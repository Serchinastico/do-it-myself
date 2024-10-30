import { Accordion, AccordionRef } from "@app/core/components/Accordion";
import { Button as DIMButton } from "@app/core/components/Button";
import { Cue } from "@app/core/components/Cue";
import { SafeArea } from "@app/core/components/SafeArea";
import { ScrollView } from "@app/core/components/ScrollView";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import {
  ExportTheme,
  ExportThemeId,
  Layout,
  LayoutId,
} from "@app/domain/project/export";
import { t } from "@lingui/macro";
import { Button, Column, Row, SafeAreaViewEdges } from "@madeja-studio/telar";
import { useAtomValue } from "jotai";
import { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToolHeader } from "../components/headers";

export const ExportManualScreen = ({
  navigation,
  route,
}: RootScreenProps<"exportManual">) => {
  const { projectId } = route.params;
  const project = useAtomValue(derivedAtoms.projectAtomFamily(projectId));
  const [selectedExportThemeId, setSelectedExportThemeId] =
    useState<ExportThemeId>("dim");
  const [selectedLayoutId, setSelectedLayoutId] =
    useState<LayoutId>("landscape2pages");
  const themeAccordionRef = useRef<AccordionRef>(null);
  const layoutAccordionRef = useRef<AccordionRef>(null);
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeArea edges={SafeAreaViewEdges.NoVertical}>
      <ToolHeader.ExportManual onClose={() => navigation.goBack()} />

      <ScrollView style={tw`pb-8`}>
        <Column style={tw`px-4`}>
          <Text>{t`Export your manual to a PDF file you can print and store along with your finished project for future reference and maintenance, or share it with anyone.`}</Text>

          <Accordion
            childrenHeight={220}
            fieldName={t`Theme`}
            ref={themeAccordionRef}
            selectedValue={ExportTheme[selectedExportThemeId].name}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={[tw`px-4`]}
            >
              <Row style={tw`gap-4 center`}>
                {Object.entries(ExportTheme).map(([id, theme]) => (
                  <Button.Container
                    hasHapticFeedback
                    key={id}
                    onPress={() =>
                      setSelectedExportThemeId(id as ExportThemeId)
                    }
                  >
                    <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                      <View
                        style={tw`w-[100px] aspect-square border rounded-2`}
                      >
                        <Image
                          source={require("@assets/img/dim-theme.png")}
                          style={tw.style(`contain`, {
                            height: 100,
                            width: 100,
                          })}
                        />
                      </View>

                      <Cue.Selectable
                        isSelected={id === selectedExportThemeId}
                        key={id}
                      >
                        {theme.name.replace("-", "\n")}
                      </Cue.Selectable>
                    </Column>
                  </Button.Container>
                ))}
              </Row>
            </ScrollView>
          </Accordion>

          <Accordion
            childrenHeight={220}
            fieldName={t`Layout`}
            ref={layoutAccordionRef}
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
                    hasHapticFeedback
                    key={id}
                    onPress={() => setSelectedLayoutId(id as LayoutId)}
                  >
                    <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                      <View
                        style={tw`w-[100px] aspect-square border rounded-2`}
                      />
                      <Cue.Selectable
                        isSelected={id === selectedLayoutId}
                        key={id}
                      >
                        {layout.name.replace("-", "\n")}
                      </Cue.Selectable>
                    </Column>
                  </Button.Container>
                ))}
              </Row>
            </ScrollView>
          </Accordion>
        </Column>
      </ScrollView>

      <DIMButton
        style={tw.style(`absolute inset-x-0`, { bottom })}
        text={t`Export`}
      />
    </SafeArea>
  );
};
