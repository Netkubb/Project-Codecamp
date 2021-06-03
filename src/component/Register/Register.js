import { Input } from "antd";
import { Form, Button } from "antd";
import React from "react";
import Navbar from "../Navbar";
import axios from "axios";
require("dotenv").config();

function Register(props) {
  const required = [
    {
      required: true,
      message: "Enter this field",
    },
  ];

  async function onFinishHandle(value) {
    console.log(value);
    let a = await axios.post(
      process.env.REACT_APP_URL + "user/register",
      value
    );
    console.log(a);
    if (a.data.err === true) {
      alert(a.data.message);
    } else {
      // console.log(1);
      document.location = "/login";
    }
  }

  return (
    <div className="App">
      <Navbar page="Register" role={props.role} setrole={props.setrole} />
      <div className="container">
        <div className="register-container">
          <h1>Register</h1>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinishHandle}
          >
            <Form.Item label="Name" name="name" rules={required}>
              <Input />
            </Form.Item>
            <Form.Item label="Username" name="user" rules={required}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="pass" rules={required}>
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
