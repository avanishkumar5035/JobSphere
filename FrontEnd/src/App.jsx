import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import SeekerDashboard from './pages/Dashboard/Seeker';
import EmployerDashboard from './pages/Dashboard/Employer';
import AdminPanel from './pages/Admin/AdminPanel';
import AdminLogin from './pages/Admin/AdminLogin';
import PostJob from './pages/PostJob';
import AdminRoute from './components/routing/AdminRoute';
import PrivateRoute from './components/routing/PrivateRoute';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-300">
          {/* Animated Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 dark:bg-purple-900/20 blur-[100px] animate-pulse" />
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-400/30 dark:bg-indigo-900/20 blur-[100px] animate-pulse delay-1000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[35%] rounded-full bg-blue-400/30 dark:bg-blue-900/20 blur-[100px] animate-pulse delay-2000" />
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.2]" />
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                {/* Add more routes here as we build them */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/companies" element={<div className="p-10 text-center dark:text-white">Companies Page (Coming Soon)</div>} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected User Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<SeekerDashboard />} />
                  <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                  <Route path="/post-job" element={<PostJob />} />
                </Route>

                {/* Protected Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminPanel />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
