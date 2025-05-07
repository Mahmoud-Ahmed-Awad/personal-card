import Card from "../../components/Card";
import { Input } from "../../components/Input";
import { useState } from "react";
import { resetPasswordEmailSender } from "../../api/user";
const ResetPasswordEmailSender = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await resetPasswordEmailSender(email);
    if (res.status === 200) {
      setSuccess(res.data.message);
    } else {
      setError(res.data.message);
    }
    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col absolute top-0 left-0 w-full">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-4 p-10 w-full">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-gray-400">
            Please enter your email to reset your password
          </p>
          <form className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
              onClick={handleSubmit}
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordEmailSender;
