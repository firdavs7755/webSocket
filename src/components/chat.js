import React, {Component} from 'react';

function Chat({msg,setMsg}){
    // let sendBtn = document.getElementById('sendBtn');
    // sendBtn.addEventListener('click',function () {
    //     msg.actions.send(sendBtn.value)
    // })
    // msg.actions.on('open',function (msg) {
    //     setMsg({...msg,messages:sendBtn.value})
    // })
    const handleSubmit=(e)=>{
        e.preventDefault();
        let text = document.getElementById('txt').value;
        console.log('txt',text);
        console.log('state',msg);
        msg.actions.onmessage=()=>{
            setMsg({...msg,messages:text})
            msg.actions.send(text);
            msg.actions.close();
        }
    }
        let i=0;
        let MESSAGES = msg?.messages?.map(message=>{
            return <li key={i++}>{message}</li>
        })
        return (
            <div>
                <form onSubmit={e=>handleSubmit(e)}>
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" id={'txt'} />
                            <span className={'input-group-btn'}>
                                <button id={'sendBtn'} type={'submit'}>send</button>
                            </span>
                        </div>
                    </div>
                </form>
                <ul className={'list-group'}>{MESSAGES}</ul>
            </div>
        );
}

// Chat.propTypes={
//     actions:PropTypes.object,
//     messages:PropTypes.array
// }

export default Chat;