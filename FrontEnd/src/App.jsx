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
import PostJob from './pages/PostJob';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            {/* Add more routes here as we build them */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/companies" element={<div className="p-10 text-center">Companies Page (Coming Soon)</div>} />
            <Route path="/dashboard" element={<SeekerDashboard />} />
            <Route path="/dashboard/employer" element={<EmployerDashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/post-job" element={<PostJob />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
