import './HomePage.css'
import ChatBox from '../components/ChatBox'
import Aside from '../components/Aside'
import { useEffect, useState } from 'react'



export default function HomePage({ users }) {
    const [currentChatId, setCurrentChatId] = useState("theMegaChat")
    const [updateConvoList , setUpdateConvoList] = useState(false)


    return (
        <main className='Main'>
            <Aside 
                setChatId={ setCurrentChatId }  
                users={ users } 
                updateConvoList={updateConvoList}
                setUpdateConvoList={setUpdateConvoList}
                />
            <ChatBox 
            chatId={ currentChatId } 
            updateConvoList={updateConvoList}
            setUpdateConvoList={setUpdateConvoList}
            />
        </main>
    )
    
}