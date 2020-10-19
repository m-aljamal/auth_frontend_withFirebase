import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase";
import { Button, message } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOGGED_IN_USER } from "../../redux/actions/types";
import axios from "axios";
const sendTokenToBackend = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_BACKEND_API}/users/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
const LoginUserScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const isAuth = useSelector(({ user }) => user);
  const { isAuthenticated, user } = isAuth;

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [user]);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idToken = await user.getIdTokenResult();
      sendTokenToBackend(idToken.token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      // dispatch({
      //   type: LOGGED_IN_USER,
      //   payload: {
      //     email: user.email,
      //     token: idToken.token,
      //   },
      // });
      setLoading(false);
      history.push("/");
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };
  const loginWithGoogle = async () => {
    setGoogleLoading(true);
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (res) => {
        const { user } = res;
        const idToken = await user.getIdTokenResult();
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            email: user.email,
            token: idToken.token,
          },
        });
        setGoogleLoading(false);
        history.push("/");
      })
      .catch((err) => message.error(err.message));
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <p>Login form</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              placeholder="Your email"
            />
            <br />
            <input
              type="password"
              className="form-control"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
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
              disabled={!email || password.length < 6}
              loading={loading}
            >
              Login with Email
            </Button>
            <br />
            <Button
              onClick={loginWithGoogle}
              type="danger"
              className="mt-3"
              block
              shape="round"
              icon={<GoogleOutlined />}
              size="large"
              loading={googleLoading}
            >
              Login with Google
            </Button>
            <Link to="/forgotPassword" className="float-right text-danger mt-2">
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUserScreen;
