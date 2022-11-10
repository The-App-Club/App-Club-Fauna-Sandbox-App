import {useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '../layouts/default';
import {useCookies} from 'react-cookie';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import {Box, TextField, Typography} from '@mui/joy';
import Spacer from '@/components/Spacer';
import {css, cx} from '@emotion/css';
import Image from 'next/image';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import useAuth from '@/hooks/useAuth';

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const {signup} = useAuth();

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      try {
        await signup(formData);
        setTimeout(() => {
          router.push('/');
        }, 300);
      } catch (error) {
        console.log(error);
      }
    },
  });
  // https://web.dev/i18n/ja/sign-in-form-best-practices/

  return (
    <Layout
      className={cx(
        `bg-gray-200`,
        css`
          background-image: url(/assets/overlapping-diamonds.svg);
        `
      )}
    >
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
                サインアップ
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
                id="email"
                name="email"
                label="メールアドレス"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Spacer />
            <Box>
              <TextField
                fullWidth
                autoComplete="new-password"
                id="password"
                name="password"
                label="パスワード"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>
            <Spacer />
            <Box className={`flex items-center justify-between`}>
              <Link href="/login">
                <a className="hover:underline">アカウント作成済みの方</a>
              </Link>
              <button
                type="submit"
                className={cx(
                  `px-6 py-2 bg-blue-600 text-white rounded-lg`,
                  `hover:bg-blue-700`,
                  `outline-none focus-visible:ring-2 focus-visible:ring-black`
                )}
              >
                サインアップ
              </button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Signup;
