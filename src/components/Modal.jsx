function Modal({ message, onClose, onConfirm, type = 'info' }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="btn" onClick={onClose}>
            {type === 'confirm' ? 'Cancel' : 'Close'}
          </button>
          {type === 'confirm' && (
            <button className="btn btn-delete" onClick={onConfirm}>
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
