import React from "react";
import axios from "axios";
import TheHeader from "../../ui/systems/Navigation/TheHeader";
import KeyVisual from "../../ui/systems/KeyVisual";
import { Articles } from "../../ui/systems/Articles";

export const Home = () => {
  const [contents, setContents] = React.useState();

  const fetchContents = React.useCallback(async () => {
    if (!process.env.REACT_APP_CMS_KEY) return;
    const result = await axios.get(
      "https://phantom-hand.microcms.io/api/v1/news",
      {
        headers: {
          "X-MICROCMS-API-KEY": process.env.REACT_APP_CMS_KEY,
        },
      }
    );
    setContents(result.data.contents);
  }, []);

  React.useEffect(() => {
    fetchContents();
  }, [fetchContents]);

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
      {contents && <Articles data={contents} />}
    </>
  );
};
