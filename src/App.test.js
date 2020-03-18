import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  const { getByText, getByRole } = render(<App />)
  const linkElement = getByText(/Backlog/i)
  const linkToDo = getByText(/to do/i)
  const linkProgress = getByText(/In progress/i)
  const linkDone = getByText(/Done/i)
  expect(linkElement).toBeInTheDocument()
  expect(linkToDo).toBeInTheDocument()
  expect(linkProgress).toBeInTheDocument()
  expect(linkDone).toBeInTheDocument()
})

test('render the input form to add task', () => {
  const { getByRole } = render(<App />)
  const taskButton = getByRole('add-task')
  const taskInput = getByRole('input-task')
  expect(taskButton).toBeInTheDocument()
  expect(taskButton).toHaveAttribute('value', 'Valider')
  expect(taskInput).toBeInTheDocument()
  expect(taskInput).toHaveAttribute('placeholder', 'Enter a new task here')
})
