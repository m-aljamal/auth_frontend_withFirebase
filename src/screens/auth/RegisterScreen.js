import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { MailOutlined } from "@ant-design/icons";

const RegisterUserScreen = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const isAuth = useSelector(({ user }) => user);
  const { isAuthenticated, user } = isAuth;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    try {
      await auth.sendSignInLinkToEmail(email, config);

      // save user email in local storage
      window.localStorage.setItem("userEmail", email);
      message.success("email is sent");

      setEmail("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <p>register form</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              name={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              placeholder="Your email"
            />
            <Button
              onClick={handleSubmit}
              type="primary"
              className="mt-3"
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={!email}
              loading={loading}
            >
              Login with Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserScreen;
