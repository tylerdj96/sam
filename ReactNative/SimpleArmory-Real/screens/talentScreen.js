import React from 'react';
import {StyleSheet, View, Image, Picker, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../services/redux/primary';
import { DrawerActions } from 'react-navigation-drawer';
import {
    Button,
    Text, Container,
    Body, Header, Icon, Left, Right, Content, Spinner
} from 'native-base';
import {ListItem} from "react-native-elements";

class talentScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            specNumber: 0,
            specName: ""
        }
    }


    talentListMapper = () =>{
        var talent_list = [];

        for (var talentNum in this.props.talents){
            if(this.props.talents[talentNum].spec !== undefined && this.props.talents[talentNum].talents.length != 0) {
                var temp_object = {key: talentNum, label: this.props.talents[talentNum].spec.name};
                talent_list.push(temp_object);
            }
        }

        return talent_list.map( (x,i) => {
            return( <Picker.Item label={x.label} key={i} value={x.label}  />)} )
    };


    render() {

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
            <Container style={{backgroundColor: 'black'}}>
                <Header>
                    <Left>
                        <Button transparent     onPress = {() => {
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body><Text>Talents</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{justifyItems: 'center'}}>
                    <Picker
                        selectedValue={this.state.specName}
                        onValueChange={(itemValue, itemPosition) => this.setState({specNumber: itemPosition, specName: itemValue})}
                        itemStyle={{color:'white'}}>
                        {this.talentListMapper()}
                    </Picker>
                    <Image style={{alignItems: 'center', width: 112, height: 112}} source={{uri: 'https://wow.zamimg.com/images/wow/icons/large/' + this.props.talents[this.state.specNumber].spec.icon + '.jpg'}}/>
                    <Text style={{alignItems: 'center', color: 'white', fontWeight: 'bold'}}>{this.props.talents[this.state.specNumber].spec.name}</Text>
                    <FlatList
                        data={this.props.talents[this.state.specNumber].talents}
                        renderItem={({ item, index }) => (

                            <ListItem
                                title={item.spell.name}
                                hideChevron={true}
                                titleStyle={{ alignItems: 'center', justifyContent:'center', color: 'white'}}
                                containerStyle={{ alignItems: 'center', justifyContent:'center'}}
                                onPress={() => Linking.openURL('https://www.wowhead.com/spell='+this.props.talents[this.state.specNumber].talents[index].spell.id)}
                                avatar={{ uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.spell.icon +'.jpg' }}
                            />
                        )}
                    />
                </Content>

            </Container>
        );

    }

}

export default connect(mapStateToProps)(talentScreen)



