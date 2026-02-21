import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DoctorDashboard from './pages/doctor-dashboard';
import AppointmentBooking from './pages/appointment-booking';
import AdministratorDashboard from './pages/administrator-dashboard';
import PatientDashboard from './pages/patient-dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import PrescriptionManagement from './pages/prescription-management';
import PatientManagement from './pages/patient-management';
import ClinicalTools from './pages/clinical-tools';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<Login />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/appointment-booking" element={<AppointmentBooking />} />
          <Route path="/administrator-dashboard" element={<AdministratorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/prescription-management" element={<PrescriptionManagement />} />
          <Route path="/patient-management" element={<PatientManagement />} />
          <Route path="/clinical-tools" element={<ClinicalTools />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
