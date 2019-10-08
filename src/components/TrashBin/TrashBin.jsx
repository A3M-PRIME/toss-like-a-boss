import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const Types = {
    ITEM: 'trash'
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

class TrashBin extends Component {
    render() {
        const { connectDropTarget } = this.props;
        return connectDropTarget(
            <div className='trash'>
                <div><p>THIS IS A BOX</p></div>
            </div>
        );
    }
}

export default DropTarget(Types.ITEM, {}, collect)(TrashBin);