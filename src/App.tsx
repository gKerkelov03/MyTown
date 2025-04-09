import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { useEffect } from 'react';
import { auth } from './config/firebase';
import { useStore } from './store/useStore';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const { setUser } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return <RouterProvider router={router} />;
}

export default App;
