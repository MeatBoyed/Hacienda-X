"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, Trash2, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function PropertyFormHead({
  initProperty,
  deleteHandler,
}: {
  deleteHandler: () => Promise<void>;
  initProperty: boolean;
}) {
  const t = useTranslations("Dashboard.propertyFormComp.formHeadComp");
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full sm:px-5 lg:max-w-7xl flex-wrap gap-4">
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-white hidden sm:flex"
          type="button"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("backButton")}</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {!initProperty ? `${t("createHeading")}` : `${t("editHeading")}`}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2">
        {initProperty && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"destructive"} size="sm" className="gap-2">
                <Trash2 size={16} className="text-black" />
                {t("deleteButton")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{t("deleteDialog.title")}</DialogTitle>
                <DialogDescription>{t("deleteDialog.description")}</DialogDescription>
              </DialogHeader>
              <DialogFooter
                style={{ justifyContent: "space-between" }}
                className="flex p-0 m-0 justify-between items-center w-full"
              >
                <p className="text-sm font-normal ">{t("deleteDialog.confirmMessage")}</p>
                <Button variant={"destructive"} type="button" onClick={async () => await deleteHandler()}>
                  {t("deleteDialog.button")}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <Button variant="outline" size="sm" type="submit" className="gap-2">
          <Save size={16} />
          {initProperty ? `${t("saveButton")}` : `${t("createButton")}`}
        </Button>
      </div>
    </div>
  );
}
