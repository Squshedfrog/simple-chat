import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { ChooseRecipient } from "./ChooseRecipient";
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { query, serverTimestamp, collection, doc , onSnapshot, setDoc, getDoc, orderBy, updateDoc} from "firebase/firestore";





export default function ChatList({ isNewChat, setIsNewChat, setChatId, setConversationList, users , uid ,conversationList , setUpdateConvoList}) {



    return(
         <aside className="Aside">
    <ProfileHeader setChatId={setChatId}  users={users} setIsNewChat={setIsNewChat}/>
    
   {isNewChat && <ChooseRecipient setIsNewChat={setIsNewChat} setUpdateConvoList={setUpdateConvoList}/>}

    <section className="chat-list">
        
        {conversationList?.map((conversation) => (
           
           <ChatCard 
           key={conversation.id} 
           conversation={conversation} 
           setChatId={setChatId} 
           setConversationList={setConversationList}
           conversationId={conversation.id}
           uid={uid}
           conversationList={conversationList}
           setUpdateConvoList={setUpdateConvoList}
           users={users}
           />
        ))}

    </section>
</aside>
    )
}