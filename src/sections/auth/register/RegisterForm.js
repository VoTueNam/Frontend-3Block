import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
// @mui
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// components
import Iconify from '../../../components/Iconify';
// hooks
// import useAuth from '../../../hooks/useAuth';
import { useAuth } from '../../../firebaseLogin/contexts/AuthContext';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const [isSubmittings, setIsSubmittings] = useState(false);
  const [showError, setShowError] = useState(true);
  const [errorsNe, setErrorsNe] = useState(''); //errorsNe
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    // setError,
    handleSubmit,
    // formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    setIsSubmittings(true);

    axios
      .get('https://emailvalidation.abstractapi.com/v1/?api_key=c8fb3d51ced64b25ad35773d2558a754&email=' + data.email)
      .then(async function (response) {
        if (response.data.deliverability === 'DELIVERABLE') {
          try {
            await register(data.email, data.password, data.firstName, data.lastName).then((res) => {
              res.user.displayName = data.firstName + ' ' + data.lastName;
              // console.log(res.user);
              setIsSubmittings(false);
              navigate('/auth/login');
              enqueueSnackbar('Register Successfully', { variant: 'success' });
              const oldDisplayName = JSON.parse(localStorage.getItem('displayName'));
              if (!oldDisplayName) {
                localStorage.setItem('displayName', JSON.stringify([{ [data.email]: res.user.displayName }]));
              } else {
                oldDisplayName.push({ [data.email]: res.user.displayName });
                localStorage.setItem('displayName', JSON.stringify(oldDisplayName));
              }
            });
          } catch (error) {
            setIsSubmittings(false);
            setShowError(false);
            reset();
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
              setErrorsNe('Email Already In Use!');
            } else if (error.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
              setErrorsNe('Password should be at least 6 characters');
            } else {
              setErrorsNe(error.message);
            }
          }
        } else {
          throw new Error('Wrong Email');
        }
      })
      .catch((err) => {
        setShowError(false);
        setIsSubmittings(false);
        setErrorsNe(err);
      });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!showError && <Alert severity="error">{errorsNe}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmittings}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
