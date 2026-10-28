import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Login from '@/pages/auth/Login'
import Dashboard from '@/pages/dashboard/Dashboard'
import EventsList from '@/pages/events/EventsList'
import CreateEvent from '@/pages/events/CreateEvent'
import EventWorkspace from '@/pages/events/EventWorkspace'
import BrideGroom from '@/pages/events/BrideGroom'
import Schedule from '@/pages/events/Schedule'
import TemplatePublish from '@/pages/events/TemplatePublish'
import Gallery from '@/pages/events/Gallery'
import Music from '@/pages/events/Music'
import Templates from '@/pages/templates/Templates'
import Guests from '@/pages/guests/Guests'
import PublicInvitation from '@/pages/invitation/PublicInvitation'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events',
    element: (
      <ProtectedRoute>
        <EventsList />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/create',
    element: (
      <ProtectedRoute>
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id',
    element: (
      <ProtectedRoute>
        <EventWorkspace />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/bride-groom',
    element: (
      <ProtectedRoute>
        <BrideGroom />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/schedule',
    element: (
      <ProtectedRoute>
        <Schedule />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/template',
    element: (
      <ProtectedRoute>
        <TemplatePublish />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/gallery',
    element: (
      <ProtectedRoute>
        <Gallery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/events/:id/music',
    element: (
      <ProtectedRoute>
        <Music />
      </ProtectedRoute>
    ),
  },
  {
    path: '/templates',
    element: (
      <ProtectedRoute>
        <Templates />
      </ProtectedRoute>
    ),
  },
  {
    path: '/guests',
    element: (
      <ProtectedRoute>
        <Guests />
      </ProtectedRoute>
    ),
  },
  {
    path: '/undangan/:slug',
    element: <PublicInvitation />,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
])
