import React from 'react';
import {FlatList, StyleSheet, Text, View, Image, Picker} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../services/redux/primary';
import {updateIsLoading} from '../services/redux/actionCreators';
import { ListItem } from 'react-native-elements'
import {Body, Button, Header, Icon, Left, Right, Container, Content} from "native-base";
import GridView from 'react-native-super-grid';
import {mountMasterList} from "../assets/collectables";
import { SuperGridSectionList } from 'react-native-super-grid';

var rarityDict = {1: "Common", 2: "Uncommon", 3: "Rare", 4: "Epic"};


class mountGridScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            categoryNumber: 0,
            categoryName: ""
        }
    }

    talentListMapper = () =>{
        var category_list = [];

        for (var category in mountMasterList){
                var temp_object = {key: category, label: mountMasterList[category].name};
                category_list.push(temp_object);
        }

        return category_list.map( (x,i) => {
            return( <Picker.Item label={x.label} key={i} value={x.label}  />)} )
    };


    gridMapper = (index) =>{

        var sectionList = [];

        for (var subCat in mountMasterList[index].subcats){
            var section = {title: '', data:[]};
            for(var mounts in mountMasterList[index].subcats[subCat].items) {
                var tempMountEntry = {icon: mountMasterList[index].subcats[subCat].items[mounts].icon};
                section.data.push(tempMountEntry);
            }
            section.title = mountMasterList[index].subcats[subCat].name;
            sectionList.push(section);
        }


        return sectionList;
    };

    render() {

        return (
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
                <Content>
                <Picker
                    selectedValue={this.state.categoryName}
                    onValueChange={(itemValue, itemPosition) => this.setState({categoryNumber: itemPosition, categoryName: itemValue})}
                    itemStyle={{color:'white'}}>
                    {this.talentListMapper()}
                </Picker>
            <SuperGridSectionList
                itemDimension={50}
                sections={this.gridMapper(this.state.categoryNumber)}
                style={styles.gridView}
                renderItem={({ item }) => (
                    <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                        <Image
                        style={{width: 50, height: 50, opacity: 1}}
                        source={{uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg'}}
                        />
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <Text style={{ color: 'green' }}>{section.title}</Text>
                )}
            />
                </Content>
            </Container>

        );
    }

}

const styles = StyleSheet.create({
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 50,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});

export default connect(mapStateToProps)(mountGridScreen)


// <View>
// <Image style={{width: 56, height: 56}}
// source={{uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg'}}/>
// <Text>{item.name}</Text>
// </View>
