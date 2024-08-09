import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function SuccessCard() {
  const t = useTranslations("Onboarding.registerFormComp");

  return (
    <Card id="SuccessCard" className="gap-5 shadow-lg px-2 max-w-md">
      <CardHeader className="flex justify-center items-center text-center gap-5">
        <CardTitle>{t("toasts.success.title")}</CardTitle>
        <CardDescription className="text-xl text-muted-foreground">{t("toasts.success.description")}</CardDescription>
      </CardHeader>
    </Card>
  );
}
