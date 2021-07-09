import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';


import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider"
import StackScreens from './stackScreens.js';
import StockList from '../StockComponents/StockList';
import WishlistList from '../WishlistComponents/WishlistList'
import CartList from '../CartComponents/CartList'
import SigninEP from '../AuthComponents/SigninEP';
import SignupEP from '../AuthComponents/SignupEP';
import Home from './Home';


const Drawer = createDrawerNavigator();

const LoggedInHome = ({navigation, route})=>{
    const { user } = useAuth()   

    if(user){
        return(
           <Drawer.Navigator initialRouteName="Home">
             <Drawer.Screen name="Home" component={StackScreens}/>
             <Drawer.Screen name='CartList' component={CartList} />
             <Drawer.Screen name='WishlistList' component={WishlistList} />
             <Drawer.Screen name='StockList' component={StockList} />
             {/* <Drawer.Screen name='Home' component={StackScreens} /> */}
   
           </Drawer.Navigator>
        )
    }
    return(
      <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Signin" component={SigninEP} />
      <Drawer.Screen name="Signup" component={SignupEP} />
      </Drawer.Navigator>
      
      // <Stack.Navigator initialRouteName="Home">
      // <Stack.Screen name="Home" component={Home} options={{ title: 'Home', ...optionsHeader}} />
      // <Stack.Screen name="SigninEP" component={SigninEP}  options={{ title: 'Signin', ...optionsHeader}} />
      // <Stack.Screen name="Signout" component={Signout}  options={{ title: 'Signout', ...optionsHeader}} />
      // <Stack.Screen name="SignupEP" component={SignupEP}  options={{ title: 'Signup', ...optionsHeader}} />
      // </Stack.Navigator>

    )
}

export default LoggedInHome


// const LoggedInHome = ()=>{
//   return(
//       <View>
//           <Text>Logged in</Text>
//       </View>
//   )
// }