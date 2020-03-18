import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

import data from './data'
import TaskForm from './Form'
import Column from './Column'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
`

const App = () => {
  const [initialData, setInitialData] = useState(data)

  const handleDragEnd = result => {
    const { source, destination, draggableId } = result

    if (
      !destination ||
      (destination.index === source.index &&
        destination.droppableId === source.droppableId)
    )
      return

    // retrieve source and destination columns
    const columnSource = initialData.columns[source.droppableId]
    const columnDestination = initialData.columns[destination.droppableId]

    // move in the same column
    if (columnSource === columnDestination) {
      const newTaskIds = Array.from(columnSource.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...columnSource,
        taskIds: newTaskIds,
      }

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },
      }

      setInitialData(newState)
      return
    }

    // move in different column
    // new state for the source column
    const sourceTaskIds = Array.from(columnSource.taskIds)
    sourceTaskIds.splice(source.index, 1)

    // new state for the destination column
    const destinationTaskIds = Array.from(columnDestination.taskIds)
    destinationTaskIds.splice(destination.index, 0, draggableId)

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [columnSource.id]: {
          ...columnSource,
          taskIds: sourceTaskIds,
        },
        [columnDestination.id]: {
          ...columnDestination,
          taskIds: destinationTaskIds,
        },
      },
    }

    setInitialData(newState)
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const addTask = values => {
    const uuid = `task-${getRandomInt(1, 75)}`

    const task = { [uuid]: { id: uuid, content: values.task } }

    // create the new app data state
    const newState = {
      ...initialData,
      tasks: {
        ...initialData.tasks,
        ...task,
      },
      columns: {
        ...initialData.columns,
        'column-1': {
          ...initialData.columns['column-1'],
          taskIds: [...initialData.columns['column-1'].taskIds, uuid],
        },
      },
    }
    setInitialData(newState)
  }

  return (
    <Wrapper>
      <TaskForm addTask={addTask} />
      <Container>
        <DragDropContext onDragEnd={handleDragEnd}>
          {initialData.columnOrder.map(columnId => {
            const column = initialData.columns[columnId]
            const tasks = column.taskIds.map(
              taskId => initialData.tasks[taskId]
            )
            return (
              <Column key={column.id} column={column} tasks={tasks}>
                {columnId}
              </Column>
            )
          })}
        </DragDropContext>
      </Container>
    </Wrapper>
  )
}

export default App
