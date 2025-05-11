"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "./datePicker.module.css";
import { Calendar } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useEffect, useState } from "react";
import {sharedDatePickerClassNames} from "./dataPickerClassnames.ts";

export type DatePickerSingleProps = {
    value?: Date;
    onDateChange: (date: Date) => void;
    label?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

export const DatePickerSingle = ({
                                     value,
                                     onDateChange,
                                     label = "Select Date",
                                     ...restProps
                                 }: DatePickerSingleProps) => {
    const [defaultDate, setDefaultDate] = useState<Date>(new Date());

    useEffect(() => {
        if (!value) {
            onDateChange(new Date());
        }
    }, []);

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            onDateChange(date);
        }
    };

    return (
        <div>
            <div className={s.text}>{label}</div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className={clsx(s.datePicker)}>
                        <div>{(value || defaultDate).toLocaleDateString()}</div>
                        <Calendar width="24px" height="24px" />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className={s.wrapperCalendar}>
                        <DayPicker
                            showOutsideDays
                            weekStartsOn={1}
                            disabled={{ before: new Date() }}
                            animate
                            mode="single"
                            selected={value || defaultDate}
                            onSelect={handleSelect}
                            classNames={sharedDatePickerClassNames}
                            className={"rdp-root"}
                            {...restProps}
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};