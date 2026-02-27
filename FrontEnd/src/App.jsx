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
import ForgotPassword from './pages/ForgotPassword';
import CandidateProfile from './pages/CandidateProfile';
import ManageJobApplicants from './pages/Dashboard/ManageJobApplicants';
import MobileVerificationPage from './pages/MobileVerificationPage';
import AdminRoute from './components/routing/AdminRoute';
import PrivateRoute from './components/routing/PrivateRoute';

import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-background transition-colors duration-300 text-foreground">
          {/* Subtle Background Elements */}
          <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Very subtle gradient to break solid white/gray */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/20" />

            {/* Clean Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] dark:opacity-[0.1]" style={{ backgroundPosition: 'center' }} />
          </div>

          <style jsx>{`
            .bg-grid-pattern {
                background-size: 50px 50px;
                background-image: linear-gradient(to right, var(--color-gray-200) 1px, transparent 1px),
                                linear-gradient(to bottom, var(--color-gray-200) 1px, transparent 1px);
            }
            .dark .bg-grid-pattern {
                background-image: linear-gradient(to right, var(--color-gray-800) 1px, transparent 1px),
                                linear-gradient(to bottom, var(--color-gray-800) 1px, transparent 1px);
            }
          `}</style>

          {/* Content Wrapper */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/companies/:id" element={<CompanyDetails />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/premium" element={<Pricing />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected User Routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/dashboard" element={<SeekerDashboard />} />
                  <Route path="/dashboard/employer" element={<EmployerDashboard />} />
                  <Route path="/dashboard/manage-applicants/:jobId" element={<ManageJobApplicants />} />
                  <Route path="/post-job" element={<PostJob />} />
                  <Route path="/verify-mobile" element={<MobileVerificationPage />} />
                  <Route path="/profile" element={<CandidateProfile />} />
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
