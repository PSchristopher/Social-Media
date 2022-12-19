import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PostList from '../components/admin/AdminHome/PostList'
import UserList from '../components/admin/AdminHome/UserList'
import AdminLogin from '../components/admin/AdminLogin/AdminLogin'
import AdminHome from '../pages/admin/AdminHome'
import ErrorPage from '../pages/user/Error/ErrorPage'

function AdminRoutes() {
    return (
        <>
            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminHome />}>
                <Route path='/admin/User_list' element={<UserList />} />
                <Route path='/admin/Report_post' element={<PostList />} />
            </Route>
        </>
    )
}

export default AdminRoutes