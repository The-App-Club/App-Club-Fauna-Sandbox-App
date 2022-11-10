import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Layout from '../layouts/default';
import {gql} from 'graphql-request';
import {graphQLClient} from '../utils/faunaGraphQLClient';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import {Box, Checkbox, TextField} from '@mui/joy';
import {cx} from '@emotion/css';
import useTodo from '@/hooks/useTodo';
import Spacer from './Spacer';

const EditForm = ({defaultValues, id}) => {
  const router = useRouter();
  const {updateATodo} = useTodo();

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
      try {
        const response = await updateATodo(id, task, completed);
        console.log(response);
        resetForm();
        router.push({
          pathname: '/',
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
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
      </Box>

      <Spacer />

      <Box>
        <Checkbox
          color="neutral"
          id="completed"
          name="completed"
          checked={formik.values.completed}
          label={defaultValues.task}
          onChange={formik.handleChange}
          size={'lg'}
        />
      </Box>

      <Spacer />

      <Box>
        <button
          type="submit"
          className={cx(
            `px-6 py-2 bg-blue-600 text-white rounded-lg`,
            `hover:bg-blue-700`,
            `outline-none focus-visible:ring-2 focus-visible:ring-black`
          )}
        >
          変更を保存
        </button>
      </Box>
    </form>
  );
};

export default EditForm;
