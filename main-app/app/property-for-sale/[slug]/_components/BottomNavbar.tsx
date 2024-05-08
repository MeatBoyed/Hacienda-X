import { Button } from "@/components/ui/button";

export default function BottomNavbar({ price }: { price?: number }) {
  return (
    <div className="flex justify-between items-center z-50 border-t bg-background py-5 px-4 w-full fixed bottom-0 sm:hidden">
      <p className="text-xl text-text font-semibold">
        USD {price?.toLocaleString()}
      </p>
      <Button className="text-white bg-accent " variant={"default"}>
        Enquire Now
      </Button>
    </div>
  );
}
