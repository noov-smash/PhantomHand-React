import TheHeader from "../../ui/systems/Navigation/TheHeader";
import KeyVisual from "../../ui/systems/KeyVisual";

export const Home = () => {
  return (
    <>
      <TheHeader title="Masterhand" buttonUrl="https://google.com" />
      <KeyVisual
        title="Masterhand"
        text="Automation tool for Nintendo Switch"
      />
    </>
  );
};
