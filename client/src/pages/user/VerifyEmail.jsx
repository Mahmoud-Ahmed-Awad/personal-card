import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../api/user";
import Card from "../../components/Card";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const user = useSelector((state) => state.user).value;
  const { token } = useParams();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  if (!token) {
    navigate("/login");
  }
  if (user.isEmailVerified) {
    navigate("/profile");
  }
  useEffect(() => {
    (async () => {
      await verifyEmail(token);
      setVerified(true);
      navigate("/profile");
      window.location.reload();
    })();
  }, [token]);
  return (
    <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col absolute top-0 left-0 w-full">
      <Card className="p-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-gray-400">
            Verification {verified ? "Success" : "Failed"}
          </h1>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmail;
