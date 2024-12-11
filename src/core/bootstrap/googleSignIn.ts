import { GoogleSignin } from "@react-native-google-signin/google-signin";

const WEB_CLIENT_ID =
  "917430307232-i23r41mqiea9d0s4juc95l8mrpuju5ev.apps.googleusercontent.com";
const IOS_CLIENT_ID =
  "917430307232-gstt43na0eebs3jgrn4cb3ghpnnip7rs.apps.googleusercontent.com";

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    iosClientId: IOS_CLIENT_ID,
    scopes: ["https://www.googleapis.com/auth/drive.appdata"],
    webClientId: WEB_CLIENT_ID,
  });
};
