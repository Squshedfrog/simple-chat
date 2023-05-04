import { useState } from 'react'
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore";
import './SendMessage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import useSound from 'use-sound';
import messageSfx from '../sounds/message.mp3'


// ----------- called in chatBox.js 46 -----------------
export default function SendMessage({ chatId , scollToRef , updateConvoList , setUpdateConvoList}) {
  const [message, setMessage] = useState("")


  
  const [play] = useSound(messageSfx)
  
  
  const sendMessage = async (e) => {
    e.preventDefault()
    play()
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, `/messages/${chatId}/message_list`), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      
    })
    
    // ------------------ test code - update users conversations timeStamp --------------
    
    const docRef = doc(db, "messages", chatId );
    getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
            const membersList = docSnap.get("membersId")
            membersList.map(async ( user )=>  await updateDoc(doc(db, `/users/${user}/conversationID/${chatId}`), {
              createdAt: serverTimestamp(),
          }))    
      
      }
    })


    

    // ------------------------------------------



    const messageRef = doc(db, "messages", chatId);
    await updateDoc(messageRef, {
      last_message: message.slice(0, 20) + "...",
      last_message_date: serverTimestamp()
    }).then(res => setUpdateConvoList( prev => !prev))
    setMessage("");
    scollToRef.current.scrollIntoView()
    
  }
  
  return (
      <form onSubmit={(e) => sendMessage(e)} className="SendMessage">
        <label htmlFor="messageInput" hidden>
        Enter Message
        </label>
        <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
        <button disabled={message ? false : true } type="submit" id='sendMessageBtn'>
        <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
  )
}