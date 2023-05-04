
import { query, serverTimestamp, collection, doc , onSnapshot, setDoc, getDoc, orderBy, updateDoc} from "firebase/firestore";
import {  db } from '../firebase'


export async function TestUserMessages(){

 
  let userID = 'Pazs7qLhqUOh5WaE0oIoHc6yZhG3'

  // ----------------------------usable code  read conversationID ----------------------
  const q = query(
    collection(db, `/users/${userID}/conversationID`),
    orderBy("createdAt", "desc"),
  );
  
  
  const unsubscribe = onSnapshot(q,(QuerySnapshot) => {
    
      let messages = []
      QuerySnapshot.forEach((doc) => {
        messages.push( doc.id );
      });
    console.log(messages);
    

  });
  
  
  return () =>  unsubscribe;


// const Ref = doc(db, "users", userID);

/*

// updates last message date on users 
await updateDoc(doc(db, `/users/${userID}/conversationID/theMegaChat`), {
  
  createdAt: serverTimestamp(),
  
  
})
*/



/* ----------- update time stamp -----------
let test = 'testNewId'
await setDoc(doc(db, `/users/${userID}/conversationID/${test}`), {
  
  createdAt: serverTimestamp(),
 
})

*/

}



/*
export async function TestQuery(){
    let messageId = 'cgCqNRliXIm500NbswZT'
    

    const docRef = doc(db, "messages", messageId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    
    
    
}
*/

/* ----------------------------------------- messages query
const q = query(
    collection(db, `/messages`),
  );
  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let users = [];
  QuerySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  })
  console.log(users);
  });
  return () => unsubscribe;
*/

/* -------------------------------------- users q

  const q = query(
        collection(db, `/users2/${userID}`),
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let users = [];
      QuerySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      })
      console.log(users)
      });
      return () => unsubscribe;
    
*/

/* -------------------------------------- write conversation to db

    const { uid } = auth.currentUser
    const docRef = await addDoc(collection(db, "messages"), {
        chat_name: "",
        group_chat: false,
        last_message: "this is a fake value created in utils.js",
        last_message_date: "serverTimestamp()",
        members: [uid, recipientId]
      });  

    const userConversations = await doc(db, `users2`, uid)
    const recipientConversations = await doc(db, `users2`, recipientId)
    await updateDoc(userConversations, {
        conversations: arrayUnion(docRef.id)
    })
    await updateDoc(recipientConversations, {
        conversations: arrayUnion(docRef.id)
    })

    */