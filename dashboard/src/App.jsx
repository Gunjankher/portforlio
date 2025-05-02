import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect, lazy, Suspense } from "react";
import {
  getUser,
  getAllSkills,
  getAllSoftwareApplications,
  getAllTimeline,
  getAllMessages,
  getAllProjects,
} from "./store/actions"; // (Create this file for centralized async calls)
import Loader from "./components/Loader"; // Create a simple spinner/loading screen

// Lazy-loaded route components
const HomePage = lazy(() => import("./pages/HomePage"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ManageSkills = lazy(() => import("./pages/ManageSkills"));
const ManageTimeline = lazy(() => import("./pages/ManageTimeline"));
const ManageProjects = lazy(() => import("./pages/ManageProjects"));
const UpdateProject = lazy(() => import("./pages/UpdateProject"));
const ViewProject = lazy(() => import("./pages/ViewProject"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Don't block rendering; fetch async data in background
    dispatch(getUser());
    dispatch(getAllSkills());
    dispatch(getAllSoftwareApplications());
    dispatch(getAllTimeline());
    dispatch(getAllMessages());
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/manage/skills" element={<ManageSkills />} />
          <Route path="/manage/timeline" element={<ManageTimeline />} />
          <Route path="/manage/projects" element={<ManageProjects />} />
          <Route path="/view/project/:id" element={<ViewProject />} />
          <Route path="/update/project/:id" element={<UpdateProject />} />
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
