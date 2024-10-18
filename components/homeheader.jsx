import React from 'react'
import {  Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { blurhash, useAuth } from '../context/authcontext'
import { Image } from 'expo-image'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Custommenuitem from './custommenuitem'
import { AntDesign, Feather } from '@expo/vector-icons'



const Homeheader = () => {
  
  const ios=Platform.OS === 'ios' 
  const {top} =useSafeAreaInsets()   
  const {user,logout} =useAuth()
  // console.log(user?.profileUrl)
  // console.log('siva')
  const handlelogout=async()=>{
    await logout()
  }

  return (
    <View className={'bg-indigo-400  px-4 pb-6 rounded-b-3xl shadow flex-row justify-between items-center' } 
    style={{paddingTop: ios ? top : top+10}}  >
    <Text className='font-bold text-3xl  text-white' >
     Chats   
    </Text>
    <Menu>
      <MenuTrigger>
      <Image
    className='w-10 h-10 rounded-full'
    source={user?.profileUrl}
    placeholder={blurhash} 
    transition={500}
    />
      </MenuTrigger>
      <MenuOptions customStyles={{
        optionsContainer:{
          borderRadius:10,
          borderCurve:'continuous',
          marginTop:40,
          marginLeft:-30,
          backgroundColor:'white',
          shadowOpacity:0.2,
          shadowOffset:{width:0,height:0},
          width:160
        }
      }} >
        <Custommenuitem text={'Profile'} icon={<Feather name='user' color={'gray'}
        size={22}  />} color={'text-black'} 
        onclick={handlelogout} value={''} />
        <Divider/>
       <Custommenuitem text={'Logout'}  icon={<AntDesign name='logout' color={'red'}
       size={20} />}  color={'text-red-500'}
        onclick={handlelogout} value={''} />
      </MenuOptions>
    </Menu>
   
    </View>
  )
}

export default Homeheader


const Divider=()=>{
    return <View className='w-[95%] mx-auto h-[1px] bg-neutral-400 '></View>
}