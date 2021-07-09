import React, { useState, useEffect } from 'react'
import {Text, View, StyleSheet, ScrollView, ImageBackground} from 'react-native'
import {Fab, Card, CardItem, Button, Right, Left, Body, H2} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/core'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';

import { resolver } from '../../AppUtilityFunctions/resolvers'
import LoadingView from '../UtilityComponents/LoadingView';
import bgImageEmpty from "../../AppAssets/EmptyList.jpg";

import * as k from '../../AppConstants/utilConsts';

const ListItemsUI=({ id, bgImage, navigation2, route})=>{

    const navigation = useNavigation()

    const [listItems, setListItems] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)


    const isFocused = useIsFocused()    // may break

    const getList = async()=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        // console.log(navlink, storeloc, id, 123)
        try{
            const storedList1 = await AsyncStorage.getItem(storeloc)
            if(!storedList1) 
                setListItems(null)
            const list = JSON.parse(storedList1)
            setListItems(list)            
            let tmpTotal = 0
            if(list){    
                list.map(item=>{
                    if(item.costType === k.unitCost)
                        tmpTotal += parseFloat(item.quantity) * parseFloat(item.cost)
                    else
                        tmpTotal += parseFloat(item.cost)
                })
            }
            setTotal(tmpTotal)
            setLoading(false)
        }catch(err){
            console.log(err)
        }
    }

    const deleteItem = async(item)=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        try{
            const newList = listItems.filter((i)=>(item.uuid !== i.uuid))
            if(newList.length == 0){
                deleteList()
            }else{
                await AsyncStorage.setItem(storeloc, JSON.stringify(newList))
                setListItems(newList)
            }
        }catch(err){
            console.log(err)
        }
        setLoading(false)
        getList()
    }

    const deleteList = async()=>{
        setLoading(true)
        const {navlink, storeloc} = resolver(id.compList)
        setTotal(0)
        try{
            await AsyncStorage.removeItem(storeloc)
            setListItems(null)
        }catch(err){
            console.log(err)
        }
        setLoading(false)
        getList()
    }
    

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

    useEffect(()=>{
        getList() 
        setlistfunc()
    }, [isFocused])


    if(isLoading){
        return(<LoadingView/>)
    }

    if(!listItems){
        return(
            <ImageBackground source={bgImageEmpty} style={styles.bgImage} >
            <ScrollView contentContainerStyle={{flex: 1}}>
                <Card>
                    <CardItem>
                        <H2>Empty list</H2>                             
                    </CardItem>
                </Card>
                <Fab position="bottomRight" onPress={()=>navigation.navigate('Home', {screen: id.compAdd})} style={{backgroundColor:'red'}}>
                    <Icon name={"plus"} active/>
                </Fab>
            </ScrollView>
            </ImageBackground>
        )
    }

  return(
    <View style={styles.view}>
        <ImageBackground source={bgImage} style={styles.bgImage} >
        <ScrollView>
            <Card style={{flex:1, flexDirection: 'row'}}>
                {(isCart) && <Text style={styles.textFont20}>Cart  Total: {total}</Text> }    
                {(isWishlist) && <Text style={styles.textFont20}>Wishlist  Estimate: {total}</Text> }    
                {(isStock) && <Text style={styles.textFont20}>Stock</Text> }    
                <Right>
                <Button style={styles.emptyCartButton} onPress={deleteList}>
                    <Text style={{fontSize: 15, color: '#fff'}}>Empty List</Text>
                </Button>
                </Right>
            </Card>
            <Card>
                {listItems.map((item, index)=>(
                    <CardItem key={index} >
                    <Left style={styles.cardLeft}>
                        <Button danger style={styles.cardButton} onPress={()=>deleteItem(item)}>
                            <Icon name="trash" size={25} active/>
                        </Button>
                        {/* <Button warning style={styles.cardButton} onPress={()=>{navigation.navigate('Home', {screen: id.compEdit, params: {item}})}}> */}
                        <Button warning style={styles.cardButton} onPress={()=>{navigation.navigate(id.compEdit, {item})}}>
                            <Icon name="edit" size={25} active/>
                        </Button>
                    </Left>
                        <Body style={styles.cardBody}>
                            <Text style={{fontSize: 20}}>{item.name}</Text>
                            {(isWishlist || isCart) && <Text>{item.costType==k.unitCost? "unit ": "total "}cost:{item.cost}  quantity:{item.quantity} </Text>}
                            {(isStock)&& <Text>quantity:{item.quantity} </Text>}
                            {(isCart || isStock)  && <Text>{item.anyExpiry===k.noExpiry ? 
                                    "no expiry" : 
                                    item.anyExpiry===k.expiryAsDate? 
                                        "Expiry date: "+moment(item.expiry).format('DD/MM/YYYY') : 
                                        "Expiry: "+item.expiry+" days"} 
                            </Text>}    
                        </Body>
                    </CardItem>
                ))}
            </Card>
        </ScrollView>
        </ImageBackground>
        {/* <Fab position="bottomRight" onPress={()=>navigation.navigate('Home', {screen: id.compAdd})} style={{backgroundColor:'red'}}> */}
        <Fab position="bottomRight" onPress={()=>{navigation.reset({routes: [{name: "Home"}]}); navigation.navigate(id.compAdd)}} style={{backgroundColor:'red'}}>
            <Icon name={"plus"} active/>
        </Fab>
    </View>
  )
}

export default ListItemsUI

const styles = StyleSheet.create({
    view: { flex:1, },
    cardBody: {justifyContent: 'center', alignItems: 'flex-start'},
    cardRight: {flex:1, flexDirection:'row', justifyContent:'flex-end'},
    cardLeft: {flexDirection:'row', justifyContent:'flex-start', maxWidth: '30%', },
    cardButton: {width:30, padding:3, margin:1},
    emptyCartButton: {backgroundColor:'red', justifyContent: 'center', padding: 4, height: 30, marginHorizontal: 10},
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    textFont20: {margin: 10, fontSize: 20}, 
})