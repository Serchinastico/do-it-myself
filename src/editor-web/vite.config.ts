import react from "@vitejs/plugin-react";
import * as fs from "node:fs/promises";
import * as Path from "node:path";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

// This config is used to build the web editor into a single file
export default defineConfig(async () => {
  const tool = process.env["TOOL"] ?? "manual";
  const colorScheme = process.env["COLOR_SCHEME"] ?? "light";

  const templateDir = Path.join(process.cwd(), "src", "editor-web", "template");
  const srcDir = Path.join(process.cwd(), "src", "editor-web", "src");

  const sharedCss = await fs.readFile(Path.join(templateDir, "shared.css"), {
    encoding: "utf-8",
  });
  const templateHtml = await fs.readFile(
    Path.join(templateDir, `index.${tool}.${colorScheme}.html`),
    { encoding: "utf-8" }
  );

  const finalHtml = templateHtml
    .replace(
      "<!-- $INTRO$ -->",
      `<!--
  This file has been automatically generated with Vite.
  All changes made to this file will be ignored.
-->`
    )
    .replace("/* $SHARED_CSS$ */", sharedCss);

  await fs.writeFile(Path.join(srcDir, `/index.html`), finalHtml, {
    encoding: "utf-8",
  });

  return {
    build: {
      emptyOutDir: true,
      outDir: `../build-${tool}-${colorScheme}`,
    },
    plugins: [react(), viteSingleFile()],
    resolve: {
      alias: [
        {
          find: "@10play/tentap-editor",
          replacement: "@10play/tentap-editor/web",
        },
        // We alias tiptap view and state to use the internal version of tiptap to avoid this error https://github.com/ueberdosis/tiptap/issues/3869#issuecomment-2167931620
        { find: "@tiptap/pm/view", replacement: "@10play/tentap-editor/web" },
        { find: "@tiptap/pm/state", replacement: "@10play/tentap-editor/web" },
      ],
    },
    root: "src/editor-web/src",
    server: {
      port: 3000,
    },
  };
});
