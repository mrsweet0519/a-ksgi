import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/common/Layout';
import DashboardPage from './pages/DashboardPage';
import JwadamPage from './pages/JwadamPage';
import MentoringPage from './pages/MentoringPage';
import MeetingPage from './pages/MeetingPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AssemblySchedulePage from './pages/AssemblySchedulePage';
import ChantingSchedulePage from './pages/ChantingSchedulePage';
import YouthSchoolPage from './pages/YouthSchoolPage';
import OperationsMeetingPage from './pages/OperationsMeetingPage';
import ReportEditPage from './pages/ReportEditPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/zadankai" element={<JwadamPage />} />
            <Route path="/youth-school" element={<YouthSchoolPage />} />
            <Route path="/mentoring" element={<MentoringPage />} />
            <Route path="/meetings" element={<MeetingPage />} />
            <Route path="/operations-meeting" element={<OperationsMeetingPage />} />
            <Route path="/assembly" element={<AssemblySchedulePage />} />
            <Route path="/chanting" element={<ChantingSchedulePage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/edit/:id" element={<ReportEditPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
