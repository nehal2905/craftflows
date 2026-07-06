import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

/* Home stays in the entry chunk (it owns the LCP); every other route is
   its own chunk and only downloads when someone visits it. */
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const Service = lazy(() => import('./pages/Service.jsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

const page = (Page) => (
  <Suspense fallback={null}>
    <Page />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: page(About) },
      { path: 'services', element: page(Services) },
      { path: 'services/:slug', element: page(Service) },
      { path: 'case-studies', element: page(CaseStudies) },
      { path: 'contact', element: page(Contact) },
      { path: 'blog', element: page(Blog) },
      { path: 'blog/:slug', element: page(BlogPost) },
      { path: '*', element: page(NotFound) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
