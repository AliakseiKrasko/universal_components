import s from "./select.module.css";
import * as RadixSelect from "@radix-ui/react-select";
import { clsx } from "clsx";
import {type ComponentPropsWithoutRef, type ComponentRef, forwardRef, useId} from "react";
import type {NullableProps} from "../types/NullableProps.ts";
import type {SelectItemsProps} from "../types/SelectItemsProps.ts";
import {SelectItem} from "./SelectItems/selectItems.tsx";
import { Typography } from "../typography/typography.tsx";
import {ChevronDownIcon, ChevronUpIcon} from "@radix-ui/react-icons";

export const Select = forwardRef<ComponentRef<typeof RadixSelect.Trigger>, SelectProps>(
    (
        { className, placeholder, defaultValue, value, label, disabled, items, groupLabel, withSeparator = true, ...rest },
        ref
    ) => {
        const generatedId = useId();
        const id = rest.id || generatedId;

        return (
            <div className={s.selectWrapper}>
                {label && (
                    <Typography variant={"regular_14"} color={"dark"} asChild>
                        <label htmlFor={id} className={s.label}>
                            {label}
                        </label>
                    </Typography>
                )}
                <RadixSelect.Root
                    defaultValue={defaultValue}
                    value={value}
                    onValueChange={rest.onValueChange}
                    disabled={disabled}
                >
                    <RadixSelect.Trigger id={id} className={clsx(s.trigger, className)} ref={ref} {...rest}>
                        <RadixSelect.Value placeholder={placeholder} />
                        <RadixSelect.Icon>
                            <ChevronDownIcon className={s.iconDown} />
                        </RadixSelect.Icon>
                    </RadixSelect.Trigger>

                    <RadixSelect.Portal>
                        <RadixSelect.Content className={s.Content} position={"popper"}>
                            <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                                <ChevronUpIcon />
                            </RadixSelect.ScrollUpButton>
                            <RadixSelect.Viewport className={s.Viewport}>
                                <RadixSelect.Group>
                                    {groupLabel && (
                                        <>
                                            <RadixSelect.Label style={{ marginLeft: 5 }}>{groupLabel}</RadixSelect.Label>
                                            {withSeparator && <RadixSelect.Separator className={s.Separator} />}
                                        </>
                                    )}
                                    {items.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            <Typography variant={"regular_14"} className={s.selectItems}>
                                                {item.icon && item.icon} {item.label}
                                            </Typography>
                                        </SelectItem>
                                    ))}
                                </RadixSelect.Group>
                            </RadixSelect.Viewport>
                            <RadixSelect.ScrollDownButton>
                                <ChevronDownIcon />
                            </RadixSelect.ScrollDownButton>
                        </RadixSelect.Content>
                    </RadixSelect.Portal>
                </RadixSelect.Root>
            </div>
        );
    }
);

export type SelectProps = {
    id?: string;
    className?: string;
    labelClassName?: string;
    placeholder?: string;
    label?: string;
    groupLabel?: NullableProps<string>;
    withSeparator?: boolean;
    items: SelectItemsProps[];
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>;

