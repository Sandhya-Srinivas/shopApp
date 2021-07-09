import React from 'react'
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

// import LoginG from "../AuthComponents/LoginG";
import SigninEP from "../AuthComponents/SigninEP";
import SignupEP from "../AuthComponents/SignupEP";
import Signout from "../AuthComponents/Signout";
import Home from './Home';

import CartList from '../CartComponents/CartList'
import CartAdd from '../CartComponents/CartAdd'
import CartEdit from '../CartComponents/CartEdit'

import WishlistList from '../WishlistComponents/WishlistList'
import WishlistAdd from '../WishlistComponents/WishlistAdd';
import WishlistEdit from '../WishlistComponents/WishlistEdit';

import StockList from '../StockComponents/StockList';
import StockAdd from '../StockComponents/StockAdd';
import StockEdit from '../StockComponents/StockEdit';


const Stack = createStackNavigator()
const StackScreens=()=>{

  const optionsHeader = { headerStyle:styles.header , headerTintColor: '#000', headerTitleStyle:styles.headerTitle , }

  return(
    // <NavigationContainer>
    //   <FirebaseAuthProvider>
        
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home', ...optionsHeader}} />
          <Stack.Screen name="SigninEP" component={SigninEP}  options={{ title: 'Signin', ...optionsHeader}} />
          <Stack.Screen name="Signout" component={Signout}  options={{ title: 'Signout', ...optionsHeader}} />
          <Stack.Screen name="SignupEP" component={SignupEP}  options={{ title: 'Signup', ...optionsHeader}} />
          {/* <Stack.Screen name="LoginG" component={LoginG} /> */}

          {/* <Stack.Screen name='CartList' component={CartList} options={{title: 'Your Cart'}} /> */}
          <Stack.Screen name='CartList' component={CartList}  options={{ title: 'Your cart', ...optionsHeader}} />
          <Stack.Screen name='CartAdd' component={CartAdd}  options={{ title: 'Add to cart', ...optionsHeader}} />
          <Stack.Screen name='CartEdit' component={CartEdit}  options={{ title: 'Edit cart', ...optionsHeader}} />
          <Stack.Screen name='WishlistList' component={WishlistList}  options={{ title: 'Your wishlist', ...optionsHeader}} />
          <Stack.Screen name='WishlistAdd' component={WishlistAdd}  options={{ title: 'Add to wishlist', ...optionsHeader}} />
          <Stack.Screen name='WishlistEdit' component={WishlistEdit}  options={{ title: 'Edit wishlist', ...optionsHeader}} />
          <Stack.Screen name='StockList' component={StockList}  options={{ title: 'Your stock', ...optionsHeader}} />
          <Stack.Screen name='StockAdd' component={StockAdd}  options={{ title: 'Add to stock', ...optionsHeader}} />
          <Stack.Screen name='StockEdit' component={StockEdit}  options={{ title: 'Edit stock', ...optionsHeader}} />

        </Stack.Navigator>
    //   </FirebaseAuthProvider>
    // </NavigationContainer>
  )
}

export default StackScreens

const styles = StyleSheet.create({
  header: { backgroundColor: '#fff', },
  headerTitle: { fontWeight: 'normal', alignSelf: 'flex-start' },
})