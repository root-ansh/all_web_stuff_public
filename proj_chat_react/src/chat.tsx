import React, {ReactPropTypes, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Image, Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const avMaker = require('cartoon-avatar')


class User{
    name:string
    id:number
    msg:string
    av:string
    constructor(name:string, id:number, msg:string, av:string) {
        this.name = name
        this.id = id
        this.msg= msg
        this.av =av
    }
}

export function Chat(){
    let [messages,updateMessages]=useState<User[]>([])

    function getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }

    console.log(messages)
    function addUser(){
        console.log("add user clicked")
        let id = getRandomInt(1000)
        let name ="user"+id
        let message = "Hello world, what's up?"
        let avatar =avMaker.generate_avatar()
        let user = new User(name,id,message,avatar)
        let temp = JSON.stringify(messages)
        let msglist = JSON.parse(temp)
        msglist.push(user)
        updateMessages(msglist)
    }
    function MessageUI(user:User){
        //let user:User = props.user
        let date = new Date().toDateString()
        let userstr = JSON.stringify(user)

        return(
            <Card className="mb-4 shadow bg-light rounded p-0" key={user.id}>
                <Row xs="auto">
                    <Col xs="auto" className="p-0" >
                        <Card.Body className="pt-0 pb-0">
                            <Card.Text className="p-0 m-0">
                                <Image className="m-0 p-0" rounded={true} src={user.av} style={{width:"40px"}} />
                                <b className="h5" >{user.name+" | "}</b>
                                {date+" | "+user.msg}
                            </Card.Text>
                            <Card.Link className="p-0 m-0">reply</Card.Link>
                        </Card.Body>
                        <p className="data" style={{display: "none"}}>{userstr}</p>
                    </Col>
                </Row>


            </Card>
        )
    }


    return(
        <>
            <Container fluid={true} className="p-3" >
                <Button variant="light" onClick={(e)=>addUser()}>Add new Random user</Button>
                <span> | </span>
                <span>Your current user is </span>

                <Dropdown style={{display:"inline"}}>
                    <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">user list</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {messages.map((it: User) => (<Dropdown.Item href="#">{it.name}</Dropdown.Item>))}
                    </Dropdown.Menu>
                </Dropdown>
            </Container>

            <Container fluid={true} >
                {messages.map(it=>MessageUI(it))}
            </Container>

        </>

    )


}
