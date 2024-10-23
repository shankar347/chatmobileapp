import { Slot, useRouter, useSegments } from 'expo-router'
import React, { useContext, useEffect } from 'react'
import { View } from 'react-native'
import Authcontext, { useAuth } from '../context/authcontext'
import { MenuProvider } from 'react-native-popup-menu'

const Mainlayout=()=>{
  const {isAuthenticated} =useAuth()
  const router=useRouter()
  let segments=useSegments()
  
useEffect(()=>{
  if(typeof isAuthenticated === 'undefined') return 
  
  let inapp=segments[0] === '(app)'
  if(!isAuthenticated)
  { 
   router.replace('home')
  }
  else if (isAuthenticated && !inapp )
  {
    router.replace('home')
  }
  
},[isAuthenticated]) 

 return <Slot/>
}

const Rootlayout = () => {

 
  return (
    <MenuProvider>
     <Authcontext>
      <Mainlayout/>
     </Authcontext>
     </MenuProvider>
  )
}

export default Rootlayout