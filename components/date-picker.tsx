"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerWithRangeProps {
  value?: DateRange;
  onValueChange?: (date: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({ className, value, onValueChange }: DatePickerWithRangeProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  function handleSelect(selectedDate: DateRange | undefined) {
    setDate(selectedDate);
    onValueChange?.(selectedDate);
  }

  React.useEffect(() => {
    if (value && (value.from !== date?.from || value.to !== date?.to)) {
      setDate(value);
    }
  }, [value, date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" defaultMonth={date?.from} selected={date} onSelect={handleSelect} numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DatePickerProps {
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ className, value, onValueChange }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  function handleSelect(selectedDate: Date | undefined) {
    setDate(selectedDate);
    onValueChange?.(selectedDate);
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon />
            {date ? date.toLocaleDateString() : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={handleSelect} numberOfMonths={1} />
        </PopoverContent>
      </Popover>
    </div>
  );
}
