import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {resolver} from './resolvers';
import * as k from '../AppConstants/utilConsts';

export const editItem = async(item)=>{

  // console.log(item.id.compList, "in edit actions")
  const { navlink, storeloc } = resolver(item.id.compList)
  // console.log(navlink, storeloc)

  // console.log('in edit actions ', item.costType)
  if(!item.itemName || !item.quantity){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  if(!parseFloat(item.quantity)){
    return Snackbar.show({
      text: 'Quantity should be a number',
      duration: Snackbar.LENGTH_SHORT
    })
  }
  if(item.id.compList==k.navlinkListCart || item.id.compList==k.navlinkListWishlist)
  {
    if( !item.cost ){
    return Snackbar.show({
      text: 'Please fill all fields',
      duration: Snackbar.LENGTH_SHORT
    })
    }
    if(!parseFloat(item.cost)){
      return Snackbar.show({
        text: 'Cost should be a number',
        duration: Snackbar.LENGTH_SHORT
      })
    }
  }
  try{
    const storedList1 = await AsyncStorage.getItem(storeloc)
    const storedList = JSON.parse(storedList1)
    const newList = storedList.map(i=>{
        if(i.uuid === item.uuid){
            i.name = item.itemName
            i.cost = item.cost
            i.quantity = item.quantity
            i.costType = item.costType
            i.expiry = item.expiry
            i.anyExpiry = item.anyExpiry
        }
        return i
    })
    // console.log("edit actions...", newList)
    await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
    // item.navigation.goBack() 
    // item.navigation.pop() 
    
    // item.navigation.push(navlink)
    // item.navigation.popToTop()
    // item.navigation.navigate("Home", {screen: navlink}) 
    // item.navigation.navigate(navlink) 
    item.navigation.reset({routes: [{name: "Home"}]})
    item.navigation.navigate(navlink)
  }catch(err){
    console.log(err)
  }
}


    