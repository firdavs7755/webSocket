import logo from './logo.svg';
import './App.css';
import Users from "./components/Users";
import {socketService} from "./services/socket";
import Chat from "./components/chat";
import React, {useEffect, useState} from "react";
const userStyle={
    position:'fixed',
    overflowY: 'scroll',
    top: '0',padding:'20px',width:'20%',
    bottom: '0'
}
function App() {
    const [msg,setMsg] = useState({
        chatId:undefined,
        messages:['salom','hayr'],
        list:[]
    });
    useEffect(()=>{
        socketService.getUsers()
            .then(res=>{
                setMsg({...msg,list:res.data.results});
                console.log('users',res.data.results)
            })
    },[]);
  return (
      <div className={'d-flex justify-content-between'} style={{padding:'20px'}}>
        <div style={userStyle}>
          <Users list={msg.list}/>
        </div>

         {/*<div style={{position:'fixed',top:'30px',right:'60px',width:'500px'}}>*/}
         {/*      <ChatList chatId={128}/>*/}
         {/*</div>*/}
        {/*<div style={{position:'fixed',bottom:'30px',right:'60px'}}>*/}
        {/*  <Chat msg={msg} setMsg={setMsg} />*/}
        {/*</div>*/}
      </div>
  );
}

export default App;
