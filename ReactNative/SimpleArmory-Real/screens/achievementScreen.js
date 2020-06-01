import React from 'react';
import {StyleSheet, View, Image, Picker, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {updateRealm, updatePVP, updateVisible, updateRealmList, updateIsLoading, updateIsError, updateThumbnail, updateImages, updateMounts, updateAchievementPoints, updateFeed} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';
import { DrawerActions } from 'react-navigation-drawer';
import {
    Button,
    Text, Container,
    Body, Header, Icon, Left, Right, Content, Spinner
} from 'native-base';
import {ListItem} from "react-native-elements";
import ModalFilterPicker from "react-native-modal-filter-picker";



class achievementScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={

        }
    }


    onPress = () => {
        //build this to link achievements to whats displayed
    };


    render() {

        //console.log('The props achievement points are: ' + this.props.achievementPoints);
        //console.log('The feed first field was: ' + this.props.feed[0].type);


        //console.log('The state achievement points are: ' + this.state.achievementPoints);

        var recentFeed = [];

        for(var i = 0; i < 10; i++){
            var addedObject = {};
            console.log('The type is: ' + this.props.feed[i].type);

            if(this.props.feed[i].type === 'ACHIEVEMENT'){
                addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].achievement.title};
            }
            else if(this.props.feed[i].type === 'LOOT'){
                addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].itemId};
            }
            else if(this.props.feed[i].type === 'CRITERIA'){
                addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].achievement.title};
            }
            else if(this.props.feed[i].type === 'BOSSKILL'){
                addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].achievement.title};
            }
/*             switch(this.props.feed[i].type){
                case('ACHIEVEMENT'):
                    addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].achievement.title}
                
                case('LOOT'):
                    addedObject = {key: this.props.feed[i].type + i, label: this.props.feed[i].itemid};

                case('CRITERIA'):
                    addedObject = {key: this.props.feed[i].type + i, label: i}//this.props.feed[i].achievement.title};

                case('BOSSKILL'):
                    addedObject = {key: this.props.feed[i].type + i, label: i}//this.props.feed[i].achievement.title};
 
            
            } */

            recentFeed.push(addedObject);
        }

        //console.log('Recent Feed object is:' + recentFeed[0]);


        if(this.props.isLoading){
            return(
                <Container style={{backgroundColor: '#000000'}}>
                    <Header />
                    <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color = 'white'/>
                    </Content>
                </Container>
            )
        }


        return(
            <Container>
                <Header>
                    <Left>
                        <Button transparent     onPress = {() => {
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body><Text>Achievement Points</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                    <Content>
                        <View>
                            <Text style={{color: 'black', fontWeight: 'bold'}}>
                            {`Total Achievement Points for ${this.props.character.name}: ${this.props.achievementPoints}
                            
                            RECENT ACTIVITY: 
                            `}
                            
                            </Text>
                            <FlatList
                                data={recentFeed}
                                renderItem={({item}) => <Text style={styles.item}>{item.key}:{item.label}</Text>}
                            />
                        </View>
                    </Content>


            </Container>
        );

    }

    onShow = () => {
        updateVisible(true);
    };


    onCancel = () => {
        updateVisible(false);
    }

}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 14,
      height: 34,
    },
  })

export default connect(mapStateToProps)(achievementScreen)



