import { useColorSwitch } from "@app/core/hooks/useColorSwitch";
import { Project } from "@app/domain/project";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
import dayjs from "dayjs";
import { Asset } from "expo-asset";
import {
  cacheDirectory,
  makeDirectoryAsync,
  moveAsync,
  readAsStringAsync,
} from "expo-file-system";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { useCallback, useMemo } from "react";

const darkThemeHtmlRef = require("../../../editor-web/build-manual-dark/index.html");
const lightThemeHtmlRef = require("../../../editor-web/build-manual-light/index.html");

export const usePdfExporter = () => {
  const { colorScheme } = useColorSwitch();
  const exportDirectory = useMemo(() => `${cacheDirectory}Export`, []);

  const sharePdf = useCallback(
    async (project: Project) => {
      console.log(colorScheme);
      const assets = await Asset.loadAsync(
        colorScheme === "light" ? lightThemeHtmlRef : darkThemeHtmlRef
      );

      const asset = assets[0];
      if (!asset) return;
      if (!asset?.localUri) return;

      const html = await readAsStringAsync(asset.localUri);
      const htmlWithManual = html
        // This is patch to remove a CSS rule that breaks PDF printing
        .replace("#root > div:nth-of-type(1)", ".nothing")
        .replace(
          '<div id="root"></div>',
          `<div id="root"><div class="tiptap ProseMirror">${project.manual?.contentHtml}</div></div>`
        );

      const { uri: temporaryUri } = await printToFileAsync({
        html: htmlWithManual,
      });

      const uri = `${exportDirectory}/${t(i18n)`${project.name} - Manual`}.pdf`;

      await makeDirectoryAsync(exportDirectory, { intermediates: true });
      await moveAsync({ from: temporaryUri, to: uri });
      await shareAsync(uri, {
        dialogTitle: t(i18n)`Save or share your project's manual`,
        mimeType: "application/pdf",
        UTI: ".pdf",
      });
    },
    [colorScheme]
  );

  return { sharePdf };
};
