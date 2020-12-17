import { Input } from 'antd';
import { Form , Button} from 'antd';
import React from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

function Login(props) {
    const required = [{
        required:true,
        message:"Enter this field"
    }]

    async function onFinishHandle(value){
        console.log(value);
        let a = await axios.post("http://localhost:8000/user/login",value);
        console.log(a);
        if(a.data.err === true){
            alert(a.data.message);
        }
        else{
            // console.log(1);
            props.setrole("user");
            localStorage.setItem('token',a.data.token);
            document.location = "/home";
        }
    }

    return (
        <div className = "App">
            <Navbar page = "login" role = {props.role} setrole = {props.setrole}/>
            <div className="container">
                    <div className = "register-container">
                        <h1>Login</h1>
                        <Form labelCol = {{span:6}} wrapperCol = {{span:12}} onFinish = {onFinishHandle}>
                            <Form.Item label = "Username" name = "user" rules = {required}>
                                <Input/>
                            </Form.Item>
                            <Form.Item label = "Password" name = "pass" rules = {required}>
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol = {{span:24}}>
                                <Button type = "primary" htmlType = "submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
            </div>
        </div>
    );
}

export default Login;