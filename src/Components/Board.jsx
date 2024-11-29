import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";

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
            newListIndex: destination.index
          }
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
          newCardIndex: destination.index
        }
      });
    }
  };

  const createList = () => {
    dispatch({
      type: "ADD_LIST",
      payload: { listId: `${Date.now()}`, listTitle: "New List" }
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
            {board.lists.map((listId, index) => (
              <List
                key={listId}
                index={index}
                listId={listId}
              />
            ))}
            {provided.placeholder}
            <button
              onClick={createList}
            >
              Add New List
            </button>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
