import React from 'react'

const timecomponent = (date) => {
  
    let currendate=new Date()
    let currentyear=currendate.getFullYear()

     let day=date.getDate()
     let monthNames=['Jan','Feb','Mar','Apr','May','June','July','Sep','Opt','Nov','Dec']
     let month=monthNames[date.getMonth()]
     let year=date.getFullYear()
    
     console.log()

    let check=currentyear > year
    console.log(check)
    // +  checkedyear
//  + ' ' + currentyear > year ?   year : ''
     var checkedyear= check  ?  +  ' '  + year : '' 
     var fomattedDate=day + ' ' + month  
    return fomattedDate
}


export default timecomponent