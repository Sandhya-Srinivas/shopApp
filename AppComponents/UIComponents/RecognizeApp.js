import React, {useState} from 'react'
import { StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { Button, Card } from 'native-base';
import Snackbar from 'react-native-snackbar';

import CameraTextRec from "../UtilityComponents/CameraTextRec";

export default function RecognizeApp({item, setItem, textRecognized}) {

  const [image, setImage] = useState(null)
  
  const onTakePhoto = async(camera)=>{
    try{
      const options = {quality: 0.9, base64:false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
      if(item!=={})
        console.log(item)
    }catch(err){
      Snackbar.show({
        text: err,
        duration: Snackbar.LENGTH_LONG
      })
    }
  }

  return (
    <View style={styles.snapView}>
      <Card>
        {image ? 
         (
          <View> 
            <Image source={{uri: image, width: '100%'}} style={styles.image} resizeMode="contain" />  
            <Button onPress={()=>setImage(null)} style={styles.submitButton}>
              <Text style={styles.submitText}>New photo</Text>
            </Button>
          </View>
          ):
          ( <CameraTextRec textRecognized={textRecognized} setItem={setItem} onTakePhoto={onTakePhoto}/> )
        }
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  submitButton : {alignSelf: 'center', backgroundColor: 'red', width: 110, alignItems: 'center', justifyContent: 'center'},
  submitText: {fontSize: 20, color: '#fff'},
  image: { width: 250, height: 200, margin: 30, borderRadius: 10, },
  snapView: { margin: 30, width: 200, height: 200, alignItems: 'center', justifyContent: 'center'}
});