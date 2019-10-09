import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import {connect} from 'react-redux';

const Types = {
    GAMEITEM: 'gameItem',
}

const itemSource = {
    beginDrag(props) {
        console.log('this is dragging');
        return props.item;
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPReview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class DraggableItem extends Component {
    render() {
        const { isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(
            <div className='item' style={{opacity}}>
                <span>{this.props.gameItems[0].name}</span>
            </div>
        );
    }
}

const mapStateToProps = (reduxStore) => {
    return {
        gameItems: reduxStore.gameItemsReducer
    }
}
export default DragSource('item', itemSource, collect)(connect(mapStateToProps)(DraggableItem));