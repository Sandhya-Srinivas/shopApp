import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Text, Input, Button, Item, Card, Label, Form, } from 'native-base'

// navigate from non screen components
import { useNavigation } from '@react-navigation/native';  
import Snackbar from "react-native-snackbar";

import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider";
import homeLogoImage from "../../AppAssets/Logo2d3.jpg"


const SigninEP = ()=>{
    const { signInWithEmailAndPassword } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()

    const handleSignin = async()=>{
        try {
            if(email==='' || password===''){
                return Snackbar.show({
                        text: "Please fill all fields",
                        duration: Snackbar.LENGTH_LONG
                    })
            }
            const err = await signInWithEmailAndPassword(email, password) 
            if(err){
                return Snackbar.show({
                    text: err.code,
                    duration: Snackbar.LENGTH_SHORT
                })
            }  
        } catch (error) {
            Snackbar.show({
                text: error,
                duration: Snackbar.LENGTH_SHORT
            })
        }
        navigation.navigate('Home', {screen: "Home"})         
    }

    return(
        <ImageBackground source={homeLogoImage} style={styles.bgImage} >
            <View style={styles.viewSigning}>
                <Card style={styles.card}>
                {/* <Text style={styles.textSignin}>Signin</Text> */}
                    <Form>
                        <Item floatingLabel>
                            <Label><Text>Email</Text></Label><Input onChangeText={(inputText)=>setEmail(inputText)}/>
                        </Item>
                        <Item floatingLabel last>
                        <Label><Text>Password</Text></Label><Input onChangeText={(inputText)=>setPassword(inputText)}/>
                        </Item>
                    </Form>
                    <View style={{marginTop:30}}>
                    <Button style={styles.submitButton} onPress={handleSignin}>
                        <Text style={styles.submitText}>Signin</Text>
                    </Button>
                    </View>
                </Card>
            </View>
        </ImageBackground>
    )
}

export default SigninEP

const styles = StyleSheet.create({
    submitButton: {alignSelf: 'center', margin: 10, backgroundColor: 'red' },
    textSignin: { fontSize: 30, color: 'red', alignSelf: 'center' },
    viewSigning: { position: 'absolute', width: '100%', top: "1%", justifyContent: 'center'},
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
})