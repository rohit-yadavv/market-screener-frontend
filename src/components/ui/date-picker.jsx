import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker(props) {
  const displayValue = () => {
    if (props.mode === "range") {
      if (props.value?.from) {
        if (props.value.to) {
          return `${format(props.value.from, "LLL dd, y")} - ${format(
            props.value.to,
            "LLL dd, y"
          )}`;
        }
        return format(props.value.from, "LLL dd, y");
      }
    } else {
      if (props.value) {
        return format(props.value, "PPP");
      }
    }
    return "Pick a Date";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!props.value}
          className={cn(
            "w-fit justify-start text-left font-normal",
            props.className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayValue()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {props.mode === "range" ? (
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={props.value?.from}
            selected={props.value}
            onSelect={props.onChange}
            numberOfMonths={2}
          />
        ) : (
          <Calendar
            autoFocus
            mode="single"
            defaultMonth={props.value}
            selected={props.value}
            onSelect={props.onChange}
            numberOfMonths={1}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
