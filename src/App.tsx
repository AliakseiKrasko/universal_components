import {useState} from "react";
import {DatePickerSingle} from "./components/DatePickerSingle/DatePickerSingle/DatePickerSingle.tsx";

function App() {

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);



    return <div>
        {/*<Header />*/}

        {/*<DatePicker mode="range" />*/}

        <DatePickerSingle
            value={selectedDate}
            onDateChange={setSelectedDate}
            placeholder="Выберите дату"
        />


    </div>
}
export default App