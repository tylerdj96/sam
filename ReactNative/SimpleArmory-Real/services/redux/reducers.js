import {initialState} from './primary';
import * as ACTIONS from './actionCreators';

export function reducer(state=initialState, action){
    switch(action.type){
        case 'UPDATE_CHAR':
            return{
                ...state,
                character: {
                name: action.value.name,
                race: action.value.race,
                level: action.value.level,
                class: action.value.class,
                totalHonorableKills: action.value.totalHonorableKills
                }
            };
        case 'UPDATE_REALM':
            return{
                ...state,
                realm: action.value
            };
        case 'UPDATE_REALM_LIST':
            return{
                ...state,
                realmList: action.value
            };    
        case 'UPDATE_PVP':
            return{
                ...state,
                PVP: {
                    twos: action.value.pvp.brackets.ARENA_BRACKET_2v2,
                    threes: action.value.pvp.brackets.ARENA_BRACKET_3v3,
                    rbgs: action.value.pvp.brackets.ARENA_BRACKET_RBG
                }    
            }; 
        case 'LOADING':
            return{
                ...state,
                isLoading: action.value
            };
        case 'TEST':
            return{
                ...state,
                test: action.value
            };
        case 'ERROR':
            return{
                ...state,
                isError: action.value
            };
        case 'VISIBLE':
            return{
                ...state,
                visible: action.value
            };
        case 'THUMBNAIL':
            return{
                ...state,
                thumbnail: action.value
            };
        case 'IMAGES':
            return{
                ...state,
                images: action.value
            };
        case 'MOUNTS':
            return{
                ...state,
                mounts: {
                    collected: action.value.mounts.collected,
                    numCollected: action.value.mounts.numCollected,
                    numNotCollected: action.value.mounts.numNotCollected
                }
            };

        case 'TALENTS':
            return{
                ...state,
                talents: action.value.talents

            };

        case 'ACHIEVEMENTPOINTS':
            return{
                ...state,
                achievementPoints: action.value.achievementPoints
            };

        case 'FEED':
            return{
                ...state,
                feed: action.value.feed
            };

        case 'MOUNTMASTERLIST':
            return{
                ...state,
                mountMasterList: action.value.list
            };
        case 'TOKEN':
            return{
                ...state,
                token: action.value.access_token
            };
        default:
            return state;
    }
}