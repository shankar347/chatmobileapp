import { Image } from 'expo-image'
import { Stack, useRouter } from 'expo-router'
import React from 'react'
import { Text, Touchable, View } from 'react-native'
import { blurhash } from '../context/authcontext'
import { TouchableOpacity } from 'react-native'
import { Entypo,Ionicons } from '@expo/vector-icons'

const Chatroomheader = ({item}) => {
  // console.log(item)
  const router=useRouter() 
  return (
     <Stack.Screen 
      options={{
        headerShadowVisible:false,
        title:'',
        headerLeft:()=><View className='flex-row  items-center ' >
           <TouchableOpacity onPress={()=>router.back()} > 
            <Entypo name='chevron-left'  size={38}  color={'gray'} />
           </TouchableOpacity>
              <Image
                    placeholder={blurhash}
                    transition={500}
                    source={item?.profileUrl}  
                    className='w-10 h-10 rounded-full ml-2'
              />         
              <Text className='font-medium text-xl pl-3 text-neutral-700' >
                {item?.username}
              </Text>
            </View>,
        headerRight:()=><View className='flex-row items-center gap-x-6'>
           <Ionicons name='call' size={28} color={'gray'} />
           <Ionicons name='videocam' size={28} color={'gray'} />
        </View>
      }}
     />
  )
}

export default Chatroomheader