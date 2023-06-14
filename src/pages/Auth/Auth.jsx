import React from "react";
import "./Auth.css";
import { auth } from '../../config/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
function Auth() {
    
    //activate navigate
    const navigate = useNavigate()

    //create state to determine which form
  const [existingUser, setExistingUser] = React.useState(false)

  // create state for user input
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")

  //create function for signup
  const handleSignup = (e) =>{
        e.preventDefault()
        console.log("SignUp")
        //create user with firebase
        createUserWithEmailAndPassword(auth,email,password)
        .then(res => {console.log (res.user)
            //add name as displayName
            updateProfile(auth.currentUser, {displayName: name})
            //redirect to homepage
            navigate('/')
        })
        .catch(err => {
            alert(err)
        })
  }

  const handleLogin = (e) =>{
        e.preventDefault()
        //call function to login
        signInWithEmailAndPassword(auth, email, password)
        .then(res =>{
            //naviate to home page
            navigate('/')
        })
        .catch(err => {
            alert(err)
        })
  }

  return (
    <div className="auth-container">
      {existingUser ? (
        <form className="auth-form" onSubmit={handleLogin}>
          <h1>Login with your email</h1>
          <div className="form-group">
            <input 
            type="email"
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder="Enter your email" required />
            <input type="password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter password" required />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account? <span className="form-link" onClick={()=>setExistingUser(false)}>Signup</span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleSignup}>
          <h1>Signup with your email</h1>
          <div className="form-group">
            <input type="text" 
                   onChange={(e)=>setName(e.target.value)}
                   placeholder="Enter your name" required />
            <input type="email" 
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder="Enter your email" required />
            <input type="password" 
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="Enter password" required />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account? <span className="form-link" onClick={()=>setExistingUser(true)}>Login</span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
