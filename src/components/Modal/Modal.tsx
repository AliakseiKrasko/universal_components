import s from './Modal.module.css'
import type {ReactNode} from "react";
import {createPortal} from "react-dom";

type Props = {
    open: boolean
    onClose?: () => void
    modalTitle: string
    children: ReactNode
}

export const Modal = ({open, onClose, modalTitle, children}: Props) => {
    return (
        <>
            {open &&
                <>
                    {createPortal(
                        <div className={s.overlay}>
                            <div className={s.content}>
                                <h3 className={s.title}>{modalTitle}</h3>
                                <hr />
                                {children}
                                <button className={s.closeIcon} onClick={onClose}>
                                    x
                                </button>
                            </div>
                        </div>,
                        document.body
                        )}
                </>
            }
        </>
    )
}