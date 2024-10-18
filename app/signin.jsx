import { Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { SafeAreaView, TextInput, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import Loading from '../components/loading'
import {Octicons} from '@expo/vector-icons'
import { useAuth } from '../context/authcontext'

const Signin = () => {
  
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [loading,setloading]=useState(false)
   const router=useRouter()
   const {login}=useAuth()

   const handlesignin=async()=>{
      
    try{
       if(!email && !password)
        {
            Alert.alert( "Sign In", 'Fill the email and password')
            return
        } 
        setloading(true)
        const response=await login(email,password)
        setloading(false)
        if(!response.success)
            {
                Alert.alert( "Sign In", response.message)
            }   
    }
    catch(err)
    {
        console.log(err)
    }
   }
   
  return (
    <View className='flex-1  ' >
    <SafeAreaView className='mt-28' >
     <Text className='text-3xl text-center mt-20 font-bold text-indigo-500' >
        Sign In
     </Text>
     <View  className='mt-16 space-y-12'>
        <View  className='bg-gray-200 flex-row  w-[90%] px-4 mx-auto h-16 items-center
        rounded-lg'>
                <Octicons size={26} name='mail' color={'gray'}  />
            <TextInput className='text-black  w-full h-full ml-2 pl-4 text-lg'
             placeholder='Email address'
             value={email}  style={{flexShrink:1}}
             onChangeText={(value)=>setemail(value)}
            placeholderTextColor={'gray'} />
        </View>
        <View  className='bg-gray-200 flex-row  w-[90%] px-4 mx-auto h-16 items-center
         rounded-lg'>
                <Octicons size={26} name='lock' color={'gray'}  />
             <TextInput className='text-black  w-full h-full ml-2 pl-4 text-lg'
              placeholder='Password' secureTextEntry
              value={password}  style={{flexShrink:1}}
              onChangeText={(value)=>setpassword(value)}
             placeholderTextColor={'gray'} />
         </View>
     </View>
     <TouchableOpacity  >
     <Text className='ml-6 mt-2 text-lg text-red-500 font-bold ' >
        Forget Password
     </Text>
     </TouchableOpacity>
     <TouchableOpacity className='' onPress={()=>handlesignin()} >
        <Text  className='w-[90%] mx-auto bg-indigo-500 text-white
        text-center items-center
         justify-center text-xl font-bold p-4 mt-7  rounded-lg'  >
            {loading ? <Loading color={'white'}  /> : "Submit"}
        </Text>
     </TouchableOpacity>
    <View className='flex-row gap-x-1  justify-center mt-4  items-center w-full' >
    <Text className='text-lg text-center  font-medium' >
        Don't have an account 
     </Text>

        <TouchableOpacity onPress={()=>router.push('signup')}>
        <Text className='text-indigo-600  text-lg font-medium' > Sign Up </Text>
        </TouchableOpacity>
    </View>
     </SafeAreaView>
    </View>
  )
}

export default Signin