import { Image } from 'expo-image'
import React, { useEffect, useState } from 'react'
import {  TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { blurhash } from '../context/authcontext'
import { useRouter } from 'expo-router'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseconfig'
import Loading from './loading'
import timecomponent from './timecomponent'

const Chatitem = ({item,index ,currentuser,islast}) => {
    // console.log( 'item', item)
   
  //  console.log(islast)
     const [lastmessage,setlastmessage]=useState(null)
     const [loading,setloading]=useState()

     const getId=(userId1,userId2)=>{
      let combinedId=[userId1,userId2]
      let roomId=combinedId.sort().join('-')
      return roomId
    }

    useEffect(()=>{
      const getuserMessage=()=>{
          try{
            setloading(true)
            const roomId=getId(currentuser?.userId,item?.userId)
            let docref=doc(db,'rooms',roomId)
            let messageRef=collection(docref,'messages')
            let q=query(messageRef,orderBy('createdAt','desc'))

            let setmessInfo=onSnapshot(q,(docs)=>{
              let messInfo=docs.docs.map((doc)=>
               doc.data()
              )
              // console.log(messInfo)
              setlastmessage(messInfo[0] ? messInfo[0] : null)
            })
            return setmessInfo
          }
          catch(err)
          {
            console.log(err)
          }
          finally{
            setloading(false)
          }
      }
      getuserMessage()
    },[])
    console.log(lastmessage)
    const router=useRouter()

    const returnlastmessage=()=>{
      
      if(loading) return <Loading/>

      if(lastmessage?.text?.length > 30) 
      {
        
        if(lastmessage?.senderId === currentuser?.userId?.toString())
          {
          return 'You: ' + lastmessage?.text.slice(0,30)  + '...'
          }   
          return lastmessage?.text  + '...'
      }

      if (lastmessage)
      {
      if(lastmessage?.senderId === currentuser?.userId?.toString())
       {
       return 'You: ' + lastmessage?.text 
       }   
       return lastmessage?.text 
      }
      else
      {
        return 'Say Hi !'
      }
    }

    const settimehandle=()=>{
      if(lastmessage)
      { 
     const data=lastmessage?.createdAt
     return  timecomponent(new Date(data?.seconds * 1000))
      }
    }
    
    return (
    <TouchableOpacity className={`flex   flex-row justify-between 
    items-center gap-3  pb-2 mb-4 ${islast ? '' :  'border-b border-b-neutral-300'} mx-4`} 
    onPress={()=>router.push({pathname:'chatroom',params:item})}
    >
      <Image
      placeholder={blurhash}
      transition={500}
      source={item?.profileUrl}  
      className='w-14 h-14 rounded-full '
      />
       <View className='flex-1  gap-1 '  >
        <View className='flex-row items-center   justify-between' >
          <Text className='text-lg font-medium' >{item?.username}</Text> 
          <Text className='text-neutral-500'  >{settimehandle()}</Text>
        </View>
        <Text className='text-md text-neutral-600' >
          {returnlastmessage()}
        </Text>
       </View>
    </TouchableOpacity>
  )
}

export default Chatitem