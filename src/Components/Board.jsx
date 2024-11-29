import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import List from "./List";

function Board() {
  const board = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch({
          type: "MOVE_LIST",
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
          },
        });
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch({
        type: "MOVE_CARD",
        payload: {
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        },
      });
    }
  };

  const createList = () => {
    dispatch({
      type: "ADD_LIST",
      payload: { listId: `${Date.now()}`, listTitle: "New List" },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="board"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div className="h-screen bg-gray-100 flex flex-col">
              <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                <div className="flex space-x-4">
                  {/* Render all lists */}
                  {board.lists.map((listId, index) => (
                    <List key={listId} index={index} listId={listId} />
                  ))}
                  {/* Add New List Button */}
                  <button
                    onClick={createList}
                    className="flex-shrink-0 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
                  >
                    Add New List
                  </button>
                </div>
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
