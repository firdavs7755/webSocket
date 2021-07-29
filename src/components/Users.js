import React, {useState} from "react";
import {Table} from "react-bootstrap";
import './user.css'
function Users({list,socket}) {
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
        const handleRow=(id)=>{
            socket.on("connect", () => {
                console.log('connected:',socket.connected); // true
                console.log('cid:',socket.connected,id); // true
            });
        }
        return(
        <>
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
                            <tr key={item.id} id={'row'} className={'row'}>
                               <td onClick={()=>handleRow(item.id)}>
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
        </>
    )
}

export default Users;




