import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AddUserForm from "../add-user-form/add-user-form";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="addUser">
          Add user
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <AddUserForm />
      </PopoverContent>
    </Popover>
  );
}
