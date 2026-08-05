import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Landing } from '@/pages/Landing';
import { Login } from '@/pages/Login';
import { Invitation } from '@/pages/Invitation';
import { AdminDashboard } from '@/pages/AdminDashboard';
import { TemplateGallery } from '@/pages/TemplateGallery';
import { WeddingInvitation } from '@/pages/WeddingInvitation';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/invitation/:id" element={<Invitation />} />
        </Route>

        {/* Wedding Invitation — Standalone immersive page */}
        <Route path="/wedding/:id" element={<WeddingInvitation />} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/invitations" element={<AdminDashboard />} />
          <Route path="/admin/guests" element={<AdminDashboard />} />
          <Route path="/admin/templates" element={<TemplateGallery />} />
          <Route path="/admin/settings" element={<AdminDashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
