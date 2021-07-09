import React, { useContext, useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

export const FirebaseAuthContext = React.createContext()

export function useAuth(){
    return useContext(FirebaseAuthContext)
}

export default function FirebaseAuthProvider({children}) {

  // -------------straight from docs---------------
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user2=>{
      setUser(user2)
      setInitializing(false)
    });
    return subscriber; // unsubscribe on unmount
  }, []); 

  // if (initializing) return null;
  // ----------------------------------------------------
    
    
  // -------------actions performed-------------------
    
  // 1. signup with email and password
  function signUpWithEmailPassword(email, password){
    const error = auth().createUserWithEmailAndPassword(email, password)
    .then(() => {console.log('created')} )
    .catch(error => {
      // if (error.code === 'auth/email-already-in-use') {
      //   console.log('That email address is already in use!');
      // }   
      return error
    })
    auth().onAuthStateChanged(user2=> setUser(user2))
    return error
  }
        
  // 2. sign in with email and password
  function signInWithEmailAndPassword(email, password){
    const error = auth()
    .signInWithEmailAndPassword(email, password)
    .then(()=>{console.log("Signed in")})
    .catch(err=>{
      console.log(`signin ep ${err}`)
      // err = err.toString().match(/\[.*\]/)
      return err
    }) 
    auth().onAuthStateChanged(user2=> setUser(user2))
    return error
  }
  
  // 3. sign out
  function signOutFunc(){
    auth().signOut().then(() => console.log('User signed out!')).catch(err=>{
      Snackbar.show({
        text: err.code,
        duration: Snackbar.LENGTH_LONG
      })
    })            
  }
  // -----------------------------------------------

  const submitFirebase= (name, comment)=>{
    firestore()
    .collection('users')
    .add({
      Name: name,
      Comment: comment
    }).then(()=>console.log("Done"))
    .catch(err=>{
      console.log(err)
      Snackbar.show({
        text: err.code,
        duration: Snackbar.LENGTH_LONG
      })
    })
    getDataFirebase(name)
  }

  const getDataFirebase = (name)=>{    
    firestore()
    .collection('users')
    // Filter results
    .where('Name', 'in', [{name}])
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot)
    }).catch(err=>{
      console.log(err)
      Snackbar.show({
        text: err.code,
        duration: Snackbar.LENGTH_LONG
      })
    })
  }

  
  // -----for provider--------  
  const value = {
    user, 
    signInWithEmailAndPassword,
    signUpWithEmailPassword,
    signOutFunc,
    submitFirebase,
    getDataFirebase
  }
  // ----------------------------------------------
  
    return(
      <FirebaseAuthContext.Provider value={value}>
        {!initializing && children}
     </FirebaseAuthContext.Provider>
    )        
  
}