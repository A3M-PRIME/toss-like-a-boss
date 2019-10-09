// import React, { Component } from 'react';
// import { DropTarget } from 'react-dnd';

// const style = {
//     height: '12rem',
//     width: '12rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     color: 'white',
//     padding: '1rem',
//     textAlign: 'center',
//     fontSize: '1rem',
//     lineHeight: 'normal',
//     float: 'left',
// }

// const Types = {
//     ITEM: 'trash'
// }

// const trashTarget = {
// drop(props, monitor, component) {
//     if (monitor.didDrop()) {
//         return
//     }
// }
// }

// function collect(connect, monitor) {
//     return {
//         // Call this function inside render()
//         // to let React DnD handle the drag events:
//         connectDropTarget: connect.dropTarget(),
//         // You can ask the monitor about the current drag state:
//         isOver: monitor.isOver(),
//         isOverCurrent: monitor.isOver({ shallow: true }),
//         canDrop: monitor.canDrop(),
//         itemType: monitor.getItemType(),
//     }
// }

// class TrashBin extends Component {
//     render() {
//         const { isOver, canDrop, connectDropTarget } = this.props;
//         return connectDropTarget(
//             <div className='trash'>
//                 {isOver && canDrop && <span>Rock and roll</span>}
//                 THIS IS A BOX
//             </div>
//         );
//     }
// }

// export default DropTarget(Types.ITEM, trashTarget, collect)(TrashBin);

import React from "react";
import { DropTarget } from "react-dnd";
import ItemTypes from "../ItemTypes/ItemTypes";
const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left"
};
const CompostBin = ({ canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
      {isActive ? 'Release to drop' : 'Compost'}
    </div>
  );
};
export default DropTarget(
  ItemTypes.BOX,
  {
    drop: () => ({ name: "compost" })
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(CompostBin);
