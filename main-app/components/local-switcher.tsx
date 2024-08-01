"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useEffect } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && savedLocale !== localActive) {
      onSelectChange(savedLocale);
    }
  }, [localActive]);

  const onSelectChange = (nextLocale: string) => {
    localStorage.setItem("locale", nextLocale);
    startTransition(() => {
      router.replace(`/${nextLocale}`);
      router.refresh();
    });
  };

  return (
    <div className="border-2 rounded">
      <p className="sr-only">Change Language</p>
      <Select
        defaultValue={localActive}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[100px] bg-transparent py-2">
          <SelectValue placeholder="Change Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}