import { Input, Form, Button } from "antd";
import Axios from "axios";
import React from "react";
import Navbar from "../Navbar";
require("dotenv").config();

export default function Add(props) {
  const required = [
    {
      required: true,
      message: "Enter this field",
    },
  ];

  async function onFinishHandle(e) {
    const a = await Axios.post(process.env.REACT_APP_URL + "tournament", e);
    if (a.status === 201) {
      document.location = "/home";
    } else {
      alert("Failed to Add tournament");
    }
  }

  return (
    <div className="App">
      <Navbar page="Add" role={props.role} setrole={props.setrole} />
      <div className="container">
        <div style={{ width: "60%", backgroundColor: "white" }}>
          <h1>Add Tournament</h1>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
            onFinish={onFinishHandle}
          >
            <Form.Item label="name" name="name" rules={required}>
              <Input placeholder="Tournament's name" />
            </Form.Item>
            <Form.Item label="detail" name="detail" rules={required}>
              <Input.TextArea placeholder="Details" />
            </Form.Item>
            <Form.Item label="Image(link)" name="img" rules={required}>
              <Input placeholder="https://www.example.com/image.png" />
            </Form.Item>
            <Form.Item label="sites" name="sites" rules={required}>
              <Input placeholder="www.example.com" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
