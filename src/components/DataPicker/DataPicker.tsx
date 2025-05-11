"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "./datePicker.module.css";
import {Calendar} from "lucide-react";
import {DayPicker, type DayPickerProps} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";

export type DatePickerSingleProps = {
    value?: Date;
    onDateChange: (date: Date) => void;
    label?: string;
} & Omit<DayPickerProps, "mode" | "selected" | "onSelect">;

export const DatePickerSingle = ({
                                     value, // Получаем текущее значение из родителя
                                     onDateChange, // Получаем колбэк для уведомления родителя
                                     label = "Select Date",
                                     ...restProps // Получаем остальные пропсы для DayPicker
                                 }: DatePickerSingleProps) => {

    const handleSelect = (date: Date | undefined) => {
        if (date) {
            onDateChange(date); // Уведомляем родителя об изменении
        } else {
            // Опционально: логика очистки даты, если нужно
            // onDateChange(undefined);
        }
    };

    return (
        <div>
            <div className={s.text}>{label}</div>
            <Popover>
                <PopoverTrigger asChild>
                    <div className={clsx(s.datePicker)}>
                        <div>{value ? value.toLocaleDateString() : "Select date"}</div>
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
                            selected={value} // Используем пропс value
                            onSelect={handleSelect} // Используем обработчик, вызывающий onDateChange
                            className="rdp-root"
                            {...restProps} // Передаем оставшиеся пропсы в DayPicker
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};