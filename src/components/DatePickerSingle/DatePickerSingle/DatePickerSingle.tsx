"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../datePicker.module.css";
import { Calendar } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useId, useMemo, useState, useEffect } from "react";

export type DatePickerSingleProps = {
    value?: Date;
    defaultValue?: Date;
    onDateChange?: (date: Date | undefined) => void;
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

export const DatePickerSingle = ({
                                     value,
                                     defaultValue,
                                     onDateChange,
                                     label = "Select Date",
                                     placeholder = "Select date",
                                     disabled = false,
                                     required = false,
                                     className,
                                     inputClassName,
                                     error,
                                     hint,
                                     calendarProps,
                                     ...restProps
                                 }: DatePickerSingleProps) => {
    const isControlled = value !== undefined;
    const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue);
    const selectedDate = isControlled ? value : internalDate;
    const today = useMemo(() => new Date(), []);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    // Синхронизация defaultValue
    useEffect(() => {
        if (!isControlled) {
            setInternalDate(defaultValue);
        }
    }, [defaultValue]);

    const handleSelect = (date: Date | undefined) => {
        if (!isControlled) {
            setInternalDate(date);
        }
        onDateChange?.(date);
    };

    return (
        <div className={clsx(s.container, className)} {...restProps}>
            {label && (
                <label htmlFor={inputId} id={`${inputId}-label`} className={s.label}>
                    {label}
                    {required && <span className={s.requiredIndicator}>*</span>}
                </label>
            )}

            <Popover>
                <PopoverTrigger asChild>
                    <button
                        id={inputId}
                        disabled={disabled}
                        className={clsx(
                            s.datePicker,
                            disabled && s.disabled,
                            error && s.error,
                            isFocused && s.focused,
                            inputClassName
                        )}
                        aria-labelledby={`${inputId}-label`}
                        aria-describedby={error ? errorId : hint ? hintId : undefined}
                        aria-invalid={!!error}
                        aria-required={required}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        type="button"
                    >
                        <div className={s.dateText}>
                            {selectedDate
                                ? selectedDate.toLocaleDateString("en-GB", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                })
                                : placeholder}
                        </div>
                        <Calendar className={s.calendarIcon} width={24} height={24} />
                    </button>
                </PopoverTrigger>

                {!disabled && (
                    <PopoverContent
                        className={s.popoverContent}
                        side="bottom"
                        align="center"
                        avoidCollisions={true}
                    >
                        <div className={s.wrapperCalendar}>
                            <DayPicker
                                animate
                                showOutsideDays
                                weekStartsOn={1}
                                disabled={{ before: today }}
                                mode="single"
                                selected={selectedDate}
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

            {hint && !error && (
                <div id={hintId} className={s.hint}>
                    {hint}
                </div>
            )}
            {error && (
                <div id={errorId} className={s.errorMessage}>
                    {error}
                </div>
            )}
        </div>
    );
};
