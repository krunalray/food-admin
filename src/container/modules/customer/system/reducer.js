import {
  GET_COUNTRIES,
  GET_ALL_STATES,
  GET_COUNTRY_STATE,
  GET_SUBSCRIBER_LIST,
  GET_SUBSCRIBER_TOTAL,
  GET_CUSTOMER_TOTAL,
  GET_CUSTOMER_LIST,
  GET_CUSTOMER_TAGS,
  GET_CUSTOMER_ORDER,
  GET_CUSTOMER_ADDRESS,
  GET_CUSTOMER_REWARD_HISTORY,
  GET_CUSTOMER_TRANSACTION_HISTORY,
  GET_CUSTOMER_PROFILE,
  GET_WALLET,
  GET_WALLET_TOTAL,
  GET_REWARD,
  GET_REWARD_TOTAL,
  GET_CUSTOMER_ORDERS,
  GET_TOTAL_CUSTOMER_ORDERS
} from './action';

const INITIAL_STATE =  {};

const customerReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return { ...state, countries: action.payload.data }
    case GET_ALL_STATES:
      return { ...state, zone_list: action.payload.data }
    case GET_COUNTRY_STATE:
      return { ...state, state: action.payload.data }
    case GET_CUSTOMER_ORDERS:
      return { ...state, customer_order_list: action.payload.data }
    case GET_TOTAL_CUSTOMER_ORDERS:
      return { ...state, customer_order_total: action.payload.data.total }
    case GET_REWARD:
      return { ...state, reward: action.payload.data }
    case GET_REWARD_TOTAL:
      return { ...state, reward_total: action.payload.data.total }
    case GET_WALLET:
      return { ...state, customer_transaction_history: action.payload.data }
    case GET_WALLET_TOTAL:
      return { ...state, wallet_total: action.payload.data.total }
    case GET_CUSTOMER_PROFILE:
      return { ...state, profile: action.payload.data}
    case GET_CUSTOMER_TRANSACTION_HISTORY:
      return { ...state, customer_transaction_history: action.payload.data }
    case GET_CUSTOMER_REWARD_HISTORY:
      return { ...state, customer_reward_history: action.payload.data }
    case GET_CUSTOMER_ADDRESS:
      return { ...state, addresses: action.payload.data }
    case GET_CUSTOMER_ORDER:
      return { ...state, order_info: action.payload.data}
    case GET_CUSTOMER_TAGS:
      return { ...state, customer_tag_list: action.payload.data }
    case GET_CUSTOMER_LIST:
      return { ...state, customer_list: action.payload.data }
    case GET_CUSTOMER_TOTAL:
      return { ...state, customer_total: action.payload.data.total }
    case GET_SUBSCRIBER_LIST:
      return { ...state, subscriber_list: action.payload.data }
    case GET_SUBSCRIBER_TOTAL:
      return { ...state, subscriber_total: action.payload.data.total }
    default:
      return state;
  }
}

export default customerReducer;
