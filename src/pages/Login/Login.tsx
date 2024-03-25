import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";

interface form {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<form>({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const setForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="login-container">
      <div className="login-page">
        {/* <span className="login-title">FileShield</span> */}
        <span className="login-subtitle">Log in to your account</span>

        <form className="login-form" onSubmit={onSubmit}>
          <div className="login-label-and-input">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" onChange={setForm} />
          </div>

          <div className="login-label-and-input">
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              onChange={setForm}
            />

            <img
              src="/assets/view.png"
              alt="view passowrd"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          </div>

          <span className="login-forgot-password">Forgot password?</span>

          <button className="login-button">Login</button>
        </form>

        <span className="terms-and-conditions-text">
          By logging in, you are agreeing to our{" "}
          <span className="link-text">Terms of Service</span> and{" "}
          <span className="link-text">Privacy</span> Policy.
        </span>
      </div>
    </div>
  );
};

export default Login;
