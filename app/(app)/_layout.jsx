import { Stack } from 'expo-router'
import React from 'react'
import Homeheader from '../../components/homeheader'

const _layout = () => {
  return (
   <Stack>
    <Stack.Screen 
    name='home'
    options={{
        header:() =><Homeheader/>
    }}
    />
    </Stack>
  )
}

export default _layout