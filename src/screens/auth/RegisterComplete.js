import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { MailOutlined } from "@ant-design/icons";
import { message, Button } from "antd";
import { useSelector } from "react-redux";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isAuth = useSelector(({ user }) => user);
  const { isAuthenticated, user } = isAuth;
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [user]);
  useEffect(() => {
    setEmail(window.localStorage.getItem("userEmail"));
  }, []);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // validation
    if (!email || !password) {
      message.error("Email and password is required");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      message.error("Password must be 6 charectors long");
      setLoading(false);

      return;
    }
    try {
      const res = await auth.signInWithEmailLink(email, window.location.href);
      if (res.user.emailVerified) {
        //   remove user email from local storage
        window.localStorage.removeItem("userEmail");
        // get user id token
        let user = auth.currentUser;
        // update user password
        await user.updatePassword(password);
        const idToken = await user.getIdTokenResult();
        // redux store
        setLoading(false);

        history.push("/");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Complete</h4>
          <p>Complete registeration</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              name={email}
              disabled
            />
            <br />
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoFocus
              placeholder="Password"
            />
            <Button
              onClick={handleSubmit}
              type="primary"
              className="mt-3"
              block
              shape="round"
              icon={<MailOutlined />}
              size="large"
              disabled={!email || password.length < 6}
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

export default RegisterComplete;
