import { AuthProvider } from './pages/common/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/common/Login'
import Signup from './pages/common/Signup'
import NotFound from './pages/common/NotFound'
import Dashboard from './pages/common/Dashboard';
import UserProfile from './pages/common/UserProfile';

import LearnerHome from './pages/learner/Home';
import AdminHome from './pages/admin/Home';
import InstructorHome from './pages/instructor/home1';
import AddCourses from './pages/instructor/AddCourses';
import CourseViewPage from './pages/learner/CourseViewPage';
import PaymentSuccess from './pages/common/PaymentSuccess';
export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={1000} />
      <AuthProvider>
        <Routes>

          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Login />} />
          <Route path='/payment-done' element={<PaymentSuccess/>}/>
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<Signup />} />
          <Route path='' element={<Dashboard />} >
            
          </Route>

          <Route path='/admin' element={<Dashboard />}>
            <Route path='' element={<AdminHome />} />
            <Route path='home' element={<AdminHome />} />
            <Route path='profile' element={<UserProfile />} />
          </Route>

          <Route path='/instruct' element={<Dashboard />}>
            <Route path='' element={<InstructorHome />} />
            <Route path='home' element={<InstructorHome />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='addcourses' element={<AddCourses/>}/>
          </Route>

          <Route path='/learner' element={<Dashboard />}>
            <Route path='' element={<LearnerHome />} />
            <Route path='home' element={<LearnerHome />} />
            <Route path='profile' element={<UserProfile />} />
            <Route path='course/:id' element={<CourseViewPage />} />
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}