function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
