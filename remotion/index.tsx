import { Composition } from "remotion";
import { WishComposition } from "./WishComposition";
import type { WishCompositionProps } from "./WishComposition";

const defaultProps: WishCompositionProps = {
  recipientName: "Arun",
  title: "Happy Birthday!",
  message: "Wishing you a wonderful day filled with joy and happiness.",
  signature: "With love, Vignesh",
  occasion: "birthday",
  colorTheme: "rose-gold",
  animationStyle: "birthday",
  decoration: "confetti",
};

export function RemotionRoot() {
  return (
    <Composition
      id="WishVideo"
      component={WishComposition}
      durationInFrames={150}  // 5 seconds at 30fps
      fps={30}
      width={540}
      height={960}
      defaultProps={defaultProps}
    />
  );
}
