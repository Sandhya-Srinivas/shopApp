import React from 'react'

import * as k from '../../AppConstants/utilConsts';
import ListItemsUI from '../UIComponents/ListItemsUI';
import CartImage from '../../AppAssets/Cart.jpg';


const CartList=({navigation, route})=>{

    const compList = k.navlinkListCart
    const compEdit = k.navlinkEditCart
    const compAdd = k.navlinkAddCart
    const id = { compList, compEdit, compAdd }

    // console.log(route)
  return(
    <ListItemsUI id={id} navigation={navigation} route={route} bgImage={CartImage} />
  )
}

export default CartList