import React, { useState } from "react";
import { useDispatch } from "react-redux";
function Modal({
  card,
  closeModal,
  deleteCard
}) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.dueDate || "");

  const saveChanges = () => {
    dispatch({
      type: "EDIT_CARD",
      payload: { cardId: card._id, title, description, dueDate },
    });
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Card</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Card Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Card Description"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={saveChanges}>Save</button>
          <button onClick={deleteCard}>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
