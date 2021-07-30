import React, {useCallback, useEffect, useState} from "react";
import './user.css'
import {socketService} from "../services/socket";
import useWebSocket from "react-use-websocket";
const READY_STATE_OPEN = 1;

function Users({list,socket}) {
    const [chatList,setChatList] = useState([]);
    const [chatId,setChatId] = useState(128);
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJtZXNzYWdlcyIsImV4cCI6MTY1OTE2MTU4OSwiZW1haWwiOiIifQ._1nOd-cHABes6yhvgkvrJijIpK51y5mmjMbxyU9MPjI';
    const fakeApi = `wss://echo.websocket.org`;
    const fakeApi2 = `wss://javascript.info/article/websocket/demo/hello`;
    const socketMsg = `wss://test.gopharm.uz/ws/messages?token=${token}`;

    const [currentSocketUrl, setCurrentSocketUrl] = useState(socketMsg);
    const [inputtedMessage, setInputtedMessage] = useState('');
    // const ws = new WebSocket('wss://us-nyc-1.piesocket.com/v3/1?api_key=ULxjIy4aAahNnZPFhH8UJnik1DdxE91pGZid7Its&notify_self');
    const ws = new WebSocket(socketMsg);
    useEffect(()=>{

    },[ws]);
    // ws.onmessage=(e)=>{
    //     console.log('msg keldi......',e)
    // }
    ws.onopen=()=>{
        console.log('opened');
        ws.send('salom')
        console.log('url:',ws.url)
    }
    ws.onmessage=(e)=>{
        console.log('msg incoming......',e.data)
    }
    ws.onerror=(e) =>{
     debugger;
        console.log(e);
    }


    ws.onclose = (e) => {
        // debugger
        console.log(e);
    }
    function getNumber(text) {
        let br = '<br>';
        let brIndex = text.search(br);
        let phone = text.substring(0,brIndex)
        return phone;
    }
    function getName(text) {
        let br = '<br>';
        let brIndex = text.search(br);
        let name = text.substring(brIndex+4,text.length)
        return name;
    }

    function getChat(id) {
    setChatId(id);
    socketService.getChatList(id)
        .then(res=>{
            setChatList(res.data.results);
        })
    }

        const handleChat=(id)=>{
            console.log('chatId',id)
            getChat(id);
        }
        const sendHi = ()=>{
            ws.send("HI");
        }
        const sendHello = () =>{
        let obj = {message: 'HELLO', thread: 128};
        ws.send(obj);
            socketService.sendmsg(obj)
                .then(res=>{
                    console.log('res',res)

                })
        }
        return(
        <>
            {/*ReadyState: {readyStateString}*/}
            <div className={'d-flex justify-content-between'}>
                <table>
                    <thead>
                    <tr>
                        <th>Contacts</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        list?.map(item=>{
                            return(
                                <tr key={item.id} id={'row'} onClick={()=>handleChat(item.id)} className={'row'}>
                                    <td>
                                        <p style={{padding:'0'}}>
                                            <span style={{fontSize:'12px',fontWeight:'700'}}>+{getNumber(item.subject)}</span>
                                            <br/>
                                            <span style={{fontSize:'12px',fontWeight:'500'}}>{getName(item.subject)}</span></p>
                                    </td>
                                    <hr style={{height:'2px',color:'black'}}/>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div style={{position:'fixed',top:'30px',right:'60px',width:'500px'}}>
                {
                    chatList?.map(item=>(
                        <tr>
                            <td>{item.body}</td>
                        </tr>
                    ))
                }
            </div>
        </>
    )
}

export default Users;




