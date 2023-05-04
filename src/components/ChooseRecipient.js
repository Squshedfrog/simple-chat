import { useState } from "react";
import { auth } from "../firebase";
import { createNewChat } from "../utils/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'

export function ChooseRecipient({ setIsNewChat, setNewChatTrackker ,setUpdateConvoList }){
    const { uid  } = auth.currentUser;
    const [recipientId, setRecipientId] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        createNewChat(recipientId).then(res => setUpdateConvoList( prev => !prev))
           
        setRecipientId("")
        setIsNewChat(false)
        
    }

    return (
        <div className="ChooseRecipient">
            <form onSubmit={handleSubmit}>
                <input onChange={e => setRecipientId(e.target.value)} placeholder="Enter recipient's user ID" type="text" name="" id="enterRecipient" />
                <button id="newChatSubmitBtn"><FontAwesomeIcon icon={faSquarePlus} size="1x" /></button>
            </form>


            {/* <select name="" id="" onChange={handleChange} >
                <option value="">-- Choose Recipient</option>
                {users.users.filter(user => user.id !== uid ).map( user => <option key={user.id} value={user.id}>{user.userName}</option>)}        
            </select>     */}
        </div>
        )
}