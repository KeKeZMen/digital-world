import "../assets/styles/modal.scss"

export default function Modal({ children, isOpened, setIsOpenedModal }) {
  return (
    <div className={isOpened ? "modal__back" : "modal__inactive"} onClick={() => setIsOpenedModal(false)}>
      <div className="modal__block" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
}
