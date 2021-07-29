import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import './user.css'
const READY_STATE_OPEN = 1;

const chatStyle={
    position:'fixed',
    overflowY: 'scroll',
    top: '0',padding:'20px',
    width:'20%',
    bottom: '200px'
}
function Chat({msg,setMsg}){
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NywidXNlcm5hbWUiOiJtZXNzYWdlcyIsImV4cCI6MTY1OTE2MTU4OSwiZW1haWwiOiIifQ._1nOd-cHABes6yhvgkvrJijIpK51y5mmjMbxyU9MPjI';
    const fakeApi = `wss://echo.websocket.org`;
    const socketMsg = `wss://test.gopharm.uz/ws/messages?token=${token}`;
    const socketNotify = `wss://test.gopharm.uz/ws/notifications?token=${token}`;


    const [currentSocketUrl, setCurrentSocketUrl] = useState(socketMsg);
    const [messageHistory, setMessageHistory] = useState(['hi','bye']);
    const [inputtedMessage, setInputtedMessage] = useState('');
    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(currentSocketUrl, {
        share: true,
        shouldReconnect: () => false,
    });
    const handleClickSendMessage = useCallback(() =>
        sendMessage(`Hello`), []);//for testing
    useEffect(() => {
        if (readyState===READY_STATE_OPEN){
            console.log('ochiq')
        }
        lastMessage && setMessageHistory(prev => prev.concat(lastMessage.data));
    }, [lastMessage]);

    const readyStateString = {
        0: 'CONNECTING', 1: 'OPEN', 2: 'CLOSING', 3: 'CLOSED',
    }[readyState];

    return (
        <div>
            <button onClick={()=>handleClickSendMessage()} disabled={readyState !== ReadyState.OPEN}>
                send Hello
            </button>
                <input type={'text'} value={inputtedMessage} onChange={e => setInputtedMessage(e.target.value)}/>
                <button onClick={()=>sendMessage(inputtedMessage)} disabled={readyState !== READY_STATE_OPEN}>
                    Send
                </button>
            <br/>
            {console.log('msgHistory',messageHistory)}
            {console.log('lastmsg',lastMessage)}
            ReadyState: {readyStateString}
            <br/>
            {/*<div style={chatStyle}>*/}
            {/*    {*/}
            {/*        messageHistory.map(item=>(*/}
            {/*            <tr  className={'groove'}>*/}
            {/*                <td>{item}</td>*/}
            {/*            </tr>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}

export default Chat;