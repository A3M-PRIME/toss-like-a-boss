// import React, { Component } from 'react';
// import { DragSource } from 'react-dnd';
// import {connect} from 'react-redux';

// const Types = {
//     ITEM: 'trash'
// }

// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// }

// const itemSource = {
//     beginDrag(props) {
//         console.log('this is dragging');
//         console.log(this.props)
//         const item = {id: props.id}
//         return item
//     },

//     endDrag(props, monitor, component) {
//         const dropResult = monitor.getDropResult()
//         if (!monitor.didDrop()) {
//             console.log('drop')
//             console.log('drop result is', dropResult)
//             // alert('an alert')
//             return
//         }
//     }
// }

// function collect(connect, monitor) {
//     return {
//         connectDragSource: connect.dragSource(),
//         connectDragPreview: connect.dragPreview(),
//         isDragging: monitor.isDragging(),
//     }
// }

// class DraggableItem extends Component {
//     render() {
//         const { name, isDropped, isDragging, connectDragSource } = this.props;
//         const opacity = isDragging ? 0 : 1;

//         return connectDragSource(
//             <div className='item' style={{...style, opacity}}>{isDropped ? <s>{name}</s> : name}
//                 {/* <span>{this.props.gameItems[0].name}</span> */}
//             </div>
//         );
//     }
// }

// const mapStateToProps = (reduxStore) => {
//     return {
//         gameItems: reduxStore.gameItemsReducer
//     }
// }
// export default DragSource(Types.ITEM, itemSource, collect)(connect(mapStateToProps)(DraggableItem));

import React, { useState } from "react";
import ItemTypes from "../ItemTypes/ItemTypes";
import { DragSource } from "react-dnd";
import { connect } from "react-redux";

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



const DraggableItem = ({ name, isDragging, connectDragSource }) => {
  const opacity = isDragging ? 0 : 1;

    // function firstTryCorrect() {
    //     dispatch({
    //         type: "FIRST_TRY_CORRECT",
    //         payload: itemId
    //     });
    // }

    // function firstTryIncorrect() {
    //     this.props.dispatch({
    //         type: "FIRST_TRY_INCORRECT",
    //         // payload: this.props.id
    //     });
    //     console.log(this.props.id)
    // }


  return (
    <div ref={connectDragSource} style={{ ...style, opacity }}>
      {name}
    </div>
  );
};

let mapStateToProps = (state) => {
    return {
        items: state.gameItemsReducer
    }
}

let DragNDrop = connect(mapStateToProps)(DragSource(
  ItemTypes.BOX,
  {
    beginDrag: props => ({ name: props.name }),
    endDrag(props, monitor) {
        console.log(props.items)
      const item = monitor.getItem();
      const dropResult = monitor.getDropResult();
      //if correct on the first try
      if (dropResult && dropResult.name == item.name && firstTry === true) {
          props.dispatch({ type: 'FIRST_TRY_CORRECT', payload: {id: props.items[0].id}})
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
        firstTry = true;
      } 
      // if incorrect, will make you repeat until correct
      else if (dropResult && dropResult.name !== item.name) {
        firstTry = false;
        console.log(firstTry);
      }
      //if correct on any other try than the first, move on
      if (dropResult && dropResult.name == item.name && firstTry === false) {
        firstTry = true;
        alert("Second time is the charm!");
      }
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(DraggableItem));


export default DragNDrop