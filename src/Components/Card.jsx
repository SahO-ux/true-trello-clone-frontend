import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

function Card({ cardId, listId, index }) {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.cardsById[cardId]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteCard = () => {
    dispatch({
      type: "DELETE_CARD",
      payload: { cardId: card._id, listId },
    });
  };

  return (
    <>
      <Draggable draggableId={card._id} index={index}>
        {(provided) => (
          <div
            className="bg-gray-100 rounded p-2 mb-2 shadow cursor-pointer hover:bg-gray-200"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsModalOpen(true)}
          >
            {card.title}
          </div>
        )}
      </Draggable>
      {isModalOpen && (
        <Modal
          card={card}
          closeModal={() => setIsModalOpen(false)}
          deleteCard={deleteCard}
        />
      )}
    </>
  );
}

export default Card;
