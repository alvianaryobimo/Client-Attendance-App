import Axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AttendanceInput } from "./pages/attendanceInput";
import { Profile } from "./pages/profile";
import { Employees } from "./pages/employees";
import { Login } from "./pages/login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setValue } from "./redux/userSlice";
import { Register } from "./pages/register";
import { ReportAttendance } from "./pages/reportAttendance";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <AttendanceInput /> },
  { path: "/profile", element: <Profile /> },
  { path: "/report", element: <ReportAttendance /> },
  { path: "/employees", element: <Employees /> },
  { path: "/register/:token", element: <Register /> },

]);
function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const keepLogin = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/auth/keeplogin`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setValue(response.data));
      } catch (error) {
        localStorage.removeItem("token")
        console.log(error);
      }
    };
    keepLogin();

  }, [dispatch, token]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
