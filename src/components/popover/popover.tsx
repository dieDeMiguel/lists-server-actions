import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverComponent({
  children,
  isCreateButton = true,
}: {
  children: React.ReactNode;
  isCreateButton?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={isCreateButton ? "addUser" : "updateUser"}
        >
          {isCreateButton ? "Add user" : "Edit"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">{children}</PopoverContent>
    </Popover>
  );
}
