import { useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TextInput, Touchable, View } from 'react-native'
import Chatroomheader from '../../components/chatroomheader'
import Messagelist from '../../components/messagelist'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import Chatkeyboard from '../../components/chatkeyboard'
import { useAuth } from '../../context/authcontext'
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import Loading from '../../components/loading'
import { Keyboard } from 'react-native'

const Chatroom = () => {
  
    const item=useLocalSearchParams()
    const {user} =useAuth()
    const [message, setMessage] = useState([])
    const [input,setinput]=useState('')
    const scrollViewRef=useRef(null)


    const getId=(userId1,userId2)=>{
      let combinedId=[userId1,userId2]
      let roomId=combinedId.sort().join('-')
      return roomId
    }

  
     

    useEffect(()=>{
      const getuserMessage=async()=>{
          try{
            const roomId=getId(user?.userId,item?.userId)
            let docref=doc(db,'rooms',roomId)
            let messageRef=collection(docref,'messages')
            let q=query(messageRef,orderBy('createdAt','asc'))

            let setmessInfo=onSnapshot(q,(docs)=>{
              let messInfo=docs.docs.map((doc)=>
               doc.data()
              )
              setMessage([...messInfo])
            })

            const keyboardevent=Keyboard.addListener(
              'keyboardDidShow',updatescrollview()
            )

            return () =>{ 
              setmessInfo(),
              keyboardevent.remove()
            }
            }
          catch(err)
          {
            console.log(err)
          }
      }
      getuserMessage()
    },[])


    useEffect(()=>{
      updatescrollview()
    },[message])


    const updatescrollview=()=>{
       
      setTimeout(()=>{
        scrollViewRef?.current?.scrollToEnd({animated:true})
      },500)

    }

    useEffect(()=>{

      const createUserchat=async()=>{
          
         const roomId=getId(user?.userId,item?.userId)

           await setDoc(doc(db,'rooms',roomId),{
            roomId,
            createdAt: Timestamp.fromDate(new Date())
           })
      }

      createUserchat()

    },[])

  
   
    const handlesendmessage=async()=>{
      if (!input) return
      try{
      const roomId=getId(user?.userId,item?.userId)
      const docref=doc(db,'rooms',roomId)

      const messageRef=collection(docref,'messages')
      const newDoc=await addDoc(messageRef,{
        text:input,
        senderId:user?.userId,
        createdAt: Timestamp.fromDate(new Date()),
        sendername:user?.username,
        profileUrl:user?.profileUrl
      })
      setinput('')
      // console.log(newDoc)
      }
      catch(err)
      {
        console.log(err)
      }
    }

    return (
    <Chatkeyboard inchat={true} >
       <View className='flex-1 bg-white' >
      <StatusBar style='dark'  />
      <Chatroomheader item={item} />
      <View className='w-full h-[2px] mx-1 bg-neutral-200' /> 
      <View className='bg-neutral-100 flex-1 overflow-visible
       h-full justify-between' >
       <View className='flex-1' >
       {message  ? <Messagelist scrollViewRef={scrollViewRef}  messages={message}  /> : <Loading/>}
       </View> 
      <View className='w-[96%] rounded-full h-14 bg-white 
      border flex-row items-center border-neutral-400 mb-2 mx-auto'>
       <TextInput placeholder='Type message...' 
       value={input}
       onChangeText={(value)=>setinput(value)}
       className='pl-4 font-medium w-[87%] text-lg text-black '  />
       <TouchableOpacity onPress={handlesendmessage}>
       <View className='bg-neutral-300 p-2 rounded-full ' > 
          <Feather name='send' size={32} color={'black'} />
        </View> 
       </TouchableOpacity>
      </View>
      </View>
     </View>
    </Chatkeyboard>
  )
}

export default Chatroom