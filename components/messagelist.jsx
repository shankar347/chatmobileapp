import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Messageitem from './messageitem'

const Messagelist = ({messages,scrollViewRef}) => {

  return (
     <ScrollView style={{paddingTop:8}} 
     ref={scrollViewRef}
     showsVerticalScrollIndicator={false} >
     {
        messages?.map((message,index)=>(
            <Messageitem key={index} message={message} 
            prevIndex={
                messages[index-1] ? messages[index-1].senderId :null
            }
            index={message.senderId} />
        ))
     }
     </ScrollView>
  )
}

export default Messagelist