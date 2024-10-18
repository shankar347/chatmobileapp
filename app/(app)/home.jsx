import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import Chatlist from '../../components/chatlist'
import Loading from '../../components/loading'
import { useAuth } from '../../context/authcontext'
import { getDoc, getDocs, query, where } from 'firebase/firestore'
import { roomRef, usersRef } from '../../firebaseconfig'

const Home = () => {
   
    const {user:user1,logout}=useAuth()
   const [user,setusers]=useState([])  
   console.log( 'homeuserid', user1?.uid)   
   console.log( 'email', user1?.email)
   console.log('name',user1?.username)

   useEffect(()=>{
 
    if(user1?.uid)
    {
     getusers()      
    }

   },[])

   const getusers=async()=>{
     const q=query(usersRef,where('userId', '!=',user1?.uid))
     const userlist=await getDocs(q)
     let data=[]
     userlist.forEach((doc)=>(
      data.push({...doc.data()})
     ))
    //  console.log('data', data)
    setusers(data)
   }

   const handlelogut=async()=>{
     await logout()
   }

  return (
    <View className='flex-1 ' >
      <StatusBar style='light' />
      {
        user?.length > 0 ? <Chatlist currentuser={user1}  user={user} /> :
       <Loading color={'gray'} />
      }
    </View>
  )
}

export default Home