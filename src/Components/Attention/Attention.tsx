import React, { useContext } from "react";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";

export const Attention = () => {
  const { lang } = useContext(LangContext);

  return (
    <div className="welcome">
      <h1 className="welcome__attention">
        {getTranslation('welcomePage.attention', lang)}
      </h1>

      <p className="welcome__attention-message">
        {getTranslation('welcomePage.message', lang)}
      </p>

      <span className="welcome__attention-submessage">
        {getTranslation('welcomePage.sub-message', lang)}
      </span>
    </div>
  )
}