import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { Layout } from '../../layouts/default';
import styled from '@emotion/styled';
import { signin } from '../../fauna/signin';
import { FaunaDBQueryManager } from '../../fauna/config';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const StyledFormItem = styled.div`
  margin-top: 2rem;
`;

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

const SignIn = () => {
  let navigate = useNavigate();
  // eslint-disable-next-line
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (formData) => {
      const { email, password } = { ...formData };
      const client = new FaunaDBQueryManager({}).client;
      const { token } = await signin({
        client,
        email,
        password,
      });
      setCookie('fauna_token', token);
      navigate('/dashboard', { replace: true });
    },
  });

  return (
    <Layout>
      <h2>{'Sign In'}</h2>
      <form onSubmit={formik.handleSubmit}>
        <StyledFormItem>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </StyledFormItem>
        <StyledFormItem>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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

export { SignIn };
