import {store} from './primary'

export function updateCharacter(value){
    const action = {
        type: 'UPDATE_CHAR',
        value
    };
    store.dispatch(action);
}
export function updateRealm(value){
    const action = {
        type: 'UPDATE_REALM',
        value
    };
    store.dispatch(action);
}
export function updateRealmList(value){
    const action = {
        type: 'UPDATE_REALM_LIST',
        value
    };
    store.dispatch(action);
}
export function updatePVP(value){
    const action = {
        type: 'UPDATE_PVP',
        value
    };
    store.dispatch(action);
}
export function updateImages(value){
    const action = {
        type: 'IMAGES',
        value
    };
    store.dispatch(action);
}
export function updateVisible(value){
    const action = {
        type: 'VISIBLE',
        value
    };
    store.dispatch(action);
}
export function updateIsLoading(value){
    const action = {
        type: 'LOADING',
        value
    };
    store.dispatch(action);
}
export function updateIsError(value){
    const action = {
        type: 'ERROR',
        value
    };
    store.dispatch(action);
}

export function updateThumbnail(value){
    const action ={
        type: 'THUMBNAIL',
        value
    };
    store.dispatch(action);
}

export function updateMounts(value){
    const action = {
        type: 'MOUNTS',
        value
    };
    store.dispatch(action);
}

export function updateTalents(value){
    const action = {
        type: 'TALENTS',
        value
    };
    store.dispatch(action);
}

export function updateAchievementPoints(value){
    const action = {
        type: 'ACHIEVEMENTPOINTS',
        value
    }
    store.dispatch(action);
}

export function updateFeed(value){
    const action = {
        type: 'FEED',
        value
    }
    store.dispatch(action);
}

export function updateMountMasterList(value){
    const action = {
        type: 'MOUNTMASTERLIST',
        value
    }
    store.dispatch(action);
}

export function updateToken(value){
    const action = {
        type: 'TOKEN',
        value
    }
    store.dispatch(action);
}

export function updateTest(value){
    const action ={
        type: 'TEST',
        value
    };
    store.dispatch(action);
}