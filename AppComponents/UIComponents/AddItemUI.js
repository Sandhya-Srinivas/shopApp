import React, { useCallback, useEffect, useState } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { Body, Button, Card, Form, Input, Item, Label, Left, Right, Radio } from 'native-base'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Snackbar from 'react-native-snackbar'
import { useIsFocused } from '@react-navigation/core'

import { addItem } from '../../AppUtilityFunctions/addActions'
import * as k from '../../AppConstants/utilConsts';


const AddItemUI=(props)=>{

  const [unitFlag, setUnitFlag] = useState(false)
  const [totalFlag, setTotalFlag] = useState(true)  
  const [showDP, setShowDP] = useState(false)

  const callbackSetName = useCallback( (input)=>{props.setItemName(input)}, [props.setItemName])
  const callbackSetCostType = useCallback( (input)=>{props.setCostType(input)}, [props.setCostType])
  const callbackSetCost = useCallback( (input, type)=>{
      if(!input.match(/^\d*([.]\d+)?$/)){
        return Snackbar.show({
          text: 'Cost is a numeric quantity',
          duration: Snackbar.LENGTH_SHORT
        })
      }
      props.setCost(input)
      callbackSetCostType(type)
    }, [props.setCost])
    const callbackSetQuan = useCallback( (input)=>{
      if(!input.match(/^\d*([.]\d+)?$/)){
        return Snackbar.show({
          text: 'Quantity is a numeric quantity',
          duration: Snackbar.LENGTH_SHORT
        })
      }
      props.setQuantity(input)
    }, [props.setQuantity])
    const callbackSetExpAsDate = useCallback( (input)=>props.setExpiryAsDate(input), [props.setExpiryAsDate])
    const callbackSetExpDate = useCallback( (input)=>{
      props.setExpiryDate(input)
    }, [props.setExpiryDate])
    const callbackSetExpInDays = useCallback( (input)=>props.setExpiryInDays(input), [props.setExpiryInDays])
    const callbackSetExpDays = useCallback( (input)=>props.setExpiryDays(input), [props.setExpiryDays])
    const callbackSetNoExp = useCallback( (input)=>props.setNoExpiry(input), [props.setNoExpiry])
    const callbackSetAnyExp = useCallback( (input)=>props.setAnyExpiry(input), [props.setAnyExpiry])
    const callbackSetExp = useCallback( (input)=>props.setExpiry(input), [props.setExpiry])


    const handleNoexpiry =()=>{      
      callbackSetNoExp(!props.noExpiry); 
      callbackSetExpInDays(false); 
      callbackSetExpAsDate(false)
      callbackSetAnyExp(k.noExpiry)
      callbackSetExp(k.noExpiry)
    }

    const handleDaychange =(days)=>{
      if(!days.match(/^\d*$/)){
        return Snackbar.show({
          text: 'Day is a numeric quantity',
          duration: Snackbar.LENGTH_SHORT
        })
      }
      callbackSetExpDays(days)
      callbackSetAnyExp(k.expiryInDays)
      callbackSetExp(days)
      callbackSetExpAsDate(false)
      callbackSetExpDate('')
    }

    const handleSubmit = ()=> {
      if(!props.noExpiry && (props.expiry==k.noExpiry)){
        return Snackbar.show({
          text: 'Please choose expiry',
          duration: Snackbar.LENGTH_SHORT
        })
      }
      // if(!(props.noExpiry || props.expiryDays || props.expiryDate)){
      //   return Snackbar.show({
      //     text: 'Please choose expiry',
      //     duration: Snackbar.LENGTH_SHORT
      //   })
      // }
      const item = {
        itemName: props.itemName,
        cost: props.cost,
        costType: props.costType, 
        anyExpiry: props.anyExpiry, 
        expiry: props.expiry,
        quantity: props.quantity, 
        navigation: props.navigation, 
        id: props.id
      }
      addItem(item)
    }

    const [isCart, setIsCart] = useState(false)      
    const [isWishlist, setIsWishlist] = useState(false)      
    const [isStock, setIsStock] = useState(false)  

    const setlistfunc = ()=>{ 
        console.log(props.id.compList)       
        if(props.id.compList==k.navlinkListStock)
            setIsStock(true)
        else if(props.id.compList==k.navlinkListWishlist)
            setIsWishlist(true)
        else if(props.id.compList==k.navlinkListCart)
            setIsCart(true)
    }

    const isFocused = useIsFocused() 
    useEffect(()=>setlistfunc(), [isFocused])

    const renderDate=()=>{
      return(
        <DateTimePicker
          testID="dateTimePicker"
          value={props.expiryDate? props.expiryDate: new Date()}
          is24Hour={true}
          mode='date'
          minimumDate= {new Date()}
          maximumDate= {new Date(2100, 10, 20)}
          display="default"
          onChange={(date)=>{
            setShowDP(false)  
            callbackSetExpDate({date: moment(date?.nativeEvent?.timestamp)?.toDate()})
            callbackSetAnyExp(k.expiryAsDate)
            callbackSetExp(moment(date?.nativeEvent?.timestamp)?.toDate())
            callbackSetExpDays('')
            callbackSetExpInDays(false)
          }}
      />
      )
    }

  return(
    <View>
      {props.expiryAsDate && showDP && renderDate() } 

      <Card style={styles.card}>
        <Form>
          
          <Item floatingLabel>
            <Label><Text>Item name</Text></Label>
            <Input autoCompleteType='name' 
              value={props.itemName} 
              onChangeText={(inputText)=>callbackSetName(inputText)}
            />
          </Item>

          <Item floatingLabel>
              <Label><Text>Quantity</Text></Label>
              <Input 
                keyboardType={'number-pad'} 
                value={props.quantity} 
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
                    value={props.cost.toString()}
                    onChangeText={(inputText)=>callbackSetCost(inputText, k.unitCost)}
                  /> 
                  : <Input 
                    value={null} 
                    onFocus={()=>{setTotalFlag(false); setUnitFlag(true); callbackSetCostType(k.unitCost)}} />
                }              
                </Item>
              </Left>

              <Right>   
                <Item floatingLabel >
                <Label><Text>Total Cost</Text></Label>
                {totalFlag? 
                <Input 
                  keyboardType={'number-pad'} 
                  value={props.cost} 
                  onChangeText={(inputText)=>callbackSetCost(inputText, k.totalCost)}
                />
                : <Input value={null} onFocus={()=>{setUnitFlag(false); setTotalFlag(true); callbackSetCostType(k.totalCost)}} />
                } 
                </Item>
              </Right>

            </Item>
          }

          
          {(isCart || isStock)  && <Label style={{alignSelf: 'center'}}><Text>Choose expiry</Text></Label>} 
          { (isCart || isStock)  && 
          <Item style={{alignSelf: 'center'}}>

            <Left> 
              <Item floatingLabel>
                <Label>In Days</Label>                
                {props.expiryInDays && !props.expiryAsDate ? 
                <Input 
                  keyboardType={'number-pad'} 
                  disabled={props.noExpiry} value={props.expiryDays}
                  onChangeText={(days)=>{handleDaychange(days)}}
                />
                :<Input 
                  disabled={props.noExpiry} 
                  onFocus={()=>{callbackSetExpAsDate(false); callbackSetExpInDays(true);}} />           
                }
              </Item>
            </Left>

            <Body >   
              <Item floatingLabel>
                <Label>As Date</Label> 
                {/* {console.log(' In side ....', props.expiry, moment(props.expiry).format('MMMM Do YYYY'), (new Date(props.expiry)).toDateString())} */}
                {props.expiryAsDate && !props.expiryInDays? 
                <Input 
                  disabled={props.noExpiry}
                  onPressIn={()=>{setShowDP(true);}}
                  onChangeText={()=>setShowDP(true)} 
                  value={moment(props.expiry)?.format('DD/MM/YYYY')}
                />
                :<Input disabled={props.noExpiry} 
                  onFocus={()=>{callbackSetExpAsDate(true); callbackSetExpInDays(false);  setShowDP(true) }} 
                />           
                }
                </Item>
            </Body>
            
            <Right style={{flexDirection: 'column'}} >    
              <Item onPress={handleNoexpiry} >
                <Label>None</Label><Radio selectedColor='red' selected={props.noExpiry} onPress={handleNoexpiry} />
              </Item>
            </Right>

          </Item>
          }

        </Form>

        <View style={{marginTop:30}}>    
        <Button style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Add item</Text>
        </Button>
        </View>
      </Card> 

    </View>
  )
}

export default AddItemUI

const styles = StyleSheet.create({
  card : {marginTop: 10, marginLeft: 10, marginRight: 10, marginBottom: 10},
  submitButton : {alignSelf: 'center', backgroundColor: 'red', width: 110, alignItems: 'center', justifyContent: 'center'},
  submitText: {fontSize: 20, color: '#fff'},
})