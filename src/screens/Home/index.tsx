import TheHeader from "../../ui/systems/Navigation/TheHeader";
import KeyVisual from "../../ui/systems/KeyVisual";

export const Home = () => {
  return (
    <>
      <TheHeader
        title="PhantomHand"
        buttonUrl="https://github.com/noov-smash/PhantomHand"
      />
      <KeyVisual
        title="PhantomHand"
        text="Control and Automate Nintendo Switch from a Browser."
      />
    </>
  );
};
