import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebaseconfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export const authcontext=createContext()


export const blurhash ='|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';





const Authcontext = ({children}) => {
  
  const [user,setuser]=useState(null)
  const [isAuthenticated,setisAuthenticated]=useState(undefined)


  useEffect(()=>{
    
    const checkuser=onAuthStateChanged(auth,(user)=>{
      if(user){
         setisAuthenticated(true)
         setuser(user)
  
         updateuser(user.uid)
      
      }
      else{
        setisAuthenticated(false)
        setuser(null)
      }
    })
    
    return checkuser

  },[])


  const login=async(email,password)=>{
    try{
      const response=await signInWithEmailAndPassword(auth,email,password)
      return {success:true}
    }
    catch(e)
    {
      let msg= e.message
      if(msg.includes('(auth/invalid-email)') ) msg = 'Invalid email'
      if(msg.includes('(auth/invalid-credential)')) msg= 'Wrong Credentials'
      return {success:false,message:msg} 
    }
  }

  const logout=async()=>{
    try{
       await signOut(auth)
       return {success: true}
    }
    catch(err){
        console.log(err)
    }
  }

  const register=async(name,email,password,profileurl)=>{
    try{
      const response= await createUserWithEmailAndPassword(auth,email,password)
      // console.log('Reponse',response?.user)
      
      await setDoc(doc(db,'users',response?.user?.uid),{
        username:name,
        profileUrl:profileurl,
        userId:response?.user?.uid
      })

      return {success:true,data:response?.user}
    }
    catch(e){
       let msg= e.message
       if(msg.includes('(auth/invalid-email)') ) msg = 'Invalid email'
       if(msg.includes('(auth/email-already-in-use)')) msg= 'User alredy exists'
      return {success:false,message:msg}
    }
  }
  
  const updateuser=async(userid)=>{
    try{
      const docref=doc(db,'users',userid)
      const usercheck=await getDoc(docref)
    
      if(usercheck.exists()){
        let data=usercheck.data()
        setuser({...user,username:data.username,profileUrl:data?.profileUrl,
          userId:data?.userId})
      }
    }
    catch(err)
    {
         console.log(err)
    }
  }



  return (
    <authcontext.Provider value={{user,setuser,
        isAuthenticated,setisAuthenticated,
        login,logout,register
    }} >
        {children}
    </authcontext.Provider>
  )
}

export default Authcontext


export const useAuth=()=>{
    const user=useContext(authcontext)

    if(!user)
    {
        throw new Error('UseAuth must be wrapped inside the authcontext')

    }
   return user
}