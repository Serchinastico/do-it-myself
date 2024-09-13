import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { TelarContextProvider } from "@madeja-studio/telar";
import { PropsWithChildren } from "react";

import PreloadScreen from "../bootstrap/PreloadScreen";

interface Props extends PropsWithChildren {}

const AllProviders = ({ children }: Props) => {
  return (
    <TelarContextProvider>
      <PreloadScreen>
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
      </PreloadScreen>
    </TelarContextProvider>
  );
};

export default AllProviders;
