import {Card} from "../Card/Card.tsx";
import s from "./Header.module.css"

export const Header = () => {
    return (
        <div className={s.headerWrapper}>
            <div className={s.container}>
                <h3>logotype</h3>
                <Card />
            </div>
        </div>
    )
}