import { Feather, Ionicons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView, TextInput, Touchable, View } from 'react-native'
import { Text } from 'react-native'
import Loading from '../components/loading'
import Customkeyboard from '../components/customkeyboard'
import {Octicons} from '@expo/vector-icons'
import { useAuth } from '../context/authcontext'

const Signup = () => {
  
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [name,setname]=useState('')
   const [profilelink,setprofilelink]=useState('')
   const [loading,setloading]=useState(false)
   const router=useRouter()
   const {register} = useAuth()

   const handlesignup=async()=>{
    try{

       if(!email && !password && !name && !profilelink )
        {
            Alert.alert( "Sign Up", 'Fill All the Details')
            return
        } 
        setloading(true)

        let response=await register(name,email,password,profilelink)
        console.log(response)
        
        if(!response.success){
          Alert.alert('Sign Up',response?.message)
        }
        
    }
    catch(err)
    {
        console.log(err)
    }
    finally{
        setloading(false)

    }
   }
   
  return (
    // <Customkeyboard>
    <View className='flex-1 ' >
    <SafeAreaView className='mt-20' >
      <ScrollView showsVerticalScrollIndicator={false} >
     <Text className='text-3xl text-center mt-20 font-bold text-indigo-500' >
        Sign Up
     </Text>
     <View  className='mt-12 space-y-12'>
     <View  className='bg-gray-200 flex-row  w-[90%] px-4 mx-auto h-16 items-center
        rounded-lg'>
                <Feather size={26} name='user' color={'gray'}  />
            <TextInput className='text-black  w-full h-full ml-2 pl-4 text-lg'
             placeholder='User Name'
             value={name}  style={{flexShrink:1}}
             onChangeText={(value)=>setname(value)}
            placeholderTextColor={'gray'} />
        </View>
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
         <View  className='bg-gray-200 flex-row  w-[90%] px-4 mx-auto h-16 items-center
        rounded-lg oveflow-scroll '>
                <Feather size={26} name='image' color={'gray'}  />
            <TextInput className='text-black  w-full h-full ml-2 pl-4 text-lg'
             placeholder='Profile Link'
             value={profilelink} style={{flexShrink:1}}
             onChangeText={(value)=>setprofilelink(value)}
            placeholderTextColor={'gray'} />
        </View>
     </View>
     <TouchableOpacity className='' onPress={()=>handlesignup()} >
        <Text  className='w-[90%] mx-auto bg-indigo-500 text-white 
        text-center justify-center  text-xl font-bold p-4 mt-14  rounded-lg'  >
         {loading ? <Loading  color={'white'} /> : "Register"}
        </Text>
     </TouchableOpacity>
    <View className='flex-row gap-x-1  justify-center mt-4  items-center w-full' >
    <Text className='text-lg text-center  font-medium' >
        Don't have an account 
     </Text>

        <TouchableOpacity onPress={()=>router.push('signin')}>
        <Text className='text-indigo-600  text-lg font-medium' > Sign In </Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
     </SafeAreaView>
    </View>
    // </Customkeyboard>
  )
}

export default Signup