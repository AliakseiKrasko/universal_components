import type {Meta, StoryObj} from "@storybook/react";
import { Select } from "./Select";


const meta: Meta<typeof Select> = {
    title: "Components/Select",
    component: Select,
    tags: ["autodocs"],
    argTypes: {
        items: {
            control: { type: "object" },
        },
        disabled: { control: "boolean" },
    },
    args: {
        defaultValue: "React",
        groupLabel: "Skills",
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectLanguages: Story = {
    args: {
        label: "select skills",
        items: [
            { value: "HTML", label: "HTML" },
            { value: "CSS", label: "CSS" },
            { value: "React", label: "React" },
            { value: "Redux", label: "Redux" },
            { value: "TypeScript", label: "TypeScript" },
        ],
        disabled: false,
    },
};

export const SelectDisabled: Story = {
    args: {
        label: "select skills",
        items: [
            { value: "HTML", label: "HTML" },
            { value: "CSS", label: "CSS" },
            { value: "React", label: "React" },
            { value: "Redux", label: "Redux" },
            { value: "TypeScript", label: "TypeScript" },
        ],
        disabled: true,
    },
};