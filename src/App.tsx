import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layouts/MainLayout';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Seo } from '@/components/Seo';

const Landing = lazy(() => import('@/pages/Landing').then((module) => ({ default: module.Landing })));
const Login = lazy(() => import('@/pages/Login').then((module) => ({ default: module.Login })));
const Invitation = lazy(() => import('@/pages/Invitation').then((module) => ({ default: module.Invitation })));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const TemplateGallery = lazy(() => import('@/pages/TemplateGallery').then((module) => ({ default: module.TemplateGallery })));
const WeddingInvitation = lazy(() => import('@/pages/WeddingInvitation').then((module) => ({ default: module.WeddingInvitation })));
const NotFound = lazy(() => import('@/pages/NotFound').then((module) => ({ default: module.NotFound })));

const pageFallback = (
  <div className="min-h-screen flex items-center justify-center bg-black text-ivory">
    <p className="font-body text-body-sm uppercase tracking-[0.2em]">Loading experience...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Seo />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Suspense fallback={pageFallback}><Landing /></Suspense>} />
          <Route path="/templates" element={<Suspense fallback={pageFallback}><TemplateGallery /></Suspense>} />
          <Route path="/invitation/:id" element={<Suspense fallback={pageFallback}><Invitation /></Suspense>} />
        </Route>

        {/* Wedding Invitation — Standalone immersive page */}
        <Route path="/wedding/:id" element={<Suspense fallback={pageFallback}><WeddingInvitation /></Suspense>} />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Suspense fallback={pageFallback}><Login /></Suspense>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Suspense fallback={pageFallback}><AdminDashboard /></Suspense>} />
          <Route path="/admin/invitations" element={<Suspense fallback={pageFallback}><AdminDashboard /></Suspense>} />
          <Route path="/admin/guests" element={<Suspense fallback={pageFallback}><AdminDashboard /></Suspense>} />
          <Route path="/admin/templates" element={<Suspense fallback={pageFallback}><TemplateGallery /></Suspense>} />
          <Route path="/admin/settings" element={<Suspense fallback={pageFallback}><AdminDashboard /></Suspense>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Suspense fallback={pageFallback}><NotFound /></Suspense>} />
      </Routes>
    </BrowserRouter>
  );
}
