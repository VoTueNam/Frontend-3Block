import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
// import useAuth from '../../../hooks/useAuth';
import { useAuth } from '../../../firebaseLogin/contexts/AuthContext';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmittings, setIsSubmittings] = useState(false);

  const isMountedRef = useIsMountedRef();

  const [showError, setShowError] = useState(true);
  const [errorsNe, setErrorsNe] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    setIsSubmittings(true);
    login(data.email, data.password)
      .then((res) => {
        // console.log(res);
        localStorage.setItem('user', JSON.stringify(res.user));
        setIsSubmittings(false);
        navigate('/dashboard/analytics');

        // handleRedirectToOrBack();
      })
      .catch((error) => {
        console.log(error.message);
        reset();
        setShowError(false);
        setIsSubmittings(false);
        // const loiNe = ;

        const newErr = error.message
          .slice(22, -2)
          .replace(/-/g, ' ')
          .split(' ')
          .map((w) => w[0].toUpperCase() + w.substring(1).toLowerCase())
          .join(' ');

        setErrorsNe(newErr);
        // if (isMountedRef.current) {

        // }
        // toast({
        //   description: error.message,
        //   status: 'error',
        //   duration: 9000,
        //   isClosable: true,
        // });
      });

    // try {
    //   await login(data.email, data.password);
    // } catch (error) {
    //   console.error(error);
    //   reset();
    //   if (isMountedRef.current) {
    //     setError('afterSubmit', error);
    //   }
    // }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!showError && <Alert severity="error">{errorsNe}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmittings}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
