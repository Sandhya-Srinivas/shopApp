import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Item } from 'native-base'
import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider";

const Signout = ({navigation, route})=>{
    const { signOutFunc } = useAuth()
    const [issignoutpressed, setissignoutpressed] = useState(false)
    
    const handleSignout = async()=>{
        console.log('Pressed')
        setissignoutpressed(true)
        try {
            await signOutFunc()       
        } catch (error) {
            console.log(error)
        }
        setissignoutpressed(false)
    }

    return(
        <View style={styles.signoutView}>  
        {/* <Text>Do you want to sign out?</Text>        */}
                <Button disabled={issignoutpressed} style={styles.signoutButton} onPress={handleSignout}>
                    <Text>Signout</Text>
                </Button>
        </View>
    )
}
export default Signout

const styles = StyleSheet.create({
    signoutView: {flex: 1, justifyContent: 'center', alignItems: 'center' },
    signoutButton: {alignSelf: 'center', backgroundColor: 'red', height: 35}
})