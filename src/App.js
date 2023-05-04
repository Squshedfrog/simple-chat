import './App.css';
import { auth } from "./firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Banner from './components/Banner'
import { useEffect, useState } from 'react';
import { GetUsers ,RegisterUser } from './user';



function App() {
  
  const [ users , setUsers ] = useState()
  const [user] = useAuthState(auth);
  

  
  useEffect(()=> {
    GetUsers(setUsers)
    },[user])
    
  if(user && users){
    if(!users.map(user => (user.id)).includes(user.uid)){
      RegisterUser()
      }
    }

  
    // console.log(users);
  
  return (
    <div className="App">
      <Banner user={user}/>
      {!user ? <LoginPage /> : <HomePage users={users} />}
    </div>
  );
}

export default App;
