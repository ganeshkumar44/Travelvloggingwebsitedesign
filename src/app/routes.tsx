import React from "react";
import { createBrowserRouter } from 'react-router';
import { ReactNode } from 'react';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Stories from './pages/Stories';
import Vlogs from './pages/Vlogs';
import Events from './pages/Events';
import Contact from './pages/Contact';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/gallery',
    element: (
      <Layout>
        <Gallery />
      </Layout>
    ),
  },
  {
    path: '/stories',
    element: (
      <Layout>
        <Stories />
      </Layout>
    ),
  },
  {
    path: '/vlogs',
    element: (
      <Layout>
        <Vlogs />
      </Layout>
    ),
  },
  {
    path: '/events',
    element: (
      <Layout>
        <Events />
      </Layout>
    ),
  },
  {
    path: '/contact',
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: '*',
    element: (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl mb-4">404</h1>
            <p className="text-xl text-[var(--gray-dark)] mb-8">Page not found</p>
            <a href="/" className="text-[var(--primary)] hover:underline">
              Go back home
            </a>
          </div>
        </div>
      </Layout>
    ),
  },
]);