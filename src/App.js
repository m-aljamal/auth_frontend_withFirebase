import React, { useEffect } from "react";
import { LOGGED_IN_USER } from "./redux/actions/types";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/auth_actions";
import RegisterComplete from "./screens/auth/RegisterComplete";
import { auth } from "./firebase";
import ForgotPassword from "./screens/auth/ForgotPassword";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        dispatch({
          type: LOGGED_IN_USER,
          payload: {
            email: user.email,
            token: idToken.token,
          },
        });
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/forgotPassword" component={ForgotPassword} />
            <Route
              exact
              path="/register/complete"
              component={RegisterComplete}
            />
            <Route exact path="/" exact component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
