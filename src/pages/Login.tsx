import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LockClosedIcon, EnvelopeIcon, EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim(),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = yup.InferType<typeof schema>;

const Login = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setAuthError(null);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific Firebase auth errors
      const authError = error as AuthError;
      if (authError.code === 'auth/user-not-found' || authError.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password');
        setError('email', { type: 'manual', message: 'Invalid email or password' });
        setError('password', { type: 'manual', message: 'Invalid email or password' });
      } else if (authError.code === 'auth/too-many-requests') {
        setAuthError('Too many failed login attempts. Please try again later.');
      } else if (authError.code === 'auth/user-disabled') {
        setAuthError('This account has been disabled. Please contact support.');
      } else {
        setAuthError('An error occurred during login. Please try again.');
      }
      
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <EnvelopeIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-display font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="card">
          {authError && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md text-error-700 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-error-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {authError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <div className="flex items-center gap-2 mb-1">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                <label htmlFor="email" className="input-label">
                  Email address
                </label>
              </div>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full ${errors.email ? 'error' : touchedFields.email && !errors.email ? 'border-success-500' : ''}`}
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p className="input-error">
                  <ExclamationCircleIcon className="h-4 w-4 inline mr-1" />
                  {errors.email.message}
                </p>
              ) : touchedFields.email && !errors.email ? (
                <p className="input-success">
                  Email is valid
                </p>
              ) : (
                <p className="input-hint">We'll never share your email with anyone else</p>
              )}
            </div>
            
            <div className="input-group">
              <div className="flex items-center gap-2 mb-1">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
                <label htmlFor="password" className="input-label">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`w-full ${errors.password ? 'error' : touchedFields.password && !errors.password ? 'border-success-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="input-error">
                  <ExclamationCircleIcon className="h-4 w-4 inline mr-1" />
                  {errors.password.message}
                </p>
              ) : touchedFields.password && !errors.password ? (
                <p className="input-success">
                  Password is valid
                </p>
              ) : (
                <p className="input-hint">Enter your password</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full flex justify-center py-3"
              >
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 