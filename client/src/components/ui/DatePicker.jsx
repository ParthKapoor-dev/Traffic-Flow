"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "./use-toast"

export function DatePicker({ date, setDate }) {

    const { toast } = useToast();

    function handleSetDate(newDate) {
        console.log(newDate);
        if (newDate < Date.now()) {
            toast({
                variant: 'destructive',
                title: 'Invalid Date',
                description: 'Selected Date should be a future Date'
            });
            return
        }

        if (newDate > addDays(Date.now, 30)) {
            toast({
                variant: 'destructive',
                title: 'Invalid Date',
                description: 'Selected Date should be less than a month than now'
            });
            return;
        }

        setDate(newDate)

    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSetDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
