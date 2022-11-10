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
import {Box, TextField, Typography} from '@mui/joy';
import {css, cx} from '@emotion/css';
import Spacer from '@/components/Spacer';
import Image from 'next/image';
import useTodo from '@/hooks/useTodo';
import useUser from '@/hooks/useUser';

const New = () => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const {createATodo} = useTodo();
  const {getUser} = useUser();
  const {data: user, error} = useSWR('getUser', async () => {
    try {
      return await getUser();
    } catch (error) {
      return error;
    }
  });

  const validationSchema = yup.object({
    task: yup.string('Enter your task').required('Task is required'),
  });

  const formik = useFormik({
    initialValues: {
      task: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      const {task} = {...formData};
      try {
        const response = await createATodo(task, user.id, user.avatorURL);
        console.log(response);
        router.push('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <Box
        component={'section'}
        className={cx(
          css`
            margin: 0 auto;
            width: 100%;
            max-width: 400px;
            padding-top: 60px;
            min-height: calc(100vh - 60px);
            @media (max-width: 768px) {
              max-width: 100%;
            }
          `
        )}
      >
        <Box
          className={cx(
            `bg-gradient-to-r from-gray-100 to-slate-100 shadow-2xl rounded-md`
          )}
        >
          <Box className={`flex flex-col justify-center items-center`}>
            <Box
              className={`bg-gradient-to-r from-blue-800 to-sky-500 w-full flex flex-col gap-1 items-center justify-center`}
            >
              <Image
                alt="logo"
                src={'/assets/logo.png'}
                width={120}
                height={120}
              />
              <Typography component="h2" className="!text-2xl font-bold">
                Create New Todo
              </Typography>
            </Box>
          </Box>
          <Spacer />
          <Box
            component={'form'}
            onSubmit={formik.handleSubmit}
            className={`p-2`}
          >
            <Box>
              <TextField
                fullWidth
                id="task"
                name="task"
                label="タスク"
                autoFocus
                value={formik.values.task}
                onChange={formik.handleChange}
                error={formik.touched.task && Boolean(formik.errors.task)}
                helperText={formik.touched.task && formik.errors.task}
                className={css`
                  label {
                    font-weight: 700;
                  }
                `}
              />
            </Box>
            <Spacer />
            <Box className={`flex items-center justify-end`}>
              <button
                type="submit"
                className={cx(
                  `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                  `hover:bg-blue-700`,
                  `outline-none focus-visible:ring-2 focus-visible:ring-black`
                )}
              >
                Create
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default New;
