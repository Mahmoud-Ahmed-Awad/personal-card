import Card from "../../components/Card";

const ResetPasswordEmailSent = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col absolute top-0 left-0 w-full">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-4 p-10 w-full">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-sm text-gray-400">
            Please check your email for the reset password link
          </p>
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            Go to Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordEmailSent;
