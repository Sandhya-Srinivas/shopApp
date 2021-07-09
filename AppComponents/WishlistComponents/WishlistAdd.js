import React from 'react'
import { View } from 'react-native'
import { useState } from 'react'

import RecognizeApp from "../UIComponents/RecognizeApp";
import AddItemUI from '../UIComponents/AddItemUI';
import * as k from '../../AppConstants/utilConsts';

const WishlistAdd=({navigation, route})=>{

  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [cost, setCost] = useState('')
  const [expiryDate, setExpiryDate] = React.useReducer((state, action)=>{
    return action.date
  })  
  const [expiryDays, setExpiryDays] = useState(null)

  const [item, setItem] = useState({})

  
  const [noExpiry, setNoExpiry] = useState(true)
  const [expiryAsDate, setExpiryAsDate] = useState(false)
  const [expiryInDays, setExpiryInDays] = useState(false)
  const [anyExpiry,  setAnyExpiry] = useState(k.noExpiry)
  const [expiry, setExpiry ] = useState(k.noExpiry)
  const [costType, setCostType] = useState(k.totalCost)

  const compList = k.navlinkListWishlist
  const compEdit = k.navlinkEditWishlist
  const compAdd = k.navlinkAddWishlist

  const id = { compList, compEdit, compAdd}

  const textRecognized=()=>{
    if(item!=={}){
      setItemName(item.name)
      setCost(item.cost.toString())
      setQuantity(item.quantity.toString())
      setAnyExpiry(item.anyExpiry)
      setExpiry(item.expiry)
      setCostType(item.costType)
      if(item.anyExpiry === k.expiryAsDate) { setExpiryInDays(false);setExpiryAsDate(true); setExpiryDate(item.expiry); setNoExpiry(false) }
      if(item.anyExpiry === k.expiryInDays) { setExpiryAsDate(false);setExpiryInDays(true); setExpiryDays(item.expiry); setNoExpiry(false) }
    }
  }
  return(
    <View>
      <View><AddItemUI 
          itemName={itemName} 
          setItemName={setItemName} 
          quantity={quantity} 
          setQuantity={setQuantity} 
          cost={cost} 
          setCost={setCost} 
          costType={costType} 
          setCostType={setCostType} 
          expiryAsDate={expiryAsDate}
          setExpiryAsDate={setExpiryAsDate}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          expiryInDays={expiryInDays}
          setExpiryInDays={setExpiryInDays}
          expiryDays={expiryDays}
          setExpiryDays={setExpiryDays}
          noExpiry={noExpiry}
          setNoExpiry={setNoExpiry}
          anyExpiry={anyExpiry}
          setAnyExpiry={setAnyExpiry}
          expiry={expiry}
          setExpiry={setExpiry}
          id={id} 
          navigation={navigation} 
        />
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', margin: 20}}>      
        <RecognizeApp item={item} setItem={setItem} textRecognized={textRecognized} />
      </View>
    </View>
  )
}

export default WishlistAdd