import "./Aside.css"
import { auth } from "../firebase";
import ChatCard from './ChatCard'
import { ChooseRecipient } from "./ChooseRecipient";
import ProfileHeader from './ProfileHeader'
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";
import { query, serverTimestamp, collection, doc , onSnapshot, setDoc, getDoc, orderBy, updateDoc} from "firebase/firestore";
import { TestUserMessages } from "../utils/test-querys";
import ChatList from'./ChatList'



export default function Aside({ setChatId , users , updateConvoList , setUpdateConvoList}) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [conversationList, setConversationList] = useState([]) // list of user conversations id
    const [isNewChat, setIsNewChat] = useState(false) // for toggling the conditional rendering of the new chat ID input
    //const [updateConvoList , setUpdateConvoList] = useState(false)
    const [ newList , setNewList ] = useState()
       
    

    useEffect(() => {
        
    

        const docRef = doc(db, "users", uid );
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const conversationList = docSnap.get("conversations")
                    .map((convo, index) => {
                        let obj = {}
                        obj.id = convo
                        index === 0 ? obj.isActive = true : obj.isActive = false // setting first card in the array to be active by default
                        return obj
                    })
                    console.log(conversationList);
            setConversationList(conversationList)}
        })
        
        
    },[updateConvoList])



    // let convoList = []

    // if(conversationList){
    //         conversationList.map((convo) => {
    //         const docRef = doc(db, "messages", convo.id );
    //         getDoc(docRef).then(docSnap => {
                                 
    //                 // let date = docSnap.data().last_message_date.toDate().toDateString().split(' ').slice(1).join(' ') + ',' + docSnap.data().last_message_date.toDate().toLocaleTimeString();
    //                 let date = docSnap.data()

    //                 convoList.push(date);
                    
    //                 console.log(convoList.sort((a,b) => (a.last_message_date > b.last_message_date) ? 1 : ((b.last_message_date > a.last_message_date) ? -1 : 0)).reverse());

    //         })
    //     })
        
    
    // }

    
    

    
    return (
    <ChatList
        setIsNewChat={setIsNewChat}
        isNewChat={isNewChat}
        setChatId={setChatId} 
        setConversationList={setConversationList}
        uid={uid}
        conversationList={conversationList}
        setUpdateConvoList={setUpdateConvoList}
        users={users}/>
    )
}