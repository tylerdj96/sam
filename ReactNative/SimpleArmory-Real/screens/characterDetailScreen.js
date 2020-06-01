import React from 'react';
import { StyleSheet, View, Image, Picker } from 'react-native';
import {Drawer} from "../services/navigators.js"
import {connect} from 'react-redux';
import {updateCharacter, updateRealm, updatePVP, updateVisible, updateRealmList, updateIsLoading, updateIsError, updateThumbnail, updateImages, updateMounts, updateTalents, updateAchievementPoints, updateFeed} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';
// import {Icon} from "../services/navigators";
import { DrawerActions } from 'react-navigation-drawer';
import {
    Button,
    Text, Container,
    Body, Header, Icon, Left, Right, Content, Spinner
} from 'native-base';

var raceDict = {

    1: "Human",
    2: "Orc",
    3: "Dwarf",
    4: "Night Elf",
    5: "Undead",
    6: "Tauren",
    7: "Gnome",
    8: "Troll",
    9: "Goblin",
    10: "Blood Elf",
    11: "Draenei",
    12: "Fel Orc",
    13: "Naga",
    14: "Broken",
    15: "Skeleton",
    16: "Vrykul",
    17: "Tuskarr",
    18: "Forest Troll",
    19: "Taunka",
    20: "Northrend Skeleton",
    21: "Ice Troll",
    22: "Worgen",
    23: "Gilnean",
    24: "Pandaren",
    25: "Pandaren",
    26: "Pandaren",
    27: "Nightborne",
    28: "Highmountain Tauren",
    29: "Void Elf",
    30: "Lightforged Draenei",
    31: "Zandalari Troll",
    32: "Kul Tiran",
    33: "Human",
    34: "Dark Iron Dwarf",
    35: "Vulpera",
    36: "Mag'har Orc",
};
var classDict = {
    1: "Warrior",
    2: "Paladin",
    3: "Hunter",
    4: "Rogue",
    5: "Priest",
    6: "Death Knight",
    7: "Shaman",
    8: "Mage",
    9: "Warlock",
    10: "Monk",
    11: "Druid",
    12: "Demon Hunter",
};

function organizeTalents(talentList) {
    talentList.sort(function(a,b){
        return a.tier-b.tier
    })
}

class characterDetailScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={

             class : "",
             race : "",

       }
    }


    async componentDidMount(){
        console.log("!"+this.props.token);
        console.log(this.props.realm);
        console.log(this.props.character.name);
        const characterURI = 'https://us.api.blizzard.com/wow/character/'+this.props.realm+'/'+this.props.character.name+'?fields=pvp%2Ctalents%2Cmounts%2Cachievements%2Cfeed&locale=en_US&access_token='+this.props.token;

        updateIsLoading(true);
        console.log(characterURI);
        const response = await this.dataCall(characterURI);

    }



    dataCall = async (characterURI) => {
        let response = await fetch(characterURI,{
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log(response);
        let responseStatus = await response.ok;
        if (responseStatus) {

            updateIsError(false);

            let parsedJson = await response.json();

            var thumbnail_replacer = parsedJson.thumbnail;
            thumbnail_replacer = thumbnail_replacer.replace("avatar", "main");
            updateThumbnail(thumbnail_replacer);
            console.log(this.props.thumbnail);

            updateCharacter(parsedJson);
            updateMounts(parsedJson);
            updatePVP(parsedJson);

            // const localDBURI = 'http://192.168.50.148:4501/SendPlayerData?PlayerName=' + this.props.character.name + '&ServerName=' + this.props.realm + '&twos=' + this.props.PVP.twos.rating + '&threes=' + this.props.PVP.threes.rating;
            //
            // console.log(localDBURI);
            //
            // await fetch(localDBURI);

            //API call almost always, if not always, returns talents out of order, so we need to order them /shrug
            for(var i=0; i<parsedJson.talents.length; i++){
                if(parsedJson.talents[i].talents !== undefined && parsedJson.talents[i].talents.length > 0){
                    organizeTalents(parsedJson.talents[i].talents);
                }
            }

            updateTalents(parsedJson);

            updateAchievementPoints(parsedJson);
            
            updateFeed(parsedJson);


            var images = [];
            var image1 = require('../assets/UI_RankedPvP_01.png');
            var image2 = require('../assets/UI_RankedPvP_02.png');
            var image3 = require('../assets/UI_RankedPvP_03.png');
            var image4 = require('../assets/UI_RankedPvP_04.png');
            var image5 = require('../assets/UI_RankedPvP_05.png');
            var image6 = require('../assets/UI_RankedPvP_06.png');
            var image7 = require('../assets/UI_RankedPvP_07.png');

            images.push(image1);
            images.push(image2);
            images.push(image3);
            images.push(image4);
            images.push(image5);
            images.push(image6);
            images.push(image7);

            updateImages(images);
        }
        else{
            
            updateIsLoading(false);
            updateIsError(true);
        }

        //Change ID's to human readable text

        this.setState({race:raceDict[this.props.character.race]});
        this.setState({class:classDict[this.props.character.class]});

        updateIsLoading(false);

    };


    render() {

        if(this.props.isLoading){
            return(
                <Container style={{backgroundColor: '#000000'}}>
                    <Header>
                    <Left>
                        <Button transparent     onPress = {() => {
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    </Header>
                    <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color = 'white'/>
                    </Content>
                </Container>
            )
        }

        else if(this.props.isError){
            this.props.navigation.navigate('Home');
        }


        return(
            <Container style={{backgroundColor: '#000000'}}>
                <Header>
                    <Left>
                        <Button transparent     onPress = {() => {
                        this.props.navigation.navigate('Home')
                    }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body><Text>Character Details</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: '#FFFFFF'}}>{this.props.character.name} </Text>
                <Text style={{color: '#FFFFFF'}}>Level {this.props.character.level} {this.state.race} {this.state.class}</Text>
                <Text style={{color: '#FFFFFF'}}>{this.props.realm}</Text>
                <Image
                    style={{width: 400, height: 600}}
                    source={{uri: 'http://render-us.worldofwarcraft.com/character/' + this.props.thumbnail}}
                />
                </Content>

            </Container>
        );

    }

}

export default connect(mapStateToProps)(characterDetailScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    tabbar: {
        backgroundColor: '#222',
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {
        backgroundColor: '#ffeb3b',
    },
    label: {
        color: '#fff',
        fontWeight: '400',
    },
});


