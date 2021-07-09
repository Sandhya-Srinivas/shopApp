import React from 'react'
import * as k from '../../AppConstants/utilConsts';
import ListItemsUI from '../UIComponents/ListItemsUI';
import StockImage from '../../AppAssets/Stock.jpg';


const StockList=({navigation, route})=>{

    const compList = k.navlinkListStock
    const compEdit = k.navlinkEditStock
    const compAdd = k.navlinkAddStock
    const id = { compList, compEdit, compAdd }

  return(
    <ListItemsUI id={id} navigation={navigation} route={route} bgImage={StockImage} />
  )
}

export default StockList