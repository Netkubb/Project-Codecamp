import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar"
import { Row, Col, Button } from 'antd';
import axios from 'axios';
let cnt = 0;

function User(props) {
    const [list, setlist] = useState([]);


    async function fetchdata() {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                document.location = '/login';
            }
            return error;
        });
        let x = await axios.get('http://localhost:8000/tournament/my', {
            headers: {
                authorization: "Bearer " + localStorage.getItem('token'),
            }
        });
        setlist(x.data);
    };

    async function removeHandle(id) {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                document.location = '/login';
            }
            return error;
        });
        axios.delete('http://localhost:8000/tournament/my?id=' + id, {
            headers: {
                authorization: "Bearer " + localStorage.getItem('token'),
            }
        })
        alert("Removed")
        document.location.reload();
    }

    useEffect(() => {
        fetchdata();
        cnt = 0;
    }, []);


    return (
        <div className="App">
            <Navbar page="User" role={props.role} setrole={props.setrole} />
            <div className="container">
                <Row gutter={[0, 16]} style={{ width: "100%" }}>
                    <Col style={{ textAlign: "center" }} span={24}>
                        <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/blog/play/dota_logo.png" alt="Dota 2 Logo" />
                        {/* <h1 style = {{fontSize:"72px"}}>Tournament</h1> */}
                    </Col>
                    {list.map(x => {
                        const c = (cnt % 2 === 0) ? "rgba(81, 81, 81, 0.5)" : "rgba(147, 152, 157, 0.5)";
                        const t = (cnt % 2 === 0) ? "#A3A8AD" : "#0A0A0A";
                        cnt += 1;
                        return (
                            <Col key={x.id} span={18} offset={3}>
                                <Row style={{ color: t, backgroundColor: c }} >
                                    <Col span={6}>
                                        <Row align="middle" style={{ height: "100%" }}>
                                            <img src={x.img} style={{ width: "100%", alignSelf: "center" }} alt={x.id} />
                                        </Row>
                                    </Col>
                                    <Col span={14}>
                                        <h1 style={{ color: t }}>{x.name}</h1>
                                        <p>{x.detail}</p>
                                        <footer>Sites : <a href={"https://" + x.sites} style={{ color: "rgb(192, 75, 46)" }}>{x.sites}</a></footer>
                                    </Col>
                                    <Col span={4} >
                                        <Row align="middle" style={{ height: "100%" }} justify="center">
                                            <Button type="primary" style={{ backgroundColor: "rgb(136, 130, 126)", color: "#0A0A0A" }} onClick={() => removeHandle(x.id)}>
                                                - Watch List
                                            </Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        )
                    }
                    )}
                </Row>
            </div>
        </div>
    );
}

export default User;