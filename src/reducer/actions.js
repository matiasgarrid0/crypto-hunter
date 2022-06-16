import axios from 'axios'

export const getTrendingCoins = (currency = 'usd') => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=15&page=1&sparkline=false`)
        dispatch({type: 'GET_TREND',payload: res.data})
    } catch (error) {
        console.log(error)
    }
}
export const getAllCoins = (currency = 'usd') => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        dispatch({type: 'GET_ALL',payload: res.data})
    } catch (error) {
        console.log(error)
    }
}
export const getCoin = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
        dispatch({type:'GET_COIN', payload:res.data})
    } catch (error) {
        console.log(error)
    }
}

export const getChart = (id, currency='usd', days = 1) => async (dispatch) => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`)
        dispatch({type: 'GET_CHART', payload: res.data}) 
    } catch (error) {
        console.log(error)
    }
}
 