import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/user/Home/Home'
import UserChat from '../pages/user/Conversation/UserChat'
import ErrorPage from '../pages/user/Error/ErrorPage'
import Forgot from '../pages/user/Forgot/Forgot'
import UserProfile from '../pages/user/Profile/UserProfile'
import GoOthersProfile from '../pages/user/SearchUser/GoOthersProfile'
import Signin from '../pages/user/Signin/Signin'
import Signup from '../pages/user/SignUp/Signup'

function UserRoutes() {
    return (
        <>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Signin />} />
                <Route path='/register' element={<Signup />} />
                <Route path='/forgotPassword' element={<Forgot />} />
                <Route path='/userProfile' element={<UserProfile />} />
                <Route path='/searchProfile' element={<GoOthersProfile />} />
                <Route path='/Chat' element={<UserChat />} />
        </>
    )
}

export default UserRoutes