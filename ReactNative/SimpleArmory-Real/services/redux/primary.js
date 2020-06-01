import {createStore} from 'redux'
import {reducer} from './reducers'

export const initialState = {
    character: {
        name: "",
        race: "",
        level: "",
        class: "",
        totalHonorableKills: "",
    },
    thumbnail: "",
    realm: "Select a realm!",
    realmList: [],
    PVP: {
        twos : {},
        rbgs : {},
        threes : {},
        
    },
    mounts: {
        numCollected: "",
        numNotCollected: "",
        collected: []
    },
    talents: [

    ],
    achievementPoints: "",
    mountMasterList: [],
    feed: [],
    images: [],
    isLoading: true,
    isError: false,
    visible: false,
    token: "",
};

export function mapStateToProps(state){
    return{
        realm: state.realm,
        character: state.character,
        visible: state.visible,
        realmList: state.realmList,
        isLoading: state.isLoading,
        isError: state.isError,
        PVP: state.PVP,
        thumbnail: state.thumbnail,
        images: state.images,
        test: state.test,
        mounts: state.mounts,
        talents: state.talents,
        achievementPoints: state.achievementPoints,
        feed: state.feed,
        mountMasterList: state.mountMasterList,
        token: state.token
    }
}

export const store = createStore(reducer);