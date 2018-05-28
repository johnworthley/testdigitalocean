import axios from 'axios';
import { apiBaseURL } from './../Utils/Constants';
import {
    FETCHING_COIN_DATA,
    FETCHING_COIN_DATA_SUCCESS,
    FETCHING_COIN_DATA_FAIL
} from './../Utils/ActionTypes';


export default function FetchCoinData() {
    return dispatch => {

        dispatch({ type: FETCHING_COIN_DATA })

        var result = []
        var data_array = []

         axios.get(`${apiBaseURL}/v1/ticker/wanchain`)
            .then(res => result[0] = res.data[0])
            .then(()  => axios.get(`${apiBaseURL}/v1/ticker/bitcoin`))
            .then(res => result[1] = res.data[0])
            .then(() => dispatch({ type: FETCHING_COIN_DATA_SUCCESS, payload: result })) 
            .catch(err => {
                dispatch({ type: FETCHING_COIN_DATA_FAIL, payload: err.data })
            });
    }
}