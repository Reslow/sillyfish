import closeIcon from "../images/close.png";
import openIcon from "../images/open.png";

import { useState } from "react";
export default function Nav() {
  // burger menu that drops down on mobile size
  const [srcImg, setSrcImg] = useState(true);

  function toggleNavImg() {
    setSrcImg(!srcImg);
  }

  return (
    <section>
      <img
        src={srcImg ? openIcon : closeIcon}
        alt="burger-open"
        width="50px"
        height="50px"
        onClick={toggleNavImg}
      />
    </section>
  );
}
