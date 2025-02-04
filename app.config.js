const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  expo: {
    android: {
      adaptiveIcon: {
        backgroundColor: IS_DEV ? "#6553EC" : "#C44529",
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
      config: {
        usesNonExemptEncryption: false,
      },
      supportsTablet: true,
    },
    locales: {
      en: "./src/locales/en/metadata.json",
      es: "./src/locales/en/metadata.json",
    },
    name: IS_DEV ? "Do It Myself (DEV)" : "Do It Myself",
    orientation: "portrait",
    plugins: [
      [
        "@react-native-google-signin/google-signin",
        {
          iosUrlScheme:
            "com.googleusercontent.apps.917430307232-gstt43na0eebs3jgrn4cb3ghpnnip7rs",
        },
      ],
      ["expo-build-properties"],
      ["expo-dev-client", { addGeneratedScheme: !IS_DEV }],
      ["expo-asset", { assets: ["./src/editor-web/src/index.html"] }],
      [
        "react-native-cloud-storage",
        {
          iCloudContainerEnvironment: IS_DEV ? "Development" : "Production",
          iCloudContainerIdentifier: "iCloud.com.serchinastico.doitmyself",
        },
      ],
      ["react-native-iap"],
    ],
    slug: "do-it-myself",
    splash: {
      backgroundColor: IS_DEV ? "#6553EC" : "#C44529",
      image: IS_DEV ? "./assets/splash-dev.png" : "./assets/splash.png",
      resizeMode: "contain",
    },
    userInterfaceStyle: "automatic",
    version: "1.0.1",
  },
};
