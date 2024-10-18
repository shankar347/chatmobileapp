import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Loading = ({color}) => {
  return (
   <View className='flex  items-center  justify-center justify-self ' >
    <ActivityIndicator size={'large'} color={color} />
   </View>
  )
}

export default Loading