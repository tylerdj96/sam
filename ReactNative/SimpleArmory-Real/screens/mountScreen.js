import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../services/redux/primary';
import {updateIsLoading} from '../services/redux/actionCreators';
import { ListItem } from 'react-native-elements'
import {Body, Button, Header, Icon, Left, Right, Container, Content} from "native-base";



var rarityDict = {1: "Common", 2: "Uncommon", 3: "Rare", 4: "Epic"};

class mountScreen extends React.Component {

    constructor(props){
        super(props);
    }


    componentDidMount(){
        updateIsLoading(true);
        updateIsLoading(false);
    }

    render() {

        console.log(this.props.mounts.collected);

        if(this.props.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Updating...</Text>
                </View>
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
                <Body><Text>Mounts</Text></Body>
                <Right>
                    <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                        <Icon name='menu'/>
                    </Button>
                </Right>
            </Header>
                <Content style={{backgroundColor: '#000000'}}>
                <FlatList
                    data={this.props.mounts.collected}
                    renderItem={({ item }) => (

                        <ListItem
                        title={`${item.name}`}
                        subtitle={rarityDict[item.qualityId]}
                        avatar={{ uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg' }}
                        />
                    )}
                />
                </Content>
            </Container>
        );
    }

}

export default connect(mapStateToProps)(mountScreen)


// <View>
// <Image style={{width: 56, height: 56}}
// source={{uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg'}}/>
// <Text>{item.name}</Text>
// </View>
