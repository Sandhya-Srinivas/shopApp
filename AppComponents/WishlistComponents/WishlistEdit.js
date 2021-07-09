import React from 'react'
import { View } from 'react-native'

import EditItemUI from '../UIComponents/EditItemUI';
import * as k from '../../AppConstants/utilConsts';

const WishlistEdit=({navigation, route})=>{

  const compList = k.navlinkListWishlist
  const compEdit = k.navlinkEditWishlist
  const compAdd = k.navlinkAddWishlist
  const id = { compList, compEdit, compAdd}

  return(
    <View>
        <EditItemUI id={id} navigation={navigation} route={route} />
    </View>
  )
}

export default WishlistEdit
