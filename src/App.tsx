import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/common/Layout';
import DashboardPage from './pages/DashboardPage';
import JwadamPage from './pages/JwadamPage';
import MentoringPage from './pages/MentoringPage';
import MeetingPage from './pages/MeetingPage';
import ReportsPage from './pages/ReportsPage';
import SchoolPage from './pages/SchoolPage';
import DepartmentPage from './pages/DepartmentPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/zadankai" element={<JwadamPage />} />
            <Route path="/meetings" element={<MeetingPage />} />
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/mentoring" element={<MentoringPage />} />
            <Route path="/department" element={<DepartmentPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
