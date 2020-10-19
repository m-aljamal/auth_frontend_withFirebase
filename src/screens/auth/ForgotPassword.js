import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {  Button, message } from "antd";
import { useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";

const ForgotPassword = ({ history }) => {
  const isAuth = useSelector(({ user }) => user);
  const { isAuthenticated, user } = isAuth;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        message.success("email has been sent to rset password");
        setEmail("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        message.error(err.message);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      <h4>Forgot Password</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mt-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          onFocus
        />
        <br />
        <Button
          onClick={handleSubmit}
          type="primary"
          className="mb-3"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email}
          loading={loading}
        >
          Send email
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
