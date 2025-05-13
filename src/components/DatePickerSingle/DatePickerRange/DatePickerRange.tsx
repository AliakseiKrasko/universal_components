"use client";

import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../datePicker.module.css";
import { Calendar } from "lucide-react";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useId, useMemo, useState } from "react";
import "../../../index.css";

export type DatePickerRangeProps = {
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

export const DatePickerRange = ({
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
                                }: DatePickerRangeProps) => {
    const isControlled = value !== undefined; // Проверяем, контролируется ли компонент
    const [internalDate, setInternalDate] = useState<Date | undefined>(defaultValue); // Локальное состояние для неконтролируемого компонента
    const selectedDate = isControlled ? value : internalDate; // Используем контролируемое состояние, если передано value
    const today = useMemo(() => new Date(), []); // Текущая дата для блокировки прошлых дат
    const [isFocused, setIsFocused] = useState(false); // Фокус для стилизации
    const inputId = useId(); // Уникальный id для input

    // Функция выбора даты
    const handleSelect = (date: Date | undefined) => {
        if (!isControlled) {
            setInternalDate(date); // Обновляем локальное состояние, если компонент неконтролируемый
        }
        onDateChange?.(date); // Передаем выбранную дату в родительский компонент, если передан onDateChange
    };

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
                    </div>
                </PopoverTrigger>

                {/* Календарь отображается, если не заблокирован */}
                {!disabled && (
                    <PopoverContent className={s.popoverContent} side="bottom" align="center" avoidCollisions={true}>
                        <div className={s.wrapperCalendar}>
                            <DayPicker
                                animate={true}
                                showOutsideDays
                                weekStartsOn={1}
                                disabled={{ before: today }} // Блокировка выбора дат до сегодняшнего дня
                                mode="single" // Режим одиночного выбора даты
                                selected={selectedDate} // Устанавливаем выбранную дату
                                onSelect={handleSelect} // Передаем функцию для обновления выбранной даты
                                modifiers={{
                                    today: today,
                                    weekend: (date) => date.getDay() === 0 || date.getDay() === 6, // Модификатор для выходных
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
                                {...calendarProps} // Дополнительные пропсы для календаря
                            />
                        </div>
                    </PopoverContent>
                )}
            </Popover>

            {hint && !error && <div className={s.hint}>{hint}</div>}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};
