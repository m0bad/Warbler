import { SET_CURRENT_USER } from '../actionTypes';

const DEFAUL_STATE = {
    isAuthenticated: false,
    user: {}
};

export default (state = DEFAUL_STATE, action) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                // turn empty objects into false or if there are keys ,true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;
    }
}
