import s from './Modal.module.css'

type Props = {
    open: boolean
    onClose?: () => void
}

export const Modal = ({open, onClose}: Props) => {
    return (
        <>
            {open && (
                <div className={s.overlay}>
                    <div className={s.content}>
                        <h3 className={s.title}>Cart</h3>
                        <hr />
                        <ul>
                            <li>1 товар</li>
                            <li>2 товар</li>
                            <li>3 товар</li>
                        </ul>
                        <button className={s.closeIcon} onClick={onClose}>
                            x
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}