import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'

import Task from './Task'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px;
  border: 1px solid lightgrey;
  background-color: #c8d6e5;
  border-radius: 3px;
  width: 100%;
`

const Title = styled.h3`
  padding: 8px;
`

const List = styled.div`
  flex-grow: 1;
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? '#8395a7' : '#c8d6e5')};
  transition: background-color 0.3s ease;
`

const Column = ({ column, tasks }) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <List
          {...provided.droppableProps}
          ref={provided.innerRef}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  </Container>
)

export default Column
