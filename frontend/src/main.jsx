import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, 
  createRoutesFromElements, 
  Navigate, 
  Route, 
  RouterProvider 
} from 'react-router-dom';
import store from './store.js';
import {Provider, useSelector} from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import HomeScreen from './screens/user/HomeScreen.jsx'
import LoginScreen from './screens/user/LoginScreen.jsx'
import RegisterScreen from './screens/user/RegisterScreen.jsx'
import ProfileScreen from './screens/user/ProfileScreen.jsx';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? children : <Navigate to="/login" replace />;
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
          <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
