import { auth } from "../firebase";

export const initialState = {
    cart:[],
    user: null,
};

//selector-getCartTotal

export const getCartTotal = (cart) => (
    cart?.reduce((amount, item) => amount + item.price, 0)
);

const reducer = (state, action) => {

    // console.log('action is', action);

    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart,action.item],
            };
        case "REMOVE_FROM_CART":
            const index = state.cart.findIndex(cartItem => cartItem.id === action.id)
            let newCart = [...state.cart];
            //if index is greater than 0 than it exists remove it from the basket.
            console.log('index is', index);
            if(index > -1) {
                newCart.splice(index, 1);
            } else {
                //if index doesnt exist than error message
                console.warn(`cant remove product with id${action.id} as its not in the cart`)
            }

            return {
                ...state,
                cart: newCart
            };
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
        case "EMPTY_CART":
            return {
                ...state,
                cart:[]
            }
        default:
            return state;
    }
}

export default reducer;