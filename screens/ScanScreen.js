import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
 export default class ScanScreen extends React.Component{
     constructor(){
         super();
         this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
         }
     }
     getCameraPermissions=async()=>{
         const{status}=await Permissions.askAsync(Permissions.CAMERA)
         this.setState({
             hasCameraPermissions:status==="granted",
             buttonState:'clicked',
             scanned:false
            })
     }
     handleBarCodeScanned=async({type,data})=>{
         this.setState({
             scanned:true,
             scannedData:data,
             buttonState:'normal'
         })
     }
     render(){
         const hasCameraPermissions=this.state.hasCameraPermissions
         const scanned=this.state.scanned
         const buttonState=this.state.buttonState
         if(buttonState==="clicked"&&hasCameraPermissions){
             return(
                 <BarCodeScanner
                 onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}
                 style={StyleSheet.absoluteFillObject}
                 />
             )
         }
         else if(buttonState==="normal"){
             return(
                 <View style={styles.contaner}>
                     <View>
                         <Image
                         source={require('../assets/cam.png')}
                         style={{width:200, height:200}}
                         />
                         <Text style={{textAlign:'center', fontSize:30}}>
                             Bar Code Scanner 
                         </Text>
                     </View>
                     <Text style={styles.displayText}>
                         {
                             hasCameraPermissions===true?
                             this.state.scannedData:"Request camera permission"
                         }
                     </Text>
                     <TouchableOpacity
                     onPress={this.getCameraPermissions}
                     style={styles.scanButton}
                     title='BAR CODE SCANER!'
                     >
                      <Text style={styles.buttonText}>
                          SCAN OR CODE
                      </Text>

                     </TouchableOpacity>
                 </View>
             )
         }
     }
 }
const styles=StyleSheet.create({
    contaner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'#2196f3',
        padding:10,
        margin:10
    },
    buttonText:{
        fontSize:20,
    },
})