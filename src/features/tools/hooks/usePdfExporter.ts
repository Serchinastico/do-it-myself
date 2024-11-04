import { Project } from "@app/domain/project";
import { i18n } from "@lingui/core";
import { t } from "@lingui/macro";
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

const htmlReference = require("../../../editor-web/src/index.html");

export const usePdfExporter = () => {
  const exportDirectory = useMemo(() => `${cacheDirectory}Export`, []);

  const sharePdf = useCallback(async (project: Project) => {
    const assets = await Asset.loadAsync(htmlReference);

    const asset = assets[0];
    if (!asset) return;
    if (!asset?.localUri) return;

    const html = await readAsStringAsync(asset.localUri);
    const htmlWithManual = html.replace(
      '<div id="root"></div>',
      `<div id="root">${project.manual?.contentHtml}</div>`
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
  }, []);

  return { sharePdf };
};
