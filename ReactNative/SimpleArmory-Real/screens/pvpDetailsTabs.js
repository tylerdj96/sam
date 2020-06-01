import React from 'react';
import {StyleSheet, View, Image } from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../services/redux/primary';
import {updateIsLoading} from '../services/redux/actionCreators';
import {
    Button,
    Text, Container,
    Body, Header, Icon, Left, Right, Content
} from 'native-base';

const determine_icon = (rating) => {
    if(rating==0){
        return 1;
    }
    else if(rating>=1 && rating <=1400){
        return 2;
    }
    else if(rating>1375 && rating <=1600){
        return 3;
    }
    else if(rating>1575 && rating <=1800){
        return 4;
    }
    else if(rating>1775 && rating <=2100){
        return 5;
    }
    else if(rating>2075 && rating <=2400){
        return 6;
    }
    else if(rating>2375){
        return 7;
    }
};

const renderScene = ( rating, image_array ) => {
    var image_info = {pvpimage: null, icon_text: ""};
    switch(determine_icon(rating)){
        case 1:
            image_info.pvpimage = image_array[0];
            image_info.icon_text = "No Data";
            return image_info;
        case 2:
            image_info.pvpimage = image_array[1];
            image_info.icon_text = "Unranked";
            return image_info;
        case 3:
            image_info.pvpimage = image_array[2];
            image_info.icon_text = "Combatant";
            return image_info;
        case 4:
            image_info.pvpimage = image_array[3];
            image_info.icon_text = "Challenger";
            return image_info;
        case 5:
            image_info.pvpimage = image_array[4];
            image_info.icon_text = "Rival";
            return image_info;
        case 6:
            image_info.pvpimage = image_array[5];
            image_info.icon_text = "Duelist";
            return image_info;
        case 7:
            image_info.pvpimage = image_array[6];
            image_info.icon_text = "Gladiator";
            return image_info;
    }
};

class twosTab extends React.Component {

   constructor(props){
      super(props);
           this.state ={
            image_info : {pvpimage: "", icon_text: ""}
        }
   }

  componentDidMount(){
    
        updateIsLoading(true);
        updateIsLoading(false);

    };

    render() {

        this.state.image_info = renderScene(this.props.PVP.twos.rating, this.props.images);

        if(this.props.isLoading){
            return(
                <View>
                <Text>Loading...</Text>
                </View>

            );
        }

        else{

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
                <Body><Text>PvP</Text></Body>
                <Right>
                    <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                        <Icon name='menu'/>
                    </Button>
                </Right>
            </Header>
                <Content contentContainerStyle={{alignItems: 'center', padding: 25}}>
            <Image source={this.state.image_info.pvpimage} style={{width: 250, height: 250}}/>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold'}}>{this.state.image_info.icon_text}</Text>
            <Text style ={{color: '#FFFFFF'}}>Rating: {this.props.PVP.twos.rating}{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Weekly</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.twos.weeklyWon} L: {this.props.PVP.twos.weeklyLost} Total: {this.props.PVP.twos.weeklyPlayed}</Text> 
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.twos.weeklyWon/this.props.PVP.twos.weeklyPlayed)*100).toFixed(2)}%{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Season</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.twos.seasonWon} L: {this.props.PVP.twos.seasonLost} Total: {this.props.PVP.twos.seasonPlayed}</Text>
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.twos.seasonWon/this.props.PVP.twos.seasonPlayed)*100).toFixed(2)}%</Text>
                </Content>
            </Container>
            );
        
        }
        
    }
}

class threesTab extends React.Component{

    constructor(props){
        super(props);
             this.state ={
              image_info : {pvpimage: "", icon_text: ""}
          }
     }
  
    componentDidMount(){
      
          updateIsLoading(true);
          updateIsLoading(false);
  
      };
  
      render() {
  
          this.state.image_info = renderScene(this.props.PVP.threes.rating, this.props.images);
  
          if(this.props.isLoading){
              return(
                  <View>
                  <Text>Loading...</Text>
                  </View>
  
              );
          }
  
          else{
  
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
                    <Body><Text>PvP</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{alignItems: 'center', padding: 25}}>
            <Image source={this.state.image_info.pvpimage} style={{width: 250, height: 250}}/>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold'}}>{this.state.image_info.icon_text}</Text>
            <Text style ={{color: '#FFFFFF'}}>Rating: {this.props.PVP.threes.rating}{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Weekly</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.threes.weeklyWon} L: {this.props.PVP.threes.weeklyLost} Total: {this.props.PVP.threes.weeklyPlayed}</Text>
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.threes.weeklyWon/this.props.PVP.threes.weeklyPlayed)*100).toFixed(2)}%{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Season</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.threes.seasonWon} L: {this.props.PVP.threes.seasonLost} Total: {this.props.PVP.threes.seasonPlayed}</Text>
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.threes.seasonWon/this.props.PVP.threes.seasonPlayed)*100).toFixed(2)}%</Text>
                </Content>
            </Container>
              );
          
          }
          
      }
}

class rbgTab extends React.Component{

    constructor(props){
        super(props);
             this.state ={
              image_info : {pvpimage: "", icon_text: ""}
          }
     }
  
    componentDidMount(){
      
          updateIsLoading(true);
          updateIsLoading(false);
  
      };
  
      render() {
  
          this.state.image_info = renderScene(this.props.PVP.rbgs.rating, this.props.images);
  
          if(this.props.isLoading){
              return(
                  <View>
                  <Text>Loading...</Text>
                  </View>
  
              );
          }
  
          else{
  
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
                    <Body><Text>PvP</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{alignItems: 'center', padding: 25}}>
            <Image source={this.state.image_info.pvpimage} style={{width: 250, height: 250}}/>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold'}}>{this.state.image_info.icon_text}</Text>
            <Text style ={{color: '#FFFFFF'}}>Rating: {this.props.PVP.rbgs.rating}{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Weekly</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.rbgs.weeklyWon} L: {this.props.PVP.rbgs.weeklyLost} Total: {this.props.PVP.rbgs.weeklyPlayed}</Text>
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.rbgs.weeklyWon/this.props.PVP.rbgs.weeklyPlayed)*100).toFixed(2)}%{"\n"}</Text>
            <Text style ={{color: '#FFFFFF', fontWeight: 'bold', textDecorationLine:'underline'}}>Season</Text>
            <Text style ={{color: '#FFFFFF'}}>W: {this.props.PVP.rbgs.seasonWon} L: {this.props.PVP.rbgs.seasonLost} Total: {this.props.PVP.rbgs.seasonPlayed}</Text>
            <Text style = {{color: '#FFFFFF', fontStyle: 'italic'}}>{((this.props.PVP.rbgs.seasonWon/this.props.PVP.rbgs.seasonPlayed)*100).toFixed(2)}%</Text>
                </Content>
            </Container>
              );
          
          }
          
      }
}


//Need this "weird" connect call to enable us to avoid 'export default' on components in this file. Workaround would be to place
// each of the tabs as its own file and export default from that point
const containerCreator = connect(mapStateToProps);

export const twosTabC = containerCreator(twosTab)
export const threesTabC = containerCreator(threesTab);
export const rbgTabC = containerCreator(rbgTab);