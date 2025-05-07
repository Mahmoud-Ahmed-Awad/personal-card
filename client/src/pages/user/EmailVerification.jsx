import React from "react";
import { sendVerificationEmail } from "../../api/user";
import Card from "../../components/Card";

const EmailVerification = () => {
  return (
    <div className="flex justify-center items-center min-h-dvh h-full bg-gradient-to-tr from-slate-950 to-slate-700 text-white p-10 flex-col absolute top-0 left-0 w-full">
      <Card className="p-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <p className="text-gray-400">
            Please check your email for a verification link.
          </p>
          <button
            onClick={sendVerificationEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Resend Verification Email
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EmailVerification;
