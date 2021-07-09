import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FirebaseAuthProvider from '../../AppFirebaseContextProvider/FirebaseAuthProvider';
import LoggedInHome from './loggedinHome';
  
export default function DrawerTrial() {
    return (
      <NavigationContainer>
       <FirebaseAuthProvider>
           <LoggedInHome/>
       </FirebaseAuthProvider>
      </NavigationContainer>
    );
  }



