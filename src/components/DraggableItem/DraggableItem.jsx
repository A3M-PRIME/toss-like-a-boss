import React, { useState } from "react";
import ItemTypes from "../ItemTypes/ItemTypes";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left"
};

let firstTry = true;
let currentGameValue = 0;

const DraggableItem = ({ name, isDragging, connectDragSource, label }) => {
  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={connectDragSource} style={{ ...style, opacity }}>
      {label}
    </div>
  );
};

let mapStateToProps = state => {
  return {
    items: state.gameItemsReducer,
    currentGameValue: state.currentGameValueReducer
  };
};

let DragNDrop = withRouter(connect(mapStateToProps)(
  DragSource(
    ItemTypes.BOX,
    {
      beginDrag: props => ({ name: props.name }),
      endDrag(props, monitor) {
        console.log(props.items);
        console.log(props.currentGameValue);
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        //if correct on the first try
        if (props.currentGameValue === props.items.length - 1) {
          props.history.push("/results");
        } else {
          if (dropResult && dropResult.name == item.name && firstTry === true) {
            props.dispatch({
              type: "FIRST_TRY_CORRECT",
              payload: { id: props.items[props.currentGameValue].id }
            });
            props.dispatch({
              type: "INCREMENT_CURRENT_GAME_VALUE"
            });
            alert(`You dropped ${item.name} into ${dropResult.name}!`);
            firstTry = true;
          }
          // if incorrect first try, will increment count for piece of trash up one, and will make you repeat until correct
          else if (
            dropResult &&
            dropResult.name !== item.name &&
            firstTry === true
          ) {
            firstTry = false;
            console.log(firstTry);
            props.dispatch({
              type: "FIRST_TRY_INCORRECT",
              payload: { id: props.items[props.currentGameValue].id }
            });
            props.dispatch({
              type: "ADD_WRONG_ANSWER",
              payload: props.items[props.currentGameValue]
            });
            console.log(
              "object being sent to wrong answer arrray",
              props.items[props.currentGameValue]
            );
            alert("Keep trying!");
            //will tell you to keep trying until you get it correct to move onto the next item
          } else if (
            dropResult &&
            dropResult.name !== item.name &&
            firstTry === false
          ) {
            alert("Keep trying!");
          } else if (
            dropResult &&
            dropResult.name == item.name &&
            firstTry === false
          ) {
            props.dispatch({
              type: "INCREMENT_CURRENT_GAME_VALUE"
            });
            firstTry = true;
            alert("Way to Go!");
          }
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(DraggableItem)
));

export default DragNDrop;
