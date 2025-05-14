import type { Meta, StoryObj } from "@storybook/react";
import { DatePickerRange, type DatePickerRangeProps } from "./DatePickerRange";

const meta: Meta<typeof DatePickerRange> = {
    title: "Components/DatePicker/Range",
    component: DatePickerRange,
    tags: ["autodocs"],
    args: {
        label: "Vacation Dates",
        placeholder: "Select date range",
    },
};

export default meta;
type Story = StoryObj<typeof DatePickerRange>;

export const Default: Story = {
    render: (args: DatePickerRangeProps) => <DatePickerRange {...args} />,
};

export const WithDefaultDateRange: Story = {
    args: {
        defaultDate: {
            from: new Date("2024-07-01"),
            to: new Date("2024-07-10"),
        },
    },
};

export const WithError: Story = {
    args: {
        error: "Please select a date range.",
    },
};

export const WithHint: Story = {
    args: {
        hint: "You can only select future dates.",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultDate: {
            from: new Date("2024-08-01"),
            to: new Date("2024-08-15"),
        },
    },
};
