import { Button } from "../button";

export default function PrimaryButton({ content }: { content: string }) {
  return (
    <Button
      className="rounded-sm font-medium tracking-widest pl-6 pr-6 pt-2 pb-2 buttonTail text-primary-foreground"
      size={"lg"}
    >
      <a href="/contact">{content}</a>
    </Button>
  );
}
