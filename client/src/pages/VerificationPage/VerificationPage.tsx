import { useState } from "react";
import InputField from "../../components/inputField/inputField.tsx";
import "./verification.css";

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("Segunfaozan112@gmail.com");
  return (
    <div className="verification-page-container">
      <div className="verificatoion-page">
        <span className="verification-page-text-header">
          Verify
        </span>
        <span className="verification-page-text">
          Please enter verification code sent to your email - {email}
        </span>
        <div className="verification-page-form">
          <InputField
            label="Verification code"
            placeholder="Verification code"
            type="text"
            value={verificationCode}
            onChange={(e: any) => setVerificationCode(e.target.value)}
          />

          <button>Verify</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
