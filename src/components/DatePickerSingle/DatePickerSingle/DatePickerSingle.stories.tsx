
import {DatePickerSingle, type DatePickerSingleProps} from "./DatePickerSingle.tsx";
import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta<typeof DatePickerSingle> = {
    title: "Components/DatePicker/Single",
    component: DatePickerSingle,
    tags: ["autodocs"],
    args: {
        label: "Date of Birth",
        placeholder: "Select your date",
    },
};

export default meta;
type Story = StoryObj<typeof DatePickerSingle>;

export const Default: Story = {
    render: (args: DatePickerSingleProps) => <DatePickerSingle {...args} />,
};

export const WithDefaultValue: Story = {
    args: {
        defaultDate: new Date("2000-01-01"),
    },
};

export const WithError: Story = {
    args: {
        error: "Date is required",
    },
};

export const WithHint: Story = {
    args: {
        hint: "You can pick any date after today.",
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        defaultDate: new Date(),
    },
};
