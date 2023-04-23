import { useState } from "react";
import { auth } from "../firebase";
import { creatNewChat } from '../utils/utils'
import { ChooseRecipient } from "./ChooseRecipient";
import { TestDelete } from "../TestDbCalls";

export default function ProfileHeader({ setChatId , users, setIsNewChat }) {
    const { uid, displayName, photoURL } = auth.currentUser;
    const [chooseRecipient , setChooseRecipient ] = useState(false)
    
     
    const handleNewChat = (e) => {
        setIsNewChat(true)
        // const simonUserId = "XHukCG7e6XPSVmmhvq2T4h47giy1"
        // setChooseRecipient(true)
        //creatNewChat(simonUserId)
    }

    return (
        <header>
                <section className="currentUser">
                    <img className="display-img" src={photoURL} alt="" />
                    <h4 className="display-name">{displayName}</h4>
                </section>
                <button onClick={handleNewChat}>new chat</button>
                
                {/* {chooseRecipient?<ChooseRecipient users={users}/>:<button onClick={handleNewChat}>new chat</button>} */}
        </header>
    )
}