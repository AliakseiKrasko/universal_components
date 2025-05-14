"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../datePicker.module.css";
import { Calendar } from "lucide-react";
import { DayPicker, type DateRange, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useId, useMemo, useState } from "react";

export type DatePickerRangeProps = {
    value?: DateRange;
    defaultValue?: DateRange;
    onDateChange?: (dates: DateRange) => void;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    inputClassName?: string;
    error?: string;
    hint?: string;
    calendarProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect">;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export const DatePickerRange = ({
                                    value,
                                    defaultValue,
                                    onDateChange,
                                    label = "Select Date Range",
                                    placeholder = "Select date range",
                                    disabled = false,
                                    required = false,
                                    className,
                                    inputClassName,
                                    error,
                                    hint,
                                    calendarProps,
                                    ...restProps
                                }: DatePickerRangeProps) => {
    const isControlled = value !== undefined;
    const [internalDates, setInternalDates] = useState<DateRange>(defaultValue || { from: undefined, to: undefined });
    const selectedDates = isControlled ? value : internalDates;
    const today = useMemo(() => new Date(), []);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();

    const handleSelect = (range: DateRange | undefined) => {
        // range будет объектом с полями from и to
        if (range) {
            setInternalDates(range);
            onDateChange?.(range);
        } else {
            // если выбрана одна дата, обнуляем диапазон
            setInternalDates({ from: undefined, to: undefined });
            onDateChange?.({ from: undefined, to: undefined });
        }
    };

    return (
        <div className={clsx(s.container, className)} {...restProps}>
            <div className={s.datePickerWrapper}>
                {label && (
                    <label htmlFor={inputId} className={s.label}>
                        {label}
                        {required && <span className={s.requiredIndicator}>*</span>}
                    </label>
                )}

                <Popover>
                    <PopoverTrigger asChild>
                        <div
                            id={inputId}
                            tabIndex={disabled ? -1 : 0}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={clsx(
                                s.datePicker,
                                disabled && s.disabled,
                                error && s.error,
                                isFocused && s.focused,
                                inputClassName
                            )}
                            aria-disabled={disabled}
                            role="button"
                        >
                            <div className={s.dateText}>
                                {selectedDates.from && selectedDates.to
                                    ? `${selectedDates.from.toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })} - ${selectedDates.to.toLocaleDateString("en-GB", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                    })}`
                                    : placeholder}
                            </div>
                            <Calendar className={s.calendarIcon} width={24} height={24} />
                        </div>
                    </PopoverTrigger>

                    {!disabled && (
                        <PopoverContent className={s.popoverContent} side="bottom" align="center" avoidCollisions={true}>
                            <div className={s.wrapperCalendar}>
                                <DayPicker
                                    animate={true}
                                    showOutsideDays
                                    weekStartsOn={1}
                                    disabled={{ before: today }}
                                    mode="range"
                                    selected={selectedDates}
                                    onSelect={handleSelect}
                                    modifiers={{
                                        today: today,
                                        weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
                                    }}
                                    modifiersClassNames={{
                                        today: s.rdpDay_today,
                                        selected: s.rdpDay_selected,
                                        weekend: s.weekendDay,
                                        disabled: s.rdpDayDisabled,
                                    }}
                                    classNames={{
                                        caption_label: s.rdpCaptionLabel,
                                        button_next: s.rdpButton_next,
                                        button_previous: s.rdpButton_previous,
                                        nav: s.rdpNav,
                                    }}
                                    {...calendarProps}
                                />
                            </div>
                        </PopoverContent>
                    )}
                </Popover>
            </div>

            {hint && !error && <div className={s.hint}>{hint}</div>}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};

