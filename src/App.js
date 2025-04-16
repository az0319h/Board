import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Notfound from './pages/NotFound';
import Home from './pages/Home';
import PostForm from './pages/PostForm';
import PostDetail from './pages/PostDetail';
import FireWall from './components/FireWall';

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    errorElement : <Notfound />,
    children : [
      { index : true,  element : <Home />},
      { path : '/posts/new', element : <FireWall><PostForm /></FireWall>},
      { path : '/posts/:id', element : <PostDetail />},
    ]    
  }
])

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
