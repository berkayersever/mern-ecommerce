const initialState = {                                  // Define your initialState that will be used for the reducer.
    user: null
};

const LOGIN = "LOGIN";                                  // Define your action types.
const LOGOUT = "LOGOUT";

export default (state = initialState, action) => {      // When doing a default export with a reducer which is essentially a function with a state and action argument, with the state default set to initialState.
    switch (action.type) {                              // Do a switch statement on the action.type, and set the state base on the action's type
        case LOGIN:                                     // Have the login action type that will set the initialState user property to the action's payload.
            return {...state, user: action.payload};    // Use the spread to pass in the values of the initialState, and set the new property user.
        case LOGOUT:                                    // Have the logout action type that will set the initialState user property to null when user's logs out.
            return {...state, user: null};              // Use the spread to pass in the values of the initialState, and set the new property user to it's default value(null).
        default:                                        // If there is not action type return the state by default.
            return state;
    }
}

export const login = (userInfo) => {                    // Export the function that will login the user to it's initialState.
    return {
        type: LOGIN,
        payload: userInfo
    }
};

export const logout = () => {                           // Export the function that will logs the user out from state.
    return {
        type: LOGOUT
    }
};