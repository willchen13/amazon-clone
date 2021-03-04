export const initialState = {
    cart:[],
};

//selector-getCartTotal

export const getCartTotal = (cart) => (
    cart?.reduce((amount, item) => amount + item.price, 0)
);

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart,action.item],
            };
        default:
            return state;
    }
}

export default reducer;