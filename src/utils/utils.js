import { collection, doc, addDoc, updateDoc, arrayUnion, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export async function createNewChat(recipientId) {
    const { uid, displayName } = auth.currentUser
    let recipientName, senderName;
    const recipientRef = doc(db, "users", recipientId);
    const senderRef = doc(db, "users", uid);

    await getDoc(recipientRef).then(docSnap => {
        if (docSnap.exists()) {
          recipientName = docSnap.data().userName
        }
    })

    
    

    await getDoc(senderRef).then(docSnap => {
      if (docSnap.exists()) {
        senderName = docSnap.data().userName
      }
  })
    let membersId =  [uid , recipientId] 
    const docRef = await addDoc(collection(db, "messages"), {
        chat_name: "",
        group_chat: false,
        last_message: "",
        last_message_date: serverTimestamp(),
        members: [senderName, recipientName],
        membersId: membersId
      });  
    
    // ------------- edited update users conversationId ---------------------
    membersId.map(async (userId )=> {
      const userConversations = await doc(db, `users`, userId)
      await updateDoc(userConversations, {
        conversations: arrayUnion(docRef.id)
      })
      await setDoc(doc(db, `/users/${userId}/conversationID/${docRef.id}`), {
        createdAt: serverTimestamp(),
      })
    })
    
    
  
  }
