import React from 'react'
import * as k from '../../AppConstants/utilConsts';
import ListItemsUI from '../UIComponents/ListItemsUI';
import WishlistImage from '../../AppAssets/Wishlist.jpg';

const WishlistList=({navigation, route})=>{

    const compList = k.navlinkListWishlist
    const compEdit = k.navlinkEditWishlist
    const compAdd = k.navlinkAddWishlist
    const id = { compList, compEdit, compAdd }

  return(
    <ListItemsUI id={id} navigation={navigation} route={route} bgImage={WishlistImage} />
  )
}

export default WishlistList
