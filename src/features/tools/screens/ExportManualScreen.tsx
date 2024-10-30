import { Accordion, AccordionRef } from "@app/core/components/Accordion";
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
import { useCallback, useRef, useState } from "react";
import { Text, View } from "react-native";

import { ToolHeader } from "../components/headers";

export const ExportManualScreen = ({
  navigation,
  route,
}: RootScreenProps<"exportManual">) => {
  const { projectId } = route.params;
  const project = useAtomValue(derivedAtoms.projectAtomFamily(projectId));
  const [exportTheme, setExportTheme] = useState<ExportThemeId>("dim");
  const [layout, setLayout] = useState<LayoutId>("landscape2pages");
  const themeAccordionRef = useRef<AccordionRef>(null);
  const layoutAccordionRef = useRef<AccordionRef>(null);

  const onExportThemeSelect = useCallback((id: ExportThemeId) => {
    setExportTheme(id);
    themeAccordionRef.current?.close();
  }, []);

  const onLayoutSelect = useCallback((id: LayoutId) => {
    setLayout(id);
    layoutAccordionRef.current?.close();
  }, []);

  return (
    <SafeArea edges={SafeAreaViewEdges.NoTop}>
      <ToolHeader.ExportManual onClose={() => navigation.goBack()} />

      <Column style={tw`px-4`}>
        <Text>{t`Export your manual to a PDF file you can print and store along with your finished project for future reference and maintenance, or share it with anyone.`}</Text>

        <Accordion
          childrenHeight={220}
          fieldName={t`Theme`}
          ref={themeAccordionRef}
          selectedValue={ExportTheme[exportTheme].name}
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
                  onPress={() => onExportThemeSelect(id as ExportThemeId)}
                >
                  <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                    <View
                      style={tw`w-[100px] aspect-square border rounded-2`}
                    />
                    <Cue key={id} textStyle={tw`text-center`}>
                      {theme.name.replace("-", "\n")}
                    </Cue>
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
          selectedValue={Layout[layout].name}
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
                  onPress={() => onLayoutSelect(id as LayoutId)}
                >
                  <Column style={tw`items-center gap-2 w-[120px] h-[200px]`}>
                    <View
                      style={tw`w-[100px] aspect-square border rounded-2`}
                    />
                    <Cue key={id} textStyle={tw`text-center`}>
                      {layout.name.replace("-", "\n")}
                    </Cue>
                  </Column>
                </Button.Container>
              ))}
            </Row>
          </ScrollView>
        </Accordion>
      </Column>
    </SafeArea>
  );
};
