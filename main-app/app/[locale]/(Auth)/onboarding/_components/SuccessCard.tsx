import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SuccessCard() {
  const t = useTranslations("Onboarding.registerFormComp");

  return (
    <Card id="SuccessCard" className="gap-5 shadow-lg px-2 py-3 max-w-md">
      <CardHeader className="flex justify-center items-center text-center gap-4">
        <CardTitle>{t("toasts.success.title")}</CardTitle>
        <CardDescription className="text-xl text-muted-foreground">
          {t("toasts.success.description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <Button variant={"link"} className="text-white hover:bg-blue-500 bg-accent w-full">
          <Link href={"/dashboard"}>{t("toasts.success.link")}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
