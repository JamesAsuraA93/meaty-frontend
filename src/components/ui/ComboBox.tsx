import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ComboBoxProps = {
  list: { value: string; label: string }[];
  callback: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ComboboxUI({
  list,
  callback,
  placeholder,
  disabled,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between text-gray-400", {
            " text-black": value,
          })}
        >
          {value
            ? list.find((item) => item.value === value)?.label
            : placeholder ?? "เลือก"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={"ค้นหา"} />
          <CommandEmpty>ไม่มีข้อมูล</CommandEmpty>
          <CommandGroup className="max-h-[12rem] overflow-scroll">
            {list.map((item) => (
              <CommandItem
                key={item.value}
                value={`${item.value}:${item.label}`}
                onSelect={(values) => {
                  const [currentValue] = values.split(":");
                  setOpen(false);
                  if (!currentValue) return;
                  setValue(currentValue === value ? "" : currentValue);
                  callback(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0",
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
