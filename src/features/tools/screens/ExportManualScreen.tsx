import { Button as DIMButton } from "@app/core/components/Button";
import { SafeArea } from "@app/core/components/SafeArea";
import { ScrollView } from "@app/core/components/ScrollView";
import { RootScreenProps } from "@app/core/navigation/routes";
import { derivedAtoms } from "@app/core/storage/state";
import { ExportThemeId } from "@app/domain/project/export";
import { Picker } from "@app/features/tools/components/picker";
import { usePdfExporter } from "@app/features/tools/hooks/pdf/usePdfExporter";
import { t } from "@lingui/macro";
import { Column, SafeAreaViewEdges } from "@madeja-studio/telar";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Text } from "react-native";
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
  const { sharePdf } = usePdfExporter();
  const { bottom } = useSafeAreaInsets();

  return (
    <SafeArea edges={SafeAreaViewEdges.NoVertical}>
      <ToolHeader.ExportManual onClose={() => navigation.goBack()} />

      <ScrollView style={tw`pb-8`}>
        <Column style={tw`px-4`}>
          <Text
            style={tw`body`}
          >{t`Export your manual to a PDF file you can print and store along with your finished project for future reference and maintenance, or share it with anyone.`}</Text>

          <Picker.Theme
            onThemeSelect={(id) => setSelectedExportThemeId(id)}
            selectedThemeId={selectedExportThemeId}
          />
        </Column>
      </ScrollView>

      <DIMButton
        hasAutoLoad
        onPress={() =>
          sharePdf({
            project,
            themeId: selectedExportThemeId,
          })
        }
        style={tw.style(`absolute inset-x-0`, { bottom })}
        text={t`Export`}
      />
    </SafeArea>
  );
};
