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
import { Input } from "../ui/input";

type ComboBoxProps = {
  list: { value: string; label: string }[];
  callback: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function ComboboxInputUI({
  list,
  callback,
  placeholder,
  disabled,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const showedValue = React.useMemo(() => {
    const [_, label] = value.split(":");
    if (!label) return value;
    return label;
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex">
        <Input
          value={showedValue}
          placeholder={placeholder}
          className="w-[80%] flex-grow rounded-br-none rounded-tr-none"
          onChange={(e) => {
            setValue(e.target.value);
            callback(e.target.value);
          }}
        />
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-[15%] justify-center rounded-bl-none rounded-tl-none text-primary hover:bg-primary hover:text-white",
            )}
          >
            <ChevronsUpDown className="h-4 w-4 shrink-0" />
          </Button>
        </PopoverTrigger>
      </div>
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
                  setOpen((p) => !p);
                  if (!currentValue) return;
                  setValue(values);
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
