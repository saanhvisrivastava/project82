import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    
    ScrollView} from 'react-native';

import MyHeader from '../components/MyHeader.js';
import db from '../config';
import firebase from 'firebase';


 
export default class SettingScreen extends React.Component{

    constructor(){
        super()
        this.state={
            emailId:'',
            docId:'',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            
        }
    }

    getUserDetails=()=>{
        var email=firebase.auth().currentUser.email;
        db.collection('users').where('email','===',email).get()
        .then(snapShot=>{
            snapShot.forEach(doc=>{
                var data=doc.data()
               this.setState({
                docId:doc.id,
                emailId: data.email,
                firstName: data.first_name,
                lastName: data.last_name,
                address: data.address,
                contact: data.mobile_number
               })
            })

        })
    }

    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            'first_name':this.state.firstName,
            'last_name': this.state.lastName,
            'mobile_number':this.state.contact,
            
        })
        Alert.alert("Profile Updated Successfully");
    }

    componentDidMounting(){
     this.getUserDetails
    }
    render(){
        return(
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}> 
                <MyHeader 
                title='Settings' navigation={this.props.navigation}> 
                </MyHeader>
                <View style={{flex:1,width:'100%',alignItems:'center'}}> 
                <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={20}
          onChangeText={(text)=>{
            this.setState({
              firstName: text

            })
          }
        
        }
        value={this.state.firstName}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
          value={this.state.lastName}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
          value={this.state.contact}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          value={this.state.address}
        />
        
            <TouchableOpacity onPress={()=>{this.updateUserDetails}}>
            <Text> Save</Text>
            </TouchableOpacity>
        
       
         
        </View>
        </View>
        )
    }
}