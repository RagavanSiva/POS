import { productConstants } from "../actions/product/types";

const initialState = {
  loading: true,
  data: [],
  productList:[],
  price:[],
  bill_today:[],
  bill:{},
  summary_details:{
    discount:0,
    total:0,
    serPer:0,
    net_amount:0,
    salesTax:0
  }

};

export default function (state = initialState, action) {


  switch (action.type) {
    case productConstants.GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        data:[]

      };
    case productConstants.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.product,
      };
    case productConstants.GET_PRODUCT_ERROR:
      return {
        error: action.error,
        data:[]
      };
    case productConstants.GET_BILL_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case productConstants.GET_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        data:action.bill
      };
    case productConstants.GET_BILL_ERROR:
      return {
        error: action.error,
      };
    case productConstants.GET_BILL_TODAY_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case productConstants.GET_BILL_TODAY_SUCCESS:
      return {
        ...state,
        loading: false,
        bill_today: action.bill
      };
    case productConstants.GET_BILL_TODAY_ERROR:
      return {
        error: action.error,
      };
    case productConstants.GET_PRICE_REQUEST:
      return {
        ...state,
        loading: true,

      };
    case productConstants.GET_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        price: action.price
      };
    case productConstants.GET_PRICE_ERROR:
      return {
        error: action.error,
      };
    case productConstants.SAVE_PRODUCT_LIST:
      return {
        ...state,
        loading: false,
        productList: action.data,
      };

    case productConstants.SAVE_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        bill: action.bill,


      };
    case productConstants.SAVE_PRODUCT_SUCCESS:
      // this.data.push(action.product)
      return {
        ...state,
        loading: false,



      };
    default:
      return state;
  }
}
