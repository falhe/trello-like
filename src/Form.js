import React from 'react'
import { Formik, Form, Field, useField } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
`

const FormFeedback = styled.div`
  font-size: 12px;
  color: tomato;
  align-items: center;
  margin-right: 10px;
`

export const InputStyle = styled(Field)`
  border: 1px solid lightGrey;
  height: 30px;
  border-radius: 2px;
  margin: 10px;
  padding: 0 10px;
`

const Button = styled.input`
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1dd1a1;
  color: white;
  border: none;

  &:hover {
    background-color: #10ac84;
  }
`

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      <FormGroup>
        <Field as={InputStyle} {...field} {...props} />
        {meta.touched && meta.error && (
          <FormFeedback>{meta.error}</FormFeedback>
        )}
      </FormGroup>
    </>
  )
}

const TaskForm = ({ addTask }) => (
  <Container>
    <Formik
      initialValues={{
        task: '',
      }}
      validationSchema={Yup.object({
        task: Yup.string().required('Tache requise'),
      })}
      onSubmit={(values, { resetForm }) => {
        addTask(values)
        resetForm()
      }}
    >
      <Form>
        <Container>
          <TextInput
            label="Task"
            name="task"
            type="text"
            placeholder="Enter a new task here"
            role="input-task"
          />
          <Button type="submit" value="Valider" role="add-task" />
        </Container>
      </Form>
    </Formik>
  </Container>
)

export default TaskForm
