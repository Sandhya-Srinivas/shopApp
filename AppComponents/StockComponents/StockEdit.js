import React from 'react'
import { View } from 'react-native'

import EditItemUI from '../UIComponents/EditItemUI';
import * as k from '../../AppConstants/utilConsts';

const StockEdit =({navigation, route})=>{

  const compList = k.navlinkListStock
  const compEdit = k.navlinkEditStock
  const compAdd = k.navlinkAddStock
  const id = { compList, compEdit, compAdd}

  return(
    <View>
        <EditItemUI id={id} navigation={navigation} route={route} />
    </View>
  )
}

export default StockEdit 

