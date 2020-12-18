import { Col, Row, Button } from "antd";
import axios from "axios"
import React, { useEffect, useState } from "react"
import Navbar from "../Navbar"
let cnt = 0;

export default function Home(props) {
    const [list, setlist] = useState([]);
    const { role } = props;

    async function addHandle(id) {
        // const a = await axios.post
        if (role === "guest") {
            alert("Please login first!");
            document.location = '/login';
        }
        else {
            axios.interceptors.response.use(response => {
                // console.log(response)
                return response;
            }, error => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    document.location = '/login';
                }
                if (error.response?.status === 400) {
                    alert("Already in your watch list");
                }
                // console.log(error);
                return error;
            });
            const a = await axios.post('http://localhost:8000/tournament/my', { id: id }, { headers: { authorization: "Bearer " + localStorage.getItem('token') } });
            // console.log(a);
            if (a.status && a.status !== 400) alert("Added");
        }
        // console.log(id);
    }

    useEffect(() => {
        async function tournament() {
            const a = await axios.get("http://localhost:8000/tournament");
            setlist(a.data);
        }
        tournament();
        cnt = 0;
    }, []);

    return (
        <div className="App">
            <Navbar page="Home" role={props.role} setrole={props.setrole} />
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
                                            <img src={x.image} style={{ width: "100%", alignSelf: "center" }} alt={x.name} />
                                        </Row>
                                    </Col>
                                    <Col span={14}>
                                        <h1 style={{ color: t }}>{x.name}</h1>
                                        <p>{x.content}</p>
                                        <footer>Sites : <a href={x.contact} style={{ color: "rgb(192, 75, 46)" }}>{x.contact}</a></footer>
                                    </Col>
                                    <Col span={4} >
                                        <Row align="middle" style={{ height: "100%" }} justify="center">
                                            <Button type="primary" style={{ backgroundColor: "rgb(136, 130, 126)", color: "#0A0A0A" }} onClick={() => addHandle(x.id)}>
                                                + Watch List
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
    )
}