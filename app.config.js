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
    plugins: [
      ["expo-dev-client", { addGeneratedScheme: !IS_DEV }],
      ["expo-asset", { assets: ["./src/editor-web/src/index.html"] }],
      [
        "react-native-cloud-storage",
        {
          iCloudContainerEnvironment: IS_DEV ? "Development" : "Production",
          iCloudContainerIdentifier: "iCloud.com.serchinastico.doitmyself",
        },
      ],
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.1042198232576-k04hfde0atd4m0cri6v59ps49sac51mc",
        },
      ],
    ],
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
