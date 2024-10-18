import React from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

const Chatkeyboard = ({children,inchat }) => {
  
    const ios=Platform.OS ==='ios'
   
    let keyboardconfitg={}
    let scrollconfig={}

    if(inchat)
    {
        keyboardconfitg = { keyboardVerticalOffset: 90}
        scrollconfig = { contentContainerStyle: {flex: 1}}
    }

    return (
        <KeyboardAvoidingView 
        behavior={ios ? 'padding' : 'height'}
        style={{flex:1}}
        {...keyboardconfitg}
        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        {...scrollconfig}
        style={{flex:1}}
        bounces={false}
        >
         {
             children
         }
        </ScrollView>
        </KeyboardAvoidingView>
  )
}

export default Chatkeyboard