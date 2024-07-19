import React from "react";
import "./CallToAction.css";
import { useTranslations } from "next-intl";

export default function CallToAction() {
  const t = useTranslations("Index.CallToAction");
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">{t("heading")}</span>
          <span className="secondaryText">{t("content")}</span>
          <button className="button">
            <a href="./pricing">{t("button")}</a>
          </button>
        </div>
      </div>
    </div>
  );
}
