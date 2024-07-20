"use client";
import React from "react";
import "./Contact.css";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import Image from "next/image";
import ContactImage from "@/public/contact.jpg";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Index.Contact");

  return (
    <div id="contact-us" className="w-full flex justify-between items-center px-5 md:px-10 lg:px-32 pb-10">
      <div className="paddings innerWidth flexCenter c-container">
        {/* left side */}
        <div className="flexColStart c-left">
          <div className="flex justify-center items-start flex-col gap-5 w-full">
            <div className="flex justify-center items-start flex-col gap-1 w-full">
              <p className="text-lg font-semibold opacity-80 text-accent w-full">{t("subHeading")}</p>
              <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 w-full">{t("heading")}</h2>
            </div>

            <p className="leading-7 w-full text-muted-foreground">{t("content")}</p>
          </div>

          <div className="flexColStart contactModes">
            {/* first row */}
            <div className="flexStart row">
              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <MdCall size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">{t("Call")}</span>
                    <span className="secondaryText">{t("phone-number")}</span>
                  </div>
                </div>
                <button
                  className="flexCenter button"
                  onClick={() => {
                    navigator.clipboard.writeText("021 123 145 14");
                    toast.success("Phone number saved to clipboard");
                  }}
                >
                  {t("CopyToClipboard")}
                </button>
              </div>

              <div className="flexColCenter mode">
                <div className="flexStart">
                  <div className="flexCenter icon">
                    <BsFillChatDotsFill size={25} />
                  </div>
                  <div className="flexColStart detail">
                    <span className="primaryText">{t("email")}</span>
                    <span className="secondaryText">{t("businessEmail")}</span>
                  </div>
                </div>

                <button
                  className="flexCenter button"
                  onClick={() => {
                    navigator.clipboard.writeText("hacienda@gmail.com");
                    toast.success("Phone number saved to clipboard");
                  }}
                >
                  {t("CopyToClipboard")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexEnd c-right">
          <div className="image-container">
            <Image src={ContactImage} alt="Contact Image" className="contact-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
