import { CREATE_ORDER, REMOVE_ORDER, UPDATE_ORDER } from '../constants/order';

const DEFAULT_STATE = {
    orders: []
};

export default function orderReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case CREATE_ORDER:
            return {
                ...state,
                orders: [...state.orders, action.data]
            };
        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order, idx) => {
                    return idx !== action.data;
                })
            };
        case UPDATE_ORDER:
            return {
                ...state,
                orders: state.orders.map((order, idx) => {
                    if (idx !== action.data.id) return order;

                    return {
                        ...order,
                        ...action.data.updatedOrder
                    };
                })
            };
        default:
            return state;
    }
}
