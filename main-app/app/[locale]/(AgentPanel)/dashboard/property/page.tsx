import { buttonVariants } from "@/components/ui/button";
import Properties from "./_components/Properties";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ViewProperties() {
  const t = useTranslations("Dashboard.Property");
  return (
    <div className="w-full flex justify-start items-center gap-10  pb-20  my-24 flex-col px-3 sm:px-5 min-h-screen  ">
      <div className="flex w-full justify-between items-center sm:px-5 lg:max-w-7xl ">
        <p className="scroll-m-20 text- sm:text-lg font-semibold tracking-tight">{t("heading")}</p>
        <Link
          href="/dashboard/property/create"
          className={buttonVariants({
            variant: "outline",
            className: "gap-2",
            size: "sm",
          })}
        >
          <PlusCircle size={16} />
          {t("addButton")}
        </Link>
      </div>

      <div className="w-full sm:px-5 lg:max-w-7xl ">
        <Properties />
      </div>
    </div>
  );
}
