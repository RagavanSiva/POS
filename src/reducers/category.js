import { categoryConstants } from "../actions/category/types";

const initialState = {
  loading: true,
  data: [],
};

export default function (state = initialState, action) {
  // switch(action.type){
  //     case GET_CATEGORY:
  //         return {
  //             ...state,
  //             loading: false,
  //             data: action.payload
  //         }
  //     case GET_CATEGORY_ERROR:
  //         return {
  //             ...state,
  //             loading: false,
  //             data: null
  //         }
  //     default:
  //         return state;
  // }

  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.category,
      };
    case categoryConstants.GET_CATEGORY_ERROR:
      return {
        error: action.error,
      };
    case categoryConstants.SAVE_CATEGORY_SUCCESS:
      state.data.push(action.category);
      return {
        ...state,
        loading: false,
      };
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      var foundIndex = state.data.findIndex((x) => x.id == action.category.id);
      state.data[foundIndex]=action.category;
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
