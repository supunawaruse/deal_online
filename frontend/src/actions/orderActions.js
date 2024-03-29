import {ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_CREATE_RESET,ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS} from '../constants/orderConstants'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
    
    
    try {
        dispatch({ 
             type:ORDER_CREATE_REQUEST
         })


         const {data} = await axios.post(`/api/orders`,order,{
            headers: { 
                'Content-Type':'application/json',
                Authorization: `Bearer ${getState().userLogin.userInfo.data.token}`
            }
          })

         dispatch({
             type:ORDER_CREATE_SUCCESS,
             payload:data
         })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const resetOrder = () => async (dispatch) => {

    try {
        dispatch({ 
             type:ORDER_CREATE_REQUEST
         })

         dispatch({
             type:ORDER_CREATE_RESET,
             payload:{}
         })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    
    
    try {
        dispatch({ 
             type:ORDER_DETAILS_REQUEST
         })


         const {data} = await axios.get(`/api/orders/${id}`,{
            headers: { 
                Authorization: `Bearer ${getState().userLogin.userInfo.data.token}`
            }
          })

         dispatch({
             type:ORDER_DETAILS_SUCCESS,
             payload:data
         })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const payOrder = (orderId,paymentResult) => async (dispatch, getState) => {
    
    
    try {
        dispatch({ 
             type:ORDER_PAY_REQUEST
         })


         const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,{
            headers: { 
                'Content-Type':'application/json ',
                Authorization: `Bearer ${getState().userLogin.userInfo.data.token}`
            }
          })

         dispatch({
             type:ORDER_PAY_SUCCESS,
             payload:data
         })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



export const listMyOrders = () => async (dispatch, getState) => {
    
    
    try {
        dispatch({ 
             type:ORDER_LIST_MY_REQUEST
         })


         const {data} = await axios.get(`/api/orders/myorders`,{
            headers: { 
                Authorization: `Bearer ${getState().userLogin.userInfo.data.token}`
            }
          })
 
         dispatch({
             type:ORDER_LIST_MY_SUCCESS,
             payload:data
         })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}



export const listOrders = () => async (dispatch, getState) => {
    
    try {
        dispatch({ 
             type:ORDER_LIST_REQUEST
         })


         const {data} = await axios.get(`/api/orders`,{
            headers: { 
                Authorization: `Bearer ${getState().userLogin.userInfo.data.token}`
            }
          })
 
         dispatch({
             type:ORDER_LIST_SUCCESS,
             payload:data
         })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


