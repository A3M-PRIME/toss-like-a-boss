import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';

const Types = {
    ITEM: 'trash'
}

const itemSource = {
    beginDrag(props) {
        console.log('this is dragging');
        console.log(this.props)
        const item = {id: props.id}
        return item
    },

    endDrag(props, monitor, component) {
        const dropResult = monitor.getDropResult()
        if (!monitor.didDrop()) {
            console.log('drop')
            console.log('drop result is', dropResult)
            alert('an alert')
            return
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class DraggableItem extends Component {
    render() {
        const { id } = this.props
        const { isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            <div className='item' style={{opacity}}>
                {/* <span>{this.props.gameItems[0].name}</span> */}
               TRASHY TRASH {id}
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        gameItems: reduxStore.gameItemsReducer
    }
}
export default DragSource(Types.ITEM, itemSource, collect)(connect(mapStateToProps)(DraggableItem));