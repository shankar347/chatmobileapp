import React from 'react'
import { FlatList, Text, View } from 'react-native'
import Chatitem from './chatitem'
import Loading from './loading'
import Custommenuitem from './custommenuitem'

const Chatlist = ({user,currentuser}) => {
//  console.log(user)
  return (
   <View className='flex-1' >
   <FlatList 
   data={user}
   showsVerticalScrollIndicator={false}
    contentContainerStyle={{flex:1, paddingVertical:10}}
    keyExtractor={item=>Math.random()}
    renderItem={({item,index})=><Chatitem item={item} 
    islast={user.length - 1 === index}
    currentuser={currentuser} index={index}/>}
   />
   </View>
  )
}

export default Chatlist