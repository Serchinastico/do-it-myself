import { Center } from "@madeja-studio/telar";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";

export const PartyAnimation = () => {
  const lottieRef1 = useRef<LottieView>(null);
  const lottieRef2 = useRef<LottieView>(null);
  const lottieRef3 = useRef<LottieView>(null);

  useEffect(() => {
    if (!lottieRef1.current) return;
    if (!lottieRef2.current) return;
    if (!lottieRef3.current) return;

    setTimeout(() => {
      setTimeout(() => lottieRef3.current?.play(), 200);
      setTimeout(() => lottieRef2.current?.play(), 400);
      setTimeout(() => lottieRef1.current?.play(), 600);
    }, 200);
  }, []);

  return (
    <Center pointerEvents="none" style={tw`absolute inset-0`}>
      <LottieView
        autoPlay={false}
        loop={false}
        ref={lottieRef1}
        source={require("@assets/animations/confetti.json")}
        style={tw`absolute inset-x-0 top--20 h-100`}
      />

      <LottieView
        autoPlay={false}
        loop={false}
        onAnimationFinish={() => lottieRef1.current?.play()}
        ref={lottieRef2}
        source={require("@assets/animations/confetti.json")}
        style={tw`absolute inset-x-0 top-20 h-100`}
      />

      <LottieView
        autoPlay={false}
        loop={false}
        ref={lottieRef3}
        source={require("@assets/animations/confetti.json")}
        style={tw`absolute inset-x-0 top-60 h-100`}
      />
    </Center>
  );
};
