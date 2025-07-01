"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

export function CustomTimePicker({
  label,
  value,
  onChange,
  placeholder = "Select time",
}: {
  label?: string;
  value: string | undefined;
  onChange: (time: string | undefined) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <Label htmlFor="time" className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="time"
            className="w-48 justify-between font-normal"
          >
            {value || placeholder}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <Input
            type="time"
            step="60"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setOpen(false);
            }}
            className="w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none ring-1 ring-input ring-offset-0 focus:ring-2 focus:ring-ring"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
