import {Header} from "./components/Header/Header.tsx";
import {DatePicker} from "./components/DatePickerSingle/DatePicker/DatePicker.tsx";
import {Select} from "./components/Select/Select.tsx";
import {useState} from "react";
import {Typography} from "./components/typography/typography.tsx";




const items = [
    { value: "item1", label: "Item 1" },
    { value: "item2", label: "Item 2" },
    { value: "item3", label: "Item 3" },
];

function App() {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();

    const handleValueChange = (newValue: string) => {
        setSelectedValue(newValue);
    };

    return <div>
        <Header />

        <DatePicker mode="range" />


        <Select
            label="Select Item"
            placeholder="Choose an option"
            value={selectedValue}
            onValueChange={handleValueChange}
            items={items}
            groupLabel="Group 1"
            withSeparator={true}
        />
        {selectedValue && <Typography variant="regular_14">Selected: {selectedValue}</Typography>}

    </div>
}
export default App