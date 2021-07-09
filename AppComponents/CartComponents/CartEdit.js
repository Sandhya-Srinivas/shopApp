import React from 'react'
import { View } from 'react-native'

import EditItemUI from '../UIComponents/EditItemUI';
import * as k from '../../AppConstants/utilConsts';

const CartEdit =({navigation, route})=>{

  const compList = k.navlinkListCart
  const compEdit = k.navlinkEditCart
  const compAdd = k.navlinkAddCart
  const id = { compList, compEdit, compAdd}

  return(
    <View>
        <EditItemUI id={id} navigation={navigation} route={route} />
    </View>
  )
}

export default CartEdit 

