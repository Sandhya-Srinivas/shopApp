import React, { useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { Button, Text, Right, Item, Card, CardItem, Left, } from 'native-base'


import { useAuth } from "../../AppFirebaseContextProvider/FirebaseAuthProvider"
// import LoginG from '../AuthComponents/LoginG';
import Signout from '../AuthComponents/Signout';
import homoLogoImage from "../../AppAssets/Logo2d3.jpg";


const Home = ({navigation, route})=>{
    const { user } = useAuth()

    if(user){
        return(
        <ImageBackground source={homoLogoImage} style={styles.bgImage} >
            <View style={styles.viewSignedIn}>
                <Text style={styles.textWelcome} >Welcome {user.email}</Text>
            </View>
                <View style={styles.viewSigning}><Signout/></View>
        </ImageBackground>

        )
    }
    return(
        <ImageBackground source={homoLogoImage} style={styles.bgImage} >
            <View style={styles.viewSigning}>            
            {/* <LoginG /> */}
            <Button style={styles.button} onPress={()=>navigation.navigate('Signup')}><Text>Signup</Text></Button>
            <Button style={styles.button} onPress={()=>navigation.navigate('Signin')}><Text>Signin</Text></Button>
            </View>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    button: { alignSelf: 'center', margin: 10, backgroundColor:'#b81802', marginHorizontal: "10%" },
    touchOp: {width:'33%', padding: '1%', alignItems: 'center', justifyContent: 'center', borderColor: '#fbc4a6', borderWidth: 1, borderRadius: 0  },
    textTab: { color: 'white', fontSize: 22, },
    viewSigning: { position: 'absolute', width: '100%', bottom: "5%", flexDirection:'row', justifyContent: 'center'},
    viewTab: { flexDirection: 'row', backgroundColor: '#fbc4a6', alignItems: 'center', justifyContent: 'center', },
    textWelcome: { fontSize: 20,  alignSelf: 'center', backgroundColor: '#a90202', padding: 10, color: '#fff',  },
    bgImage: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    viewSignedIn: {flex: 1, alignItems: 'center', margin: 30,  },
})