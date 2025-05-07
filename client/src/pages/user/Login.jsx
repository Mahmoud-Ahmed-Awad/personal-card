import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { loginUser } from "../../api/user";
import authImage from "../../assets/auth-image.avif";
import Card from "../../components/Card";
import { setUser } from "../../context/user/userSlice";
import { useDispatch } from "react-redux";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length == 0 || password.length == 0) {
      return setError("All fields are required");
    }
    setError("");
    const res = await loginUser(email, password);

    if (res.status != 200) {
      return setError(res.data.message);
    }
    if (res.data.user.isEmailVerified) {
      dispatch(setUser(res.data.user));
      return navigator("/");
    } else {
      dispatch(setUser(res.data.user));
      return navigator("/email-verification");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-40px*2)] h-full text-white p-10 flex-col w-full">
        <Card>
          <Card.FirstPart>
            <img
              src={authImage}
              className="h-full w-full rounded-t-lg object-cover md:rounded-t-none md:rounded-l-lg"
              alt=""
            />
          </Card.FirstPart>
          <Card.SecondPart>
            <form action="">
              <div className="w-fit mb-3">
                <h1 className="font-extrabold text-3xl mb-2 text-gray-300">
                  Login
                </h1>
                <p className="text-gray-400">
                  Welcome back with you in Awaad Forms!
                </p>
                <p className="text-gray-300">
                  Continue creating and editing amazing forms with amazing
                  features!
                </p>
                {error.length > 0 && (
                  <div
                    className="flex items-center p-4 text-sm border rounded-lg bg-gray-800 text-red-400 border-red-800 mt-4 mb-4"
                    role="alert"
                  >
                    <svg
                      className="shrink-0 inline w-4 h-4 me-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>{error}</div>
                  </div>
                )}
              </div>
              <div className="mb-5">
                <Input
                  type="email"
                  label="Email"
                  id="emailInp"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Input
                  type="password"
                  label="Password"
                  id="passwordInp"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="mt-3">
                <p className="text-gray-400 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-300 hover:text-blue-500 transition-all duration-300"
                  >
                    Register
                  </Link>
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Forgot your password?{" "}
                  <Link
                    to="/reset-password"
                    className="text-blue-300 hover:text-blue-500 transition-all duration-300"
                  >
                    Reset Password
                  </Link>
                </p>
              </div>
            </form>
          </Card.SecondPart>
        </Card>
      </div>
    </>
  );
}

export default Login;
