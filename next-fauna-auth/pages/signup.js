import {useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '../layouts/default';
import {useCookies} from 'react-cookie';
import {useFormik} from 'formik';
import * as yup from 'yup';
import styled from '@emotion/styled';
import {TextField, Button} from '@mui/material';

const StyledFormItem = styled.div`
  margin-top: 30px;
`;

const Signup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['fauna_token']);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

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
      if (errorMessage) {
        setErrorMessage('');
        return;
      }

      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const resultInfo = await response.json();
        if (resultInfo.httpStatus === 200) {
          router.push('/');
          setCookie('fauna_token', resultInfo.token);
        } else if (resultInfo.httpStatus === 400) {
          setErrorMessage(resultInfo.message);
        } else if (resultInfo.httpStatus === 401) {
          setErrorMessage(resultInfo.message);
        } else if (resultInfo.httpStatus === 500) {
          setErrorMessage(resultInfo.message);
        } else {
          setErrorMessage(`somthing went wrong...`);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(`somthing went wrong...`);
      }
    },
  });

  return (
    <Layout>
      <h1>Sign Up</h1>
      {errorMessage && <p>{errorMessage}</p>}
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

export default Signup;
