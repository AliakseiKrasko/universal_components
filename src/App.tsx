import {useState} from "react";
import {DatePickerSingle} from "./components/DatePickerSingle/DatePickerSingle/DatePickerSingle.tsx";
import {DatePickerRange} from "./components/DatePickerSingle/DatePickerRange/DatePickerRange.tsx";


type DateRange = {
    from: Date;
    to: Date;
};


function App() {

    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(undefined);

    // Функция для обработки изменений в диапазоне дат
    const handleDateChange = (dates: { from?: Date; to?: Date }) => {
        // Убедитесь, что both from и to существуют
        if (dates.from && dates.to) {
            setSelectedRange({ from: dates.from, to: dates.to });
        }
    };


    return <div>
        {/*<Header />*/}

        {/*<DatePicker mode="range" />*/}

        <DatePickerSingle />
        <DatePickerRange
            value={selectedRange}          // передаем выбранный диапазон
            onDateChange={handleDateChange} // передаем функцию для обновления диапазона
            label="Select Date Range"      // текст ярлыка
            placeholder="Select date range"
            required
        />


    </div>
}
export default App