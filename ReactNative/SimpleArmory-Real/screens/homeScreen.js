import React from "react";
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import ModalFilterPicker from "react-native-modal-filter-picker";
import {connect} from 'react-redux';
import {
    updateCharacter,
    updateRealm,
    updateVisible,
    updateRealmList,
    updateIsError, updateToken, updateMountMasterList
} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';
import {Button, Icon, Text, Item, Input, Content, Header} from 'native-base'
import {decode as atob, encode as btoa} from 'base-64'
import {mountMasterList} from "../assets/collectables";

class HomeScreen extends React.Component {

    constructor(props, ctx){
        super(props, ctx);
        this.state = {foobar: {}};
    }

    realmListMapper = () =>{
        var usable_list = [];

        for (var realm in this.props.realmList){
            var temp_object = {key: this.props.realmList[realm].name, label: this.props.realmList[realm].name};
            usable_list.push(temp_object);
        }
        return usable_list;
    };

    async componentDidMount(){
            await fetch('https://us.battle.net/oauth/token',{
                method: 'POST',
                headers: {
                    'Authorization': 'Basic '+btoa('c22ce62fd8f6467bb9656f2fa971ac35:t8ocjIix6LC8mwBfyHSoc3gKAGwMns8E'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    updateToken(responseJson);

                })
                .catch((error) => {
                    console.error(error);
                });

            return await this.fetchRealms(this.props.token);
    }

    async fetchRealms(token){
        return await fetch('https://us.api.blizzard.com/wow/realm/status?locale=en_US&access_token='+token,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                updateRealmList(responseJson.realms);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //REDUX
    onPressMe = () => {
        updateIsError(false);
        this.props.navigation.navigate('Drawer')
    };

    render() {
        const { visible} = this.props.visible;



        return (
            <Content style={{backgroundColor: '#000000'}}>
                <Header/>
                <Text style={{alignSelf: 'center', fontStyle: 'italic', color: 'white', padding: 50}}>Welcome to Simple Armory Mobile!</Text>
                <Button iconRight info onPress={this.onShow} style = {{padding: 10, alignSelf:'center'}}>
                    <Text>{this.props.realm}</Text>
                    <Icon name='globe'/>
                </Button>
                <ModalFilterPicker
                    visible={this.props.visible}
                    onSelect={this.onSelect}
                    onCancel={this.onCancel}
                    options={this.realmListMapper()}
                    />
                <Item rounded>
                    <Input placeholder="Character Name" placeholderTextColor = '#ffffff66' clearTextOnFocus={true} onChangeText={(characterName) => updateCharacter({name:characterName, race: "", level: "", class: "", totalHonorableKills: ""})} style = {{alignSelf:'center', textAlign: 'center', padding: 10, color: 'white'}}/>
                </Item>
                <Button iconRight success onPress={this.onPressMe} style = {{padding: 10, alignSelf:'center'}}>
                    <Text>Go</Text>
                    <Icon name='ios-search'/>
                </Button>
                <Text style = {[styles.noError, this.props.isError && styles.error]}>Invalid Search. Please Try Again.</Text>

                <Text>{this.props.realm}+{this.props.character.name}</Text>
            </Content>
        );
    }

    onShow = () => {
        updateVisible(true);
    };

    onSelect = (realm) => {
        updateRealm(realm);
        updateVisible(false);
    };


    onCancel = () => {
        updateVisible(false);
    }

}


export default connect(mapStateToProps)(HomeScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    noError: {
        color: '#000000',
    },
    error:{
        color: 'red',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        padding: 25

    }
});