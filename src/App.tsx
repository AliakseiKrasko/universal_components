import {Header} from "./components/Header/Header.tsx";
import {DatePickerSingle} from "./components/DatePickerSingle/DatePickerSingle/DatePickerSingle.tsx";
import * as React from "react";

function App() {
    const [date, setDate] = React.useState<Date | undefined>();
    return <div>
        <Header />
        <DatePickerSingle
                value={date}
                onDateChange={(newDate) => setDate(newDate)}
                label="Выберите дату"
        />

    </div>
}
export default App