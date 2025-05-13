import {Header} from "./components/Header/Header.tsx";
import {DatePicker} from "./components/DatePickerSingle/DatePicker/DatePicker.tsx";

function App() {
    return <div>
        <Header />

        <DatePicker mode="single" onDateChange={(val) => console.log(val)} />

    </div>
}
export default App