import Snackbar from "react-native-snackbar"

import * as k from '../AppConstants/utilConsts'

const itemRecognized = {}

export const recText = (textObj)=>{

    if(textObj.length > 0){

      // console.log(textObj)
      const arr = textObj.map(item=>(
        item["value"]
      ))

      // console.log(arr)
      const items = arr.map(item=>{
        return (item.split(/[ :]+/))
      })

      let name=0, cost=0, quantity=0, costType = k.totalCost, anyExpiry = k.noExpiry, expiry=0
      // console.log(items) 

      for (let index = 0; index < items.length; index++) {
        for (let i = 0; i < items[index].length-1; i++) {

          if(items[index][i]=="Name" || items[index][i]=="name")
            name = items[index][i+1]

          // if(items[index][i]=="cost" || items[index][i]=="Cost"){
          if(items[index][i].match(/(mrp)|(MRP)|([cC]ost)|([Pp]rice)/) !==null){
            cost = items[index][i+1]
            cost = cost.toString()
            if(cost?.match(/\d+([.]\d+)?/)[0])
              cost = cost.match(/\d+([.]\d+)?/)[0]
          }

          if(items[index][i]=="quantity" || items[index][i]=="Quantity"){
            quantity = items[index][i+1]
            quantity = quantity.toString()
            if(quantity)
              quantity = quantity.match(/\d+([.]\d+)?/)[0]
          }
          
          // console.log('In recog actions ... ',i, items[index][i])
          if(items[index][i+1]?.toString().match(/[Dd]ays?/) != null){
            // console.log('INside... recog actions')
            if(items[index][i].toString())
              expiry = items[index][i].toString()?.match(/\d+/)?.toString(); anyExpiry = k.expiryInDays; 
          }

        }
      }
      // console.log(name, cost, quantity)
      for (let index = 0; index < items.length; index++) {
        for (let i = 0; i < items[index].length; i++) {

          let temp = (items[index][i]?.toString()).match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-](\d{4})$/)
          if( temp){
            // console.log('temp here.....', temp)
            temp = new Date(parseInt(temp[3]), parseInt(temp[2])-1, parseInt(temp[1]))
            expiry = temp; anyExpiry = k.expiryAsDate; 
            // console.log('Expiry ......', expiry)
          }

          temp = (items[index][i]?.toString()).match(/^(\d{4})[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
          if(temp){
            // console.log('temp here.....', temp)
            // Why -1? because in date() months range from 0 to 11. So 7 will treated as 8.
            temp = new Date(parseInt(temp[1]), parseInt(temp[2])-1, parseInt(temp[3]))
            expiry = temp; anyExpiry = k.expiryAsDate; 
            // expiry = temp[0]; anyExpiry = k.expiryAsDate; 
          }
          
        }
      }
      if(!expiry) anyExpiry=k.noExpiry

      itemRecognized.name = name
      itemRecognized.cost = cost
      itemRecognized.quantity = quantity
      itemRecognized.anyExpiry = anyExpiry
      itemRecognized.expiry = expiry
      itemRecognized.costType = costType
    }
    return itemRecognized
  }
