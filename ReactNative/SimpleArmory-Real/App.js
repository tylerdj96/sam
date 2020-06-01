import React from "react"
import {View, Text} from 'react-native'
import {Stack, Drawer, pvpTabs} from "./services/navigators.js"
import {Provider} from "react-redux"
import {store} from './services/redux/primary'

export default class app extends React.Component{

    render(){
        return(
            <Provider store={store}>
            <Stack/>
            </Provider>
        )
    }

}
