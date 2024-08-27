import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/shared/Navbar'
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Jobs from './components/Jobs'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/shared/ErrorPage'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import RegisterCompany from './components/admin/RegisterCompany'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


const appRouter = createBrowserRouter([{
  path: '/',
  element: <Home/>,
  errorElement:<ErrorPage/>
},
{
  path: '/login',
  element: <Login />,

}, {
  path: '/signup',
  element: <Signup />
}, {
  path:'/jobs',
  element: <Jobs/>
},
{
  path:'/jobs/description/:id',
  element:<JobDescription/>
},
{
  path:'/browse',
  element: <Browse/>
},{
  path:'/profile',
  element: <Profile/>
},
// for admin paths
{
  path:"/admin/",
  element:<ProtectedRoute/>,
  children:[{
    path:"company/register",
    element:<RegisterCompany/>
  },
  {
    path:'company',
    element:<Companies/>
  },
  {
    path:"company/:id",
    element:<CompanySetup/>
  },
  {
    path:"jobs/",
    element:<AdminJobs/>
  },
  {
    path:"jobs/post",
    element:<PostJob/>
  },
  {
    path:'jobs/:id/applicants',
    element:<Applicants/>
  }
]},



]);

function App() {



  return (
    <>
      <RouterProvider router={appRouter}/>  
    </>
  )
}

export default App
