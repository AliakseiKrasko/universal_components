import {useState} from "react";
import {Modal} from "../Modal/Modal.tsx";


export const Card = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Card</button>
            <Modal open={showModal} onClose={() => setShowModal(false)} modalTitle={"Cart"}>
                <ul>
                    <li>1 товар</li>
                    <li>2 товар</li>
                    <li>3 товар</li>
                </ul>
            </Modal>
        </>
    );
};

