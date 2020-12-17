import React, { useEffect, useState } from 'react';
import { Menu, Affix } from 'antd';
import jwtDecode from 'jwt-decode';
const { SubMenu } = Menu;

function Navbar(props) {
    const [Current, setCurrent] = useState(props.page);
    const [user, setuser] = useState();
    const role = props.role;
    const setrole = props.setrole;

    function menuclickhandle(e) {
        // console.log(e);
        setCurrent(e.key);
    }

    function logoutHandle() {
        setrole("guest");
        localStorage.removeItem('token')
        // console.log("logout");
        document.location = "/home";
    }

    useEffect(() => {
        const a = localStorage.getItem('token');
        if (a) {
            const x = jwtDecode(a);
            // console.log(x);
            setuser(x.name)
        }
        else setuser("Guest")
    }, [])

    return (
        <div>
            <Affix offsetTop={0}>
                <Menu mode="horizontal" selectedKeys={Current} onClick={menuclickhandle} id="navbar" >
                    <Menu.Item key="Home" style={{ color: "white" }} onClick={() => document.location = "/home"}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="Add" style={{ color: "white" }} onClick={() => document.location = "/add"}>
                        Add More Tournament
                    </Menu.Item>
                    <SubMenu
                        key="SubMenu"
                        title={user}
                        style={{ float: "right", color: "white" }}
                    >
                        {role === "guest" && <Menu.Item key="Login" onClick={() => document.location = "/login"}>
                            Login
                        </Menu.Item>}
                        {role === "guest" && <Menu.Item key="Register" onClick={() => document.location = "/register"}>
                            Register
                        </Menu.Item>}
                        {role !== "guest" && <Menu.Item key="User" onClick={() => document.location = "/user"}>
                            Profile
                        </Menu.Item>}
                        {role !== "guest" && <Menu.Item key="Logout" onClick={logoutHandle} >
                            Logout
                        </Menu.Item>}
                    </SubMenu>
                </Menu>
            </Affix>
        </div>
    );
}

export default Navbar;