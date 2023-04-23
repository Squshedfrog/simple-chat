import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { ChooseRecipient } from "./ChooseRecipient";
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";



export default function Aside({ setChatId , users }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState() // list of user conversations id
    const [isNewChat, setIsNewChat] = useState(false)

    
    useEffect(() => {
        const docRef = doc(db, "users", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                setConversationList(docSnap.data().conversations)
            } 
           // console.log(docSnap.data().conversations);
    })
    },[])


    
    return (
        <aside className="Aside">
            <ProfileHeader setChatId={setChatId}  users={users} setIsNewChat={setIsNewChat}/>

           {isNewChat && <ChooseRecipient setIsNewChat={setIsNewChat} setConversationList={setConversationList} />}

            <section className="chat-list">
                
                {conversationList?.map((conversationId) => (
                   
                   <ChatCard key={conversationId} conversationId={conversationId} setChatId={ setChatId } />
                ))}

            </section>
        </aside>
    )
}