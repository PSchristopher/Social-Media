
import './App.css';
import { Route, Router, Link, Routes } from 'react-router-dom'
import Signin from './pages/user/Signin/Signin'
import Signup from './pages/user/SignUp/Signup';
import Home from './pages/user/Home/Homepage'
import AdminLogin from './components/admin/AdminLogin/AdminLogin';
import AdminHome from './pages/admin/AdminHome';
import UserList from './components/admin/AdminHome/UserList';
import { AppContext, NotificationContex } from './Context/Context'
import { useState } from 'react';
import Post from './pages/user/Post/Post'
import UserProfile from './pages/user/Profile/UserProfile';
import Forgot from './pages/user/Forgot/Forgot';
import GoOthersProfile from './pages/user/SearchUser/GoOthersProfile';
import Test from './pages/Test';
import UserChat from './pages/user/Conversation/UserChat';
import { socket, SocketContext } from './Context/SocketContext';
import Noticications from './components/user/Notifi/Noticications';
import PostList from './components/admin/AdminHome/PostList';
import ErrorPage from './pages/user/Error/ErrorPage';
import jwtDecode from 'jwt-decode';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
function App() {

  let userDetails = localStorage.getItem("Usertoken")
  let adminTocken = true

  const [ShowPostModal, setShowPostModal] = useState(false)
  const [Shownotification, setShowNotification] = useState(false)

  return (
    <>
      <AppContext.Provider value={{ ShowPostModal, setShowPostModal }}>
        <NotificationContex.Provider value={{ Shownotification, setShowNotification }}>
          <Noticications />
          <Post />
          <Routes>
            {/* <UserRoutes />

            <AdminRoutes /> */}

            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Signin />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/forgotPassword' element={<Forgot />} />
            <Route path='/userProfile' element={<UserProfile />} />
            <Route path='/searchProfile' element={<GoOthersProfile />} />
            <Route path='/Chat' element={<UserChat />} />

            <Route path='/adminlogin' element={<AdminLogin />} />
            <Route path='/admin' element={<AdminHome />}>
              <Route path='/admin/User_list' element={<UserList />} />
              <Route path='/admin/Report_post' element={<PostList />} />
            </Route>

            <Route path='*' element={<ErrorPage />} />

          </Routes>

        </NotificationContex.Provider>
      </AppContext.Provider>




    </>
  );
}

export default App;
