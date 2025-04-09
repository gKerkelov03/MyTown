import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  name: yup.string().required('Name is required'),
});

type RegisterFormData = yup.InferType<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
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
    } catch {
      toast.error('Failed to create account');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
            <UserPlusIcon className="h-6 w-6 text-primary-600" />
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Full name
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className={`w-full ${errors.name ? 'error' : ''}`}
                placeholder="John Doe"
              />
              {errors.name ? (
                <p className="input-error">{errors.name.message}</p>
              ) : (
                <p className="input-hint">Enter your full name as it appears on official documents</p>
              )}
            </div>
            
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email address
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full ${errors.email ? 'error' : ''}`}
                placeholder="you@example.com"
              />
              {errors.email ? (
                <p className="input-error">{errors.email.message}</p>
              ) : (
                <p className="input-hint">We'll never share your email with anyone else</p>
              )}
            </div>
            
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="new-password"
                className={`w-full ${errors.password ? 'error' : ''}`}
                placeholder="••••••••"
              />
              {errors.password ? (
                <p className="input-error">{errors.password.message}</p>
              ) : (
                <p className="input-hint">Must be at least 6 characters long</p>
              )}
            </div>
            
            <div className="input-group">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm password
              </label>
              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                className={`w-full ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="••••••••"
              />
              {errors.confirmPassword ? (
                <p className="input-error">{errors.confirmPassword.message}</p>
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