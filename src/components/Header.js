import React, { useState } from "react";
import { LOGOUT } from "../redux/actions/types";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;
const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [current, setCurrent] = useState("home");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const isAuth = useSelector(({ user }) => user);
  const { isAuthenticated, user, loading } = isAuth;
  console.log(isAuthenticated);
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: LOGOUT,
      payload: {},
    });
    history.push("/login");
  };
   return (
    <header>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="home">Home</Link>
        </Menu.Item>
        {!isAuthenticated && (
          <>
            <Menu.Item
              key="register"
              icon={<UserAddOutlined />}
              className="float-right"
            >
              <Link to="register">Register</Link>
            </Menu.Item>

            <Menu.Item
              key="login"
              icon={<UserOutlined />}
              className="float-right"
            >
              <Link to="login">Login</Link>
            </Menu.Item>
          </>
        )}
        {isAuthenticated && (
          <SubMenu
            key="SubMenu"
            icon={<SettingOutlined />}
            title={user.email && user.email.split("@")[0]}
            className="float-right"
          >
            <Menu.Item key="dashpord">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>

            <Menu.Item icon={<UserOutlined />} onClick={logout}>
              Logout
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </header>
  );
};

export default Header;
