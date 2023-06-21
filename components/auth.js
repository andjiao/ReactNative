import auth from "../config/firebase.js";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from 'react';
export const Auth =()=>{

    const [email, setEmail] =useState("");
    const [password, setPassword] =useState("");

    const signin = async  ()=>{
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            
        } catch (error) {
            console.error(error.message)
            
        }   
    }

    const logout = async () => {
        try {
          await signOut(auth);
        } catch (err) {
          console.error(err);
        }
      };

    return(
        <div>
            <input 
            type="email"
            placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
            <input 
            type="password"
            placeholder="password" onChange={(e)=> setPassword(e.target.value)}/>
            <button onClick={signin}>Signin</button>

            <button onClick={logout}> Logout </button>
            
        </div>

    )
}