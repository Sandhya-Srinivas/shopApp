
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import 'react-native-get-random-values'
import {nanoid} from 'nanoid';
import * as k from "../AppConstants/utilConsts.js";

import { resolver } from './resolvers';

export const addItem = async({itemName, cost, costType, anyExpiry, expiry, quantity, navigation, id})=>{

  const { navlink, storeloc } = resolver(id.compList)
  // console.log(navlink, storeloc)

  if(!itemName || !quantity){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  if(!parseFloat(quantity)){
    return Snackbar.show({
      text: 'Quantity should be a number',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  if(id.compList==k.navlinkListCart || id.compList==k.navlinkListWishlist)
  {
    if( !cost ){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
    }
    if(!parseFloat(cost)){
      return Snackbar.show({
        text: 'Cost should be a number',
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }
  try{
    const item = {
      uuid: nanoid(),
      name: itemName,
      cost: cost,
      quantity: quantity,
      costType: costType,
      anyExpiry: anyExpiry,
      expiry: expiry
    }
    const storedList1 = await AsyncStorage.getItem(storeloc)
    if(!storedList1){
      const newList = [item]
      await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
    }else{
      const storedList = JSON.parse(storedList1)
      storedList.push(item)
      await AsyncStorage.setItem(storeloc, JSON.stringify(storedList))
    }
    // navigation.reset({routes: [{name: navlink}]})
    navigation.reset({routes: [{name: "Home"}]})
    navigation.navigate(navlink)
    // navigation.navigate(navlink) // should change this
  }catch(err){
    console.log(err)
  }
}