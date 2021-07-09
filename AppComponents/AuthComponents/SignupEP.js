import React, { useContext, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Input, Button, Item, Card, Form, Label } from 'native-base'
import Snackbar from 'react-native-snackbar';

import { useAuth, FirebaseAuthContext } from "../../AppFirebaseContextProvider/FirebaseAuthProvider";
import homeLogoImage from "../../AppAssets/Logo2d3.jpg"

const SignupEP = ({navigation, route})=>{
    // const { signUpWithEmailPassword } = useAuth()

    // different way of accessing apart from custom hook useAuth()
    const { signUpWithEmailPassword } = useContext(FirebaseAuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async()=>{
        try {
            if(email==='' || password===''){
                return Snackbar.show({
                        text: "Please fill all fields",
                        duration: Snackbar.LENGTH_LONG
                    })
            }
            const err = await signUpWithEmailPassword(email, password)
            if(err){
                return Snackbar.show({
                    text: err.code,
                    duration: Snackbar.LENGTH_LONG
                })
            }
            navigation.navigate('Home', {screen: "Home"})
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <ImageBackground source={homeLogoImage} style={styles.bgImage} >
            <View style={styles.viewSigning}>
                <Card style={styles.card}>
                    <Form>
                        <Item floatingLabel>
                            <Label><Text>Email</Text></Label><Input onChangeText={(inputText)=>setEmail(inputText)}/>
                        </Item>
                        <Item floatingLabel last>
                        <Label><Text>Password</Text></Label><Input onChangeText={(inputText)=>setPassword(inputText)}/>
                        </Item>
                    </Form>
                    <View style={{marginTop:30}}>
                    <Button style={styles.submitButton} onPress={handleSignup}>
                        <Text style={styles.submitText}>Signup</Text>
                    </Button>
                    </View>
                </Card>
            </View>
        </ImageBackground>
    )
}

export default SignupEP

const styles = StyleSheet.create({
    submitButton: {alignSelf: 'center', margin: 10, backgroundColor: 'red' },
    viewSigning: { position: 'absolute', width: '100%', top: "1%", justifyContent: 'center'},
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
})