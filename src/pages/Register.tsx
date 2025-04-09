import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { UserPlusIcon, UserIcon, EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required')
    .trim(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces')
    .required('Name is required')
    .trim(),
});

type RegisterFormData = yup.InferType<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    setError,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setAuthError(null);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: data.name,
        email: data.email,
        role: 'citizen',
        createdAt: new Date().toISOString(),
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase auth errors
      const authError = error as AuthError;
      if (authError.code === 'auth/email-already-in-use') {
        setAuthError('This email is already registered. Please use a different email or try logging in.');
        setError('email', { type: 'manual', message: 'This email is already registered' });
      } else if (authError.code === 'auth/invalid-email') {
        setAuthError('The email address is invalid.');
        setError('email', { type: 'manual', message: 'The email address is invalid' });
      } else if (authError.code === 'auth/weak-password') {
        setAuthError('The password is too weak. Please use a stronger password.');
        setError('password', { type: 'manual', message: 'The password is too weak' });
      } else if (authError.code === 'auth/network-request-failed') {
        setAuthError('Network error. Please check your internet connection.');
      } else {
        setAuthError('An error occurred during registration. Please try again.');
      }
      
      toast.error('Failed to create account');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <UserPlusIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="mt-6 text-3xl font-display font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="card">
          {authError && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-md text-error-700 text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-error-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {authError}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <div className="flex items-center gap-2 mb-1">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <label htmlFor="name" className="input-label">
                  Full name
                </label>
              </div>
              <input
                {...register('name')}
                id="name"
                type="text"
                className={`w-full ${errors.name ? 'error' : touchedFields.name && !errors.name ? 'border-success-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.name ? (
                <p className="input-error flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name.message}
                </p>
              ) : touchedFields.name && !errors.name ? (
                <p className="input-success flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Name is valid
                </p>
              ) : (
                <p className="input-hint">Enter your full name as it appears on official documents</p>
              )}
            </div>
            
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
                <p className="input-error flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email.message}
                </p>
              ) : touchedFields.email && !errors.email ? (
                <p className="input-success flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
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
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="new-password"
                className={`w-full ${errors.password ? 'error' : touchedFields.password && !errors.password ? 'border-success-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.password ? (
                <p className="input-error flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.password.message}
                </p>
              ) : touchedFields.password && !errors.password ? (
                <p className="input-success flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Password is valid
                </p>
              ) : (
                <p className="input-hint">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
              )}
            </div>
            
            <div className="input-group">
              <div className="flex items-center gap-2 mb-1">
                <KeyIcon className="h-5 w-5 text-gray-400" />
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm password
                </label>
              </div>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`w-full ${errors.confirmPassword ? 'error' : touchedFields.confirmPassword && !errors.confirmPassword ? 'border-success-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword ? (
                <p className="input-error flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              ) : touchedFields.confirmPassword && !errors.confirmPassword ? (
                <p className="input-success flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Passwords match
                </p>
              ) : (
                <p className="input-hint">Re-enter your password to confirm</p>
              )}
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
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 