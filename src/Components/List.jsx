import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card.jsx";

function List({ listId, index }) {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.listsById[listId]);
  const [title, setTitle] = useState(list.title || "");

  const addCard = (title) => {
    dispatch({
      type: "ADD_CARD",
      payload: { title, description: "", dueDate: "", cardId: `${Date.now()}`, listId },
    });
  };

  const deleteList = () => {
    dispatch({
      type: "DELETE_LIST",
      payload: { listId, cards: list.cards },
    });
  };

  const updateListTitle = (title) => {
    setTitle(title);
    dispatch({
      type: "CHANGE_LIST_TITLE",
      payload: { listId, listTitle: title },
    });
  };

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided) => (
        <div
          className="bg-white rounded-lg shadow-md p-4 w-64 mx-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            value={title}
            onChange={(e) => updateListTitle(e.target.value)}
            className="w-full text-lg font-semibold mb-2 p-2 border-b focus:outline-none focus:border-blue-500"
            placeholder="New List"
          />
          <button
            onClick={deleteList}
            className="text-sm text-red-600 hover:underline mb-4"
          >
            Delete List
          </button>

          <Droppable droppableId={list._id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.cards.map((cardId, i) => (
                  <Card key={cardId} cardId={cardId} listId={list._id} index={i} />
                ))}
                {provided.placeholder}
                <button
                  onClick={() => addCard("New Card")}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Add Card
                </button>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default List;
