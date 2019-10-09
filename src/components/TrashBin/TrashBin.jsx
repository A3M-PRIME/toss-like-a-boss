import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const Types = {
    ITEM: 'trash'
}

const trashTarget = {
drop(props, monitor, component) {
    if (monitor.didDrop()) {
        return
    }
}
}

function collect(connect, monitor) {
    return {
        // Call this function inside render()
        // to let React DnD handle the drag events:
        connectDropTarget: connect.dropTarget(),
        // You can ask the monitor about the current drag state:
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}

class TrashBin extends Component {
    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className='trash'>
                {isOver && canDrop && <span>Rock and roll</span>}
                THIS IS A BOX
            </div>
        );
    }
}

export default DropTarget(Types.ITEM, trashTarget, collect)(TrashBin);