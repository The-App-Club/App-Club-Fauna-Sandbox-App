import {useState} from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import {gql} from 'graphql-request';
import Layout from '../layouts/default';
import {graphQLClient} from '../utils/faunaGraphQLClient';
import {useCookies} from 'react-cookie';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import {TextField, Button} from '@mui/material';
import {useRedirect} from '../hooks/useRedirect';

const StyledFormItem = styled.div`
  margin-top: 30px;
`;

const New = () => {
  useRedirect();

  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const [errorMessage, setErrorMessage] = useState('');

  const {data: resultInfo, error} = useSWR('/api/user', async (url) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: cookies.fauna_token,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      return error;
    }
  });

  const validationSchema = yup.object({
    task: yup.string('Enter your task').required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      task: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      const {task} = {...formData};
      if (errorMessage) {
        setErrorMessage('');
        return;
      }

      const mutation = gql`
        mutation CreateATodo($task: String!, $owner: ID!) {
          createTodo(
            data: {task: $task, completed: false, owner: {connect: $owner}}
          ) {
            task
            completed
            owner {
              _id
            }
          }
        }
      `;

      const variables = {
        task,
        owner: resultInfo.httpStatus === 200 && resultInfo.id,
      };

      try {
        const response = await graphQLClient(cookies.fauna_token).request(
          mutation,
          variables
        );
        console.log(response);
        router.push('/');
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <Layout>
      <h1>Create New Todo</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={formik.handleSubmit}>
        <StyledFormItem>
          <TextField
            fullWidth
            id="task"
            name="task"
            label="Task"
            value={formik.values.task}
            onChange={formik.handleChange}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={formik.touched.task && formik.errors.task}
          />
        </StyledFormItem>
        <StyledFormItem>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </StyledFormItem>
      </form>
    </Layout>
  );
};

export default New;
