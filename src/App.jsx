import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

/* Home stays in the entry chunk (it owns the LCP); every other route is
   its own chunk and only downloads when someone visits it. */
const Video = lazy(() => import('./pages/Video.jsx'));
const Automation = lazy(() => import('./pages/Automation.jsx'));
const WorkIndex = lazy(() => import('./pages/WorkIndex.jsx'));
const WorkCase = lazy(() => import('./pages/WorkCase.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

/* Legacy service catalogue routes keep resolving so old links don't 404. */
const Services = lazy(() => import('./pages/Services.jsx'));
const Service = lazy(() => import('./pages/Service.jsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'));

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
      { path: 'video', element: page(Video) },
      { path: 'automation', element: page(Automation) },
      { path: 'work', element: page(WorkIndex) },
      { path: 'work/:slug', element: page(WorkCase) },
      { path: 'about', element: page(About) },
      { path: 'contact', element: page(Contact) },
      { path: 'blog', element: page(Blog) },
      { path: 'blog/:slug', element: page(BlogPost) },
      { path: 'privacy', element: page(Privacy) },
      { path: 'terms', element: page(Terms) },
      { path: 'services', element: page(Services) },
      { path: 'services/:slug', element: page(Service) },
      { path: 'case-studies', element: page(CaseStudies) },
      { path: '*', element: page(NotFound) },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
