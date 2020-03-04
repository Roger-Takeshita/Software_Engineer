import { CREATE_ORDER, REMOVE_ORDER, UPDATE_ORDER } from '../constants/order';

export function createNewOrder(productName, quantity) {
    return {
        type: CREATE_ORDER,
        data: {
            productName,
            quantity,
            status: 'pending'
        }
    };
}

export const removeOrder = id => ({
    type: REMOVE_ORDER,
    data: id
});

export const updateOrder = (id, updatedOrder) => ({
    type: UPDATE_ORDER,
    data: {
        id,
        updatedOrder
    }
});
