const CREATE_ORDER = 'CREATE_ORDER'; //! Constants - Step 1
const REMOVE_ORDER = 'REMOVE_ORDER'; //! Constants - Step 1
const UPDATE_ORDER = 'UPDATE_ORDER'; //! Constants - Step 1

//+ Actions -------------------------------------- - Step 2 +//
export function createNewOrder(productName, quantity) {
    return {
        type: CREATE_ORDER,
        provider: {
            productName,
            quantity,
            status: 'pending'
        }
    };
}

export const removeOrder = id => ({
    type: REMOVE_ORDER,
    provider: id
});

export const updateOrder = (id, updatedOrder) => ({
    type: UPDATE_ORDER,
    provider: {
        id,
        updatedOrder
    }
});

//- Reducers ------------------------------------- - Step 3 -//
// const DEFAULT_STATE = {
//     orders: []
// };

export default function(state = [], action) {
    switch (action.type) {
        case CREATE_ORDER:
            return [...state, action.provider];
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order, idx) => {
                    return idx !== action.provider;
                })
            };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map((order, idx) => {
                    if (idx !== action.provider.id) return order;

                    return {
                        ...order,
                        ...action.provider.updatedOrder
                    };
                })
            };
        default:
            return state;
    }
}
