import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native'

const StartIndicater = () => {

  return (
      <View className='flex-1 justify-center items-center'>
       <ActivityIndicator size={'large'} color={'gray'} />
      </View>
  )
}

export default StartIndicater            