import {useState} from "react";
import {Modal} from "../Modal/Modal.tsx";


export const Card = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Card</button>
            {<Modal open={showModal} onClose={() => setShowModal(false)} />}
        </>
    );
};

