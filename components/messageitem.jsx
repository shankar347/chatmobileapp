import React from 'react'
import { blurhash, useAuth } from '../context/authcontext'
import { Text, View } from 'react-native'
import { Image } from 'expo-image'

const Messageitem = ({message,prevIndex ,index}) => {
   
    const {user}=useAuth()
    // console.log(message)
    console.log(prevIndex,index)
    const checkimage= prevIndex !== index
    if(message.senderId === user.userId.toString())
    return (
      <View className={`flex-row justify-end  ${checkimage ? 'w-[70%]' : 'w-[80%]' } self-end
        gap-x-2 my-2 mx-2`} >
        <Text className='text-lg font-medium bg-neutral-300 py-2 
        rounded-md px-2 flex self-end ' >{message?.text} </Text>
       {
        checkimage && <Image 
        placeholder={blurhash}
        transition={500}
        source={user?.profileUrl}  
        className='w-[10%] h-[32px] rounded-full '
      /> 
       }
      </View>
      
  )
  else{
    return(
        <View className={`flex-row gap-x-2 w-[80%]  my-2 mx-2
       ${checkimage ? 'w-[70%]' : 'w-[80%]' } 
        `} >
      {
        checkimage &&
        <Image 
        placeholder={blurhash}
        transition={500}
        source={message?.profileUrl}  
        className='w-[10%] h-[32px] rounded-full '
      />
      }
        <Text className='text-lg flex self-start font-medium bg-gray-200 py-2 
        rounded-md px-2 ' >{message?.text} </Text>
      </View>
    )
  }
}

export default Messageitem