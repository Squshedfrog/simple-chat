import { auth, db } from "./firebase"
import { Timestamp, deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";

// tested in profileHeader.js
export async function TestDelete(){
    
    let messageId = 'QPeDfuYD0geLv8X6xaHP'
    let chatId = 'QDdEt8VJ1DXNK3flRHQB'
    console.log(`delete-Message ${messageId}`)
    await deleteDoc(doc(db, `/messages/${chatId}/message_list`, messageId))
}




// tried -------

//await deleteDoc(doc(db, `/messages/${chatId}/message_list``, messageId));
