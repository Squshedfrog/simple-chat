import { useEffect, useState } from "react";
import "./Message.css"
import { auth, db } from "../firebase";
import { Timestamp, deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";

export default function Message({ message, chatId }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    
    
    //console.log(Date(message.createdAt.seconds*1000))
    let date

    //var timeStamp = new Timestamp()
    if( message.createdAt !== null){
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let timePast = (Timestamp.now()).toDate().getDay() - message.createdAt.toDate().getDay()
        if (timePast > 6 ){
            date = message.createdAt.toDate().toDateString()
        } else if (timePast > 0 ){
            let time = message.createdAt.toDate().toLocaleTimeString().split(':')
            time.pop()
            date = message.createdAt.toDate().toDateString().split(' ')[0]
            date = time .join(':') + " " + date
        } else {
            date = message.createdAt.toDate().toLocaleTimeString().split(':')
            date.pop()
            date = 'Today '+date.join(':')
        }
    }

    

    const deleteMessage = async (e) => {
        await deleteDoc(doc(db, `/messages/${chatId}/message_list`, message.id))
    }

    
    
    return (
        <div className={message.uid === uid ? "Message message-owner" : "Message"}>
            <section className="left">
                <span className="message-name">{message.name}</span>
                <span>{message.text}</span>
            </section>
            <section className="right">
               <time className="time-sent">{date}</time>
            </section>
            <section>
                <button onClick={deleteMessage} className="delete-btn" value={message.text}>Delete Message</button>
            </section>
        </div>
    )
}