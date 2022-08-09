import {useState} from 'react';
import {TextField, Button} from '@mui/material';
import styled from '@emotion/styled';
import {useFormik} from 'formik';
import * as yup from 'yup';

import {Layout} from '../../layouts/default';

import {hashnaize} from '../../plugins/hashnaize';
import {niceMagic} from '../../fauna/magic';
import {signup} from '../../fauna/signup';
import {login} from '../../fauna/login';
import {cleanExpiredLoginToken} from '../../fauna/expire';

import {useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie';

const StyledForm = styled.form`
  position: relative;
  width: 100%;
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 300px;
  width: 100%;
  margin-top: 10vh;
  @media screen and (max-width: 768px) {
    max-width: 100%;
    margin-top: 1vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1vw;
  }
`;

const StyledHeader = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
`;

const StyledSpacer = styled.div`
  height: 3vh;
  width: 100%;
`;

const StyledDescription = styled.p`
  margin: 2vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

const MagicPage = () => {
  const [submitDisable, setSubmitDisable] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['account_id']);
  const postFaunaDB = async ({authInfo}) => {
    const {email} = {...authInfo};
    const hashedSomething = hashnaize({email});
    const authType = await niceMagic({
      email,
      hashedSomething,
    });
    let resultAuth;
    switch (authType) {
      case 'signup':
        resultAuth = await signup({hashedSomething});
        break;
      case 'login':
        resultAuth = await login({hashedSomething});
        setCookie('account_id', resultAuth);
        break;
      default:
        break;
    }
    console.log('authType, resultAuth', authType, resultAuth);
    if (resultAuth.status === `used`) {
      navigate('/dashboard');
      setCookie('account_id', resultAuth.account_id);
      return;
    }
    if (resultAuth.status === `invalid`) {
      navigate('/error');
      return;
    }
    if (resultAuth.status === `expired`) {
      navigate('/');
      const response = await cleanExpiredLoginToken({
        accountId: resultAuth.account_id,
      });
      console.log(response);
      setSubmitDisable(false);
      return;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSubmitDisable(true);
      postFaunaDB({authInfo: values});
    },
  });

  return (
    <Layout>
      <StyledContainer>
        <StyledForm onSubmit={formik.handleSubmit}>
          <StyledHeader>{'Welcome To Cowboy Bebop!'}</StyledHeader>
          <StyledDescription>
            {'This is Fauna Authentication Example.'}
          </StyledDescription>
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
          <StyledSpacer></StyledSpacer>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={submitDisable}
          >
            Submit
          </Button>
        </StyledForm>
      </StyledContainer>
    </Layout>
  );
};

export {MagicPage};
