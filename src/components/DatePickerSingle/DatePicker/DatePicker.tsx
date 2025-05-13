"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../datePicker.module.css";
import {Calendar} from "lucide-react";
import {DayPicker, type DayPickerProps} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@radix-ui/react-popover";
import {useId, useMemo, useState} from "react";
import "../../../index.css";

// Типы
type Mode = "single" | "range";

type SingleDateValue = Date | undefined;
type RangeDateValue = { from: Date; to?: Date } | undefined;
type DateValue<T extends Mode> = T extends "single" ? SingleDateValue : RangeDateValue;

type BaseProps<T extends Mode> = {
    mode: T;
    value?: DateValue<T>;
    defaultValue?: DateValue<T>;
    onDateChange?: (value: DateValue<T>) => void;
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

export function DatePicker<T extends Mode = "single">({
                                                          mode,
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
                                                      }: BaseProps<T>) {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<DateValue<T>>(defaultValue);
    const selectedValue = isControlled ? value : internalValue;

    const today = useMemo(() => new Date(), []);
    const [isFocused, setIsFocused] = useState(false);
    const inputId = useId();

    const handleSelect = (newValue: DateValue<T>) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onDateChange?.(newValue);
    };

    const formatDate = (date?: Date) =>
        date?.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

    const displayText =
        mode === "single"
            ? formatDate(selectedValue as SingleDateValue) ?? placeholder
            : (() => {
                const range = selectedValue as RangeDateValue;
                return range?.from
                    ? `${formatDate(range.from)} - ${formatDate(range.to)}`
                    : placeholder;
            })();

    return (
        <div className={clsx(s.container, className)} {...restProps}>
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
                        <div className={s.dateText}>{displayText}</div>
                        <Calendar className={s.calendarIcon} width={24} height={24} />
                    </div>
                </PopoverTrigger>

                {!disabled && (
                    <PopoverContent className={s.popoverContent} side="bottom" align="center" avoidCollisions={true}>
                        <div className={s.wrapperCalendar}>
                            <DayPicker
                                mode={mode}
                                selected={selectedValue}
                                onSelect={handleSelect}
                                showOutsideDays
                                weekStartsOn={1}
                                disabled={{ before: today }}
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

            {hint && !error && <div className={s.hint}>{hint}</div>}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
}
