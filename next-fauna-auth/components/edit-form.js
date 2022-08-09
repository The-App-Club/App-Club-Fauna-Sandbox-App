import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Layout from '../layouts/default';
import {gql} from 'graphql-request';
import {graphQLClient} from '../utils/faunaGraphQLClient';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import {TextField, Button, Checkbox} from '@mui/material';

const StyledFormItem = styled.div`
  margin-top: 30px;
`;

const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const EditForm = ({defaultValues, id, token}) => {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = yup.object({
    task: yup.string('Enter your task').required('Task is required'),
  });

  const formik = useFormik({
    initialValues: {
      task: defaultValues.task,
      completed: defaultValues.completed,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (formData, {resetForm}) => {
      const {task, completed} = {...formData};
      console.log(formData);
      if (errorMessage) {
        setErrorMessage('');
        return;
      }

      const mutation = gql`
        mutation UpdateATodo($id: ID!, $task: String!, $completed: Boolean!) {
          updateTodo(id: $id, data: {task: $task, completed: $completed}) {
            task
            completed
          }
        }
      `;

      const variables = {
        id,
        task,
        completed,
      };

      try {
        const response = await graphQLClient(token).request(
          mutation,
          variables
        );
        console.log(response);
        resetForm();
        router.push('/');
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={formik.handleSubmit}>
        <StyledFormItem>
          <TextField
            fullWidth
            id="task"
            name="task"
            label="task"
            value={formik.values.task}
            onChange={formik.handleChange}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
          />
        </StyledFormItem>

        <StyledFormItem>
          <Checkbox
            {...label}
            id="completed"
            name="completed"
            label="completed"
            value={formik.values.completed}
            onChange={formik.handleChange}
            checked={formik.values.completed}
          />
        </StyledFormItem>

        <StyledFormItem>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </StyledFormItem>
      </form>
    </>
  );
};

export default EditForm;
