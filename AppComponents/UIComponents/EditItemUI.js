import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Snackbar from 'react-native-snackbar';
import { Button, Card, Form, Input, Item, Label, Left, Radio, Right, Body } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/core'

// // route is not being passed
// import { useRoute } from '@react-navigation/native';
// import { useNavigation } from '@react-navigation/native';

import { editItem } from '../../AppUtilityFunctions/editActions'
import * as k from '../../AppConstants/utilConsts';


const EditItemUI=({ id, navigation, route})=>{

  // const route = useRoute()
  // const navigation = useNavigation()
  // console.log('in edit............... ', id)
  const [itemName, setItemName] = useState(route.params.item.name)
  const [quantity, setQuantity] = useState(route.params.item.quantity)
  const [cost, setCost] = useState(route.params.item.cost)
  const [costType, setCostType ] = useState(route.params.item.costType)
  const [anyExpiry,  setAnyExpiry] = useState(route.params.item.anyExpiry )
  const [expiry, setExpiry ] = useState(route.params.item.expiry )
  const uuid = route.params.item.uuid

  const [expiryDate, setExpiryDate] = React.useReducer((state, action)=>{
    return action.date
  })  
  const [expiryDays, setExpiryDays] = useState(null)
  const [noExpiry, setNoExpiry] = useState(false)
  const [expiryAsDate, setExpiryAsDate] = useState(false)
  const [expiryInDays, setExpiryInDays] = useState(false)
  const [unitFlag, setUnitFlag] = useState(false)
  const [totalFlag, setTotalFlag] = useState(false)  
  const [showDP, setShowDP] = useState(false)

  useEffect(()=>{
    if(anyExpiry === k.noExpiry)
      setNoExpiry(true)
    else if(anyExpiry === k.expiryAsDate){
      setExpiryAsDate(true)
      setExpiryDate({date: expiry})
    }else{
      setExpiryInDays(true)
      setExpiryDays(expiry)
    }
    if(costType === k.totalCost) 
      setTotalFlag(true)
    else
      setUnitFlag(true)
  }, []) // []===>rendered only on mount, [r]===>rendered when r changes
  

  const [isCart, setIsCart] = useState(false)      
  const [isWishlist, setIsWishlist] = useState(false)      
  const [isStock, setIsStock] = useState(false)  

  const setlistfunc = ()=>{ 
      console.log(id.compList)       
      if(id.compList==k.navlinkListStock)
          setIsStock(true)
      else if(id.compList==k.navlinkListWishlist)
          setIsWishlist(true)
      else if(id.compList==k.navlinkListCart)
          setIsCart(true)
  }

  const isFocused = useIsFocused() 
  useEffect(()=>setlistfunc(), [isFocused])

  // console.log(id)

  const handleNoexpiry =()=>{      
    setNoExpiry(!noExpiry); 
    setExpiryInDays(false); 
    setExpiryAsDate(false)
    setAnyExpiry(k.noExpiry)
    setExpiry(k.noExpiry)
    // console.log(k.noExpiry, anyExpiry);
  }

  const handleDaychange =(days)=>{
    if(!days.match(/^\d*$/)){
      return Snackbar.show({
        text: 'Day is a numeric quantity',
        duration: Snackbar.LENGTH_SHORT
      })
    }
    setExpiryDays(days)
    setAnyExpiry(k.expiryInDays)
    setExpiry(days)
    setExpiryAsDate(false)
    setExpiryDate('')
  }

  const handleSubmit = ()=>{
    if((!noExpiry) && (expiry==k.noExpiry)){
        // if(!(noExpiry || expiryInDays || expiryAsDate)){
      return Snackbar.show({
        text: 'Please choose expiry',
        duration: Snackbar.LENGTH_SHORT
      })
    }
    console.log(itemName)
    const item = {
      uuid: uuid,
      itemName: itemName,
      cost: cost,
      costType: costType, 
      anyExpiry: anyExpiry, 
      expiry: expiry,
      quantity: quantity, 
      navigation: navigation, 
      id: id,
    }
    // console.log('in edit last ', id)
    editItem(item)
  }

  const renderDate=()=>{
    // console.log('in edit, in datepicker ', expiryDate)
    return(
      <DateTimePicker
        testID="dateTimePicker"
        value={expiryAsDate? moment(expiryDate)?.toDate(): new Date()}
        is24Hour={true}
        mode='date'
        minimumDate= {new Date()}
        maximumDate= {new Date(2100, 10, 20)}
        display="default"
        onChange={(date)=>{
          setShowDP(false) 
          setExpiryDate({date: moment(date?.nativeEvent?.timestamp)?.toDate()})
          setAnyExpiry(k.expiryAsDate)
          setExpiry(moment(date?.nativeEvent?.timestamp)?.toDate())
          setExpiryDays('')
          setExpiryInDays(false)
        }
      }
    />
    )
  }

    const callbackSetCost = ( (input)=>{
      setCost(input)
      if(!input.match(/^\d*([.]\d+)?$/)){
        return Snackbar.show({
          text: 'Cost is a numeric quantity',
          duration: Snackbar.LENGTH_SHORT
        })
      }
    })
    const callbackSetQuan = ( (input)=>{
      setQuantity(input)
      if(!input.match(/^\d*([.]\d+)?$/)){
        return Snackbar.show({
          text: 'Quantity is a numeric quantity',
          duration: Snackbar.LENGTH_SHORT
        })
      }
    })


  return(
    <View>
      {expiryAsDate && showDP && renderDate() }
      <Card style={styles.card}>
        <Form>
          <Item floatingLabel>
            <Label><Text>Item name</Text></Label>
            <Input disabled 
              value={itemName} 
              onChangeText={(inputText)=>setItemName(inputText)}
            />
          </Item>
          <Item floatingLabel>
            <Label><Text>Quantity</Text></Label>
            <Input 
              keyboardType={'number-pad'} 
              value={quantity} 
              onChangeText={(inputText)=>callbackSetQuan(inputText)}
            />
          </Item>

          {(isCart || isWishlist) && 
          <Item style={{width: "95%", alignSelf: 'center'}}> 
            <Left> 
              <Item floatingLabel>
              <Label><Text>Unit Cost</Text></Label>
              {unitFlag? 
                <Input 
                  keyboardType={'number-pad'} 
                  value={cost} onChangeText={(inputText)=>{callbackSetCost(inputText); setCostType(k.unitCost)}}
                /> 
                : <Input 
                    onFocus={()=>{setTotalFlag(false); setUnitFlag(true); setCostType(k.unitCost)}} 
                  />
              }              
              </Item>
            </Left>
            <Right>   
              <Item floatingLabel >
              <Label><Text>Total Cost</Text></Label>
              {totalFlag? 
              <Input 
                keyboardType={'number-pad'} 
                value={cost} 
                onChangeText={(inputText)=>{callbackSetCost(inputText); setCostType(k.totalCost)}}
              />
              : <Input 
                onFocus={()=>{setUnitFlag(false); setTotalFlag(true); setCostType(k.totalCost);}} />
              } 
              </Item>
            </Right>
          </Item>
          }

          {(isCart || isStock)  && <Label style={{alignSelf: 'center'}}><Text>Choose expiry</Text></Label> }
          {(isCart || isStock)  && 
          <Item style={{alignSelf: 'center'}}>
          <Left>  
              <Item floatingLabel>
                <Label>In Days</Label>                
                {expiryInDays ? 
                  <Input 
                    keyboardType={'number-pad'} 
                    disabled={noExpiry} 
                    value={expiryDays} 
                    onChangeText={(days)=>{handleDaychange(days);}} 
                  />
                  :<Input 
                    disabled={noExpiry} 
                    onFocus={()=>{setExpiryAsDate(false); setExpiryInDays(true)}} 
                  />           
                }
              </Item>
            </Left>
            <Body >  
              <Item floatingLabel>
                <Label>As Date</Label> 
                {/* {console.log('in edit ui, inside card ', moment(expiryDate).format('DD/MM/YYYY'))} */}
                {expiryAsDate? 
                  <Input 
                    disabled={noExpiry} 
                    onPressIn={()=>{setShowDP(true);}} 
                    onChangeText={()=>setShowDP(true)} 
                    value={moment(expiryDate).format('DD/MM/YYYY')} 
                  />
                  :<Input 
                    disabled={noExpiry}  
                    onFocus={()=>{setExpiryAsDate(true); setExpiryInDays(false); setShowDP(true) }} />           
                }
                </Item>
            </Body>
            
            <Right style={{flexDirection: 'column'}} >    
              <Item onPress={handleNoexpiry} >
                <Label>None</Label><Radio selectedColor='red' selected={noExpiry} onPress={handleNoexpiry} />
              </Item>
            </Right>

          </Item>
          }

        </Form>
      <View style={{marginTop:30}}>
      <Button style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Edit item</Text>
      </Button>
      </View>
      </Card>
    </View>
  )
}

export default EditItemUI

const styles = StyleSheet.create({
  card : {marginTop: 40, marginLeft: 10, marginRight: 10, marginBottom: 10},
  submitButton : {alignSelf: 'center', backgroundColor: 'red', width: 110, alignItems: 'center', justifyContent: 'center'},
  submitText: {fontSize: 20, color: '#fff'},
})