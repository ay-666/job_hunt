import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className='flex h-screen flex-col mx-auto  justify-center items-center  gap-5 flex-wrap'>
        <h1 className='text-8xl font-bold text-blue-950'>Oops!</h1>
        <h3 className='text-xl font-bold'>404 - PAGE NOT FOUND</h3>
        <p className='text-md text-center text-wrap max-w-lg'>The page you are looking or might have been removed, had  its name changed or might me temporarily unavailable.</p>
        <Button onClick={()=>{
          navigate('/');
        }} className="rounded-full bg-purple-900">Return back to Home</Button>
    </div>
  )
}

export default ErrorPage