const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: "#C44529",
        foregroundImage: IS_DEV
          ? "./assets/adaptive-icon-dev.png"
          : "./assets/adaptive-icon.png",
      },
      package: IS_DEV
        ? "com.serchinastico.doitmyself.dev"
        : "com.serchinastico.doitmyself",
    },
    extra: {
      eas: {
        projectId: "e07870ff-edd0-4191-bd09-613a1ed6c36f",
      },
    },
    icon: IS_DEV ? "./assets/icon-dev.png" : "./assets/icon.png",
    ios: {
      bundleIdentifier: IS_DEV
        ? "com.sechinastico.doitmyself.dev"
        : "com.serchinastico.doitmyself",
      supportsTablet: true,
    },
    locales: {
      en: "./src/locales/en/metadata.json",
      es: "./src/locales/en/metadata.json",
    },
    name: IS_DEV ? "do-it-myself (DEV)" : "do-it-myself",
    orientation: "portrait",
    slug: "do-it-myself",
    splash: {
      backgroundColor: "#C44529",
      image: "./assets/splash.png",
      resizeMode: "contain",
    },
    userInterfaceStyle: "automatic",
    version: "1.0.0",
  },
};
