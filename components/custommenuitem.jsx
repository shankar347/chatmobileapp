import React from 'react'
import { Text, View } from 'react-native'
import { MenuOption } from 'react-native-popup-menu'

const Custommenuitem = ({text,onclick,value,icon,color}) => {
  return (
    <MenuOption onSelect={()=>onclick()} >
      <View className='flex-row justify-between items-center px-4 ' >
        <Text className={`text-lg font-medium ${color}`} >
           {text}
        </Text>
        {icon}
    </View>
    </MenuOption>
  )
}

export default Custommenuitem