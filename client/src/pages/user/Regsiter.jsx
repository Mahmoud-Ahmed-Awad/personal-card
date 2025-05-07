import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { registerUser } from "../../api/user";
import authImage from "../../assets/auth-image.avif";
import Card from "../../components/Card";
import { setUser } from "../../context/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
function Register() {
  const [user, setLocalUser] = useState(
    useSelector((state) => state.user).value
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      firstName.length == 0 ||
      lastName.length == 0 ||
      username.length == 0 ||
      birthDate.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      confirmPassword.length == 0
    ) {
      return setError("All fields are required");
    }
    const res = await registerUser(
      firstName,
      lastName,
      birthDate,
      username,
      email,
      password,
      confirmPassword
    );
    console.log(res);
    if (res.status != 201) {
      return setError(res.data.message);
    }
    dispatch(setUser(res.data.user));
    setLocalUser({
      isLoggedIn: true,
      user: res.data.user,
      isEmailVerified: false,
    });
    console.log(user);
    return (window.location.href = "/email-verification");
  };
  console.log(user);

  return (
    <>
      <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 absolute top-0 left-0 w-full">
        <Card>
          <Card.SecondPart>
            <form action="">
              <div className="w-fit mb-3">
                <h1 className="font-extrabold text-3xl mb-2 text-gray-300">
                  Register
                </h1>
                <p className="text-gray-400">
                  Welcome with you in Awaad Forms!
                </p>
                <p className="text-gray-300">
                  Start creating and editing amazing forms with amazing
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
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="First name"
                    id="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                  <Input
                    label="Last name"
                    id="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
                <Input
                  type="text"
                  label="Username"
                  id="usernameInp"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
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
                <Input
                  type="password"
                  label="Confirm Password"
                  id="confirmPasswordInp"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
                <Input
                  type="date"
                  label="Birth date"
                  id="birthDateInp"
                  onChange={(e) => setBirthDate(e.target.value)}
                  value={birthDate}
                />
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                  onClick={(e) => handleRegister(e)}
                >
                  Register
                </button>
              </div>
              <div className="mt-3">
                <p className="text-gray-400 text-sm">
                  Alrady have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-300 hover:text-blue-500 transition-all duration-300"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </Card.SecondPart>
          <Card.FirstPart>
            <img
              src={authImage}
              className="w-full rounded-b-lg object-cover md:rounded-bl-none md:rounded-r-lg md:h-[588px]"
              alt=""
            />
          </Card.FirstPart>
        </Card>
      </div>
    </>
  );
}

export default Register;
