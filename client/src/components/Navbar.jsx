import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../api/user";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const user = useSelector((state) => state.user).value;
  const navigate = useNavigate();
  const logout = async () => {
    await logoutUser();
    window.location.href = "/user/login";
  };
  return (
    <nav className="bg-gray-900 sticky w-full z-20 top-0 start-0 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            AWAAD FORMS
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user.isLoggedIn ? (
            <>
              <button
                onClick={() => setUserMenuVisible(!userMenuVisible)}
                className="flex items-center cursor-pointer"
              >
                <img
                  src={user.user.avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </button>
              <div
                id="dropdown"
                className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute top-20 -translate-x-3/4 ${
                  userMenuVisible ? "block" : "hidden"
                }`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      to="/user/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setUserMenuVisible(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={async () => {
                        await logout();
                        setUserMenuVisible(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer text-red-500 w-full text-left"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Get started
            </button>
          )}
          <button
            // data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            // aria-controls="navbar-sticky"
            // aria-expanded="false"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              // aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            expanded ? "block" : "hidden"
          }  w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:p-0 md:text-blue-500"
                // aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 px-3 rounded-sm md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded-sm md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded-sm md:p-0 md:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
