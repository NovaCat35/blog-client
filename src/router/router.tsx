import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../components/Home";
import BlogPage from "../components/BlogPage";
import ProjectPage from "../components/ProjectPage";
import AboutPage from "../components/AboutPage";


const Router = () => {
   const router = createBrowserRouter([
      {
         path: '/',
         element: <Home />
      },
      {
         path: '/blogs',
         element: <BlogPage />
      },
      {
         path: '/projects',
         element: <ProjectPage />
      },
      {
         path: '/about',
         element: <AboutPage />
      }
   ])

   return <RouterProvider router={router} />
}

export default Router;