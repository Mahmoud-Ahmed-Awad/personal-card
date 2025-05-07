import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./context/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login.jsx";
import Regsiter from "./pages/user/Regsiter.jsx";
import EmailVerification from "./pages/user/EmailVerification.jsx";
import VerifyEmail from "./pages/user/VerifyEmail.jsx";
import ResetPassword from "./pages/user/ResetPassword.jsx";
import ResetPasswordEmailSent from "./pages/user/ResetPasswordEmailSent.jsx";
import ResetPasswordEmailSender from "./pages/user/ResetPasswordEmailSender.jsx";
import Profile from "./pages/user/Profile.jsx";
import IsLoggedIn from "./pages/user/IsLoggedIn.jsx";
import Home from "./pages/Home.jsx";
import PersonalCard from "./pages/PersonalCard.jsx";
// import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <div className="bg-gradient-to-tr from-slate-950 to-slate-700 text-white min-h-dvh">
    {/* <div className="bg-[#111827] text-white min-h-dvh"> */}
    {/* <div className="bg-gradient-to-tr from-slate-950 to-slate-700 text-white h-dvh"> */}
    <Provider store={store}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="flex justify-center items-center text-white p-10 flex-col">
          <Routes>
            <Route index element={<Home />} />
            <Route path="card/:id" element={<PersonalCard />} />
            {/* <Route path="user"> */}
            <Route
              element={
                <IsLoggedIn mustBeLoggedIn={true} mustEmailVerified={false} />
              }
            >
              <Route
                path="email-verification"
                element={<EmailVerification />}
              />
            </Route>
            <Route path="verify-email/:token" element={<VerifyEmail />} />
            {/* Email verified */}
            <Route
              element={
                <IsLoggedIn mustBeLoggedIn={true} mustEmailVerified={true} />
              }
            >
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route element={<IsLoggedIn mustBeLoggedIn={false} />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Regsiter />} />
              <Route
                path="reset-password-sender"
                element={<ResetPasswordEmailSender />}
              />
              <Route
                path="reset-password-email-sent"
                element={<ResetPasswordEmailSent />}
              />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Route>
            {/* </Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  </div>
);
