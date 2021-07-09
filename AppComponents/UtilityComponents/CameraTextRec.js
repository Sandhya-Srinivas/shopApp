import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View, } from 'react-native';
import { Button } from 'native-base';
import { RNCamera} from "react-native-camera"

import { recText } from "../../AppUtilityFunctions/RecognizeAppFunctions";
import LoadingView from '../UtilityComponents/LoadingView';

export default function CameraTextRec({setItem, textRecognized, onTakePhoto}) {

//   const [item, setItem] = useState({})

    // const callbackTextRecognized = useCallback( (camera)=>{
    //     onTakePhoto(camera)
    //     textRecognized()
    // }, [textRecognized])

    const handleSnapClick = async (camera)=>{
        try {
            // callbackTextRecognized(camera)   
            onTakePhoto(camera)
            textRecognized()              
        } catch (error) {
            console.log(error)
        }
    }

    const callbackSetItem = useCallback( (inItem)=> setItem(inItem), [setItem])

  return (
    <View >
    <RNCamera 
      type={RNCamera.Constants.Type.back}
      style={styles.preview}
      captureAudio = {false}
      flashMode = {RNCamera.Constants.FlashMode.off}
      ratio = "1:1"
      zoom = {0.4}
      onTextRecognized={({textBlocks})=>{
        if(textBlocks){ // text is recognized, but not updated
          callbackSetItem(recText(textBlocks))
        }
      }}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'long text to use camera',
        buttonPositive: 'OK',
        buttonNegative: 'cancel'
      }}
      >
        {({camera, status})=>{
          if(status !== 'READY')
            return <LoadingView/>
          return (
            // on click photo, text will be filled in text inputs
            <Button onPress={()=>{handleSnapClick(camera)}} style={styles.submitButton}>
                <Text style={styles.submitText}>Snap</Text>
            </Button>
          )
        }}
    </RNCamera>
  </View>
  );
}

const styles = StyleSheet.create({
  submitButton : {alignSelf: 'center', backgroundColor: 'red', width: 110, alignItems: 'center', justifyContent: 'center'},
  submitText: {fontSize: 20, color: '#fff'},
//   image: { width: 250, height: 200, margin: 30, borderRadius: 10, },
  preview:{ alignItems:'center', justifyContent: 'space-around', width: 250, height: 200, },
//   snapView: { margin: 30, width: 200, height: 200, alignItems: 'center', justifyContent: 'center'}
});