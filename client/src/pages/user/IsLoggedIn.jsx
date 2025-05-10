import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const IsLoggedIn = ({ mustBeLoggedIn = true, mustEmailVerified = true }) => {
  const user = useSelector((state) => state.user).value;
  if (mustBeLoggedIn) {
    if (mustEmailVerified) {
      return (
        <>
          {user.isLoggedIn && user.isEmailVerified ? (
            <Outlet />
          ) : (
            <Navigate to="/email-verification" />
          )}
        </>
      );
    } else {
      return <>{user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</>;
    }
  } else {
    return <>{user.isLoggedIn ? <Navigate to="/" /> : <Outlet />}</>;
  }
};

export default IsLoggedIn;
