import React from 'react'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../ItemTypes/ItemTypes'
import GarbageSvg from '../../icons/GarbageFilled'

const style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}
const GarbageBin = ({ canDrop, isOver, connectDropTarget }) => {
    const isActive = canDrop && isOver
    let backgroundColor = 'rgb(0,0,0,.5)'
    if (isActive) {
        backgroundColor = 'darkgreen'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }
    return (
        <div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
            <GarbageSvg />
        </div>
    )
}
export default DropTarget(
    ItemTypes.BOX,
    {
        drop: () => ({ name: 'garbage' }),
    },
    (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
)(GarbageBin)
