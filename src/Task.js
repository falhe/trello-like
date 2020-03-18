import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: ${props =>
    props.isDragging ? '2px solid #1dd1a1' : '1px solid lightgrey'};
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  box-shadow: 0 2px 2px lightgrey;
`

const Task = ({ task, index }) => (
  <Draggable draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {task.content}
      </Container>
    )}
  </Draggable>
)

export default Task
