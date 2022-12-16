import { categoryService } from "../../_services/categoryService";
import { alertActions } from "../alert/alert.actions";

import { categoryConstants } from "./types";
export const categoryActions = {
  saveCategory,
  getAll,updateCategory
};

// function getCategory() {
//  return async (dispatch) => {
//     try {
//       const res = await axios.get("http://localhost:8080/category");
//       dispatch({
//         type: GET_CATEGORY,
//         payload: res.data,
//       });
//     } catch (err) {
//       dispatch({
//         type: GET_CATEGORY_ERROR,
//         payload: err,
//       });
//     }
//   };
// }
function saveCategory(data) {


  return (dispatch) => {
    dispatch(request(data));

    categoryService.save(data).then(
      (category) => {
        dispatch(success(category));
        // history.push('/login');
        dispatch(alertActions.success("Successfully saved"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.SAVE_CATEGORY_REQUEST };
  }
  function success(category) {
    return { type: categoryConstants.SAVE_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.SAVE_CATEGORY_ERROR, error };
  }
}
function updateCategory(id,data) {


  return (dispatch) => {
    dispatch(request(id,data));
  console.log(id,data)
    categoryService.update(id,data).then(
      (user) => {
        dispatch(success(user));
        // history.push('/login');
        dispatch(alertActions.success("Updated"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: categoryConstants.UPDATE_CATEGORY_REQUEST };
  }
  function success(category) {
    return { type: categoryConstants.UPDATE_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.UPDATE_CATEGORY_ERROR, error };
  }
}

function getAll() {
  console.log("category action call")

  return dispatch => {
    dispatch(request());

    categoryService.getAll().then(
      (category) => {
        dispatch(success(category));
        console.log("category action",category)


      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: categoryConstants.GET_CATEGORY_REQUEST };
  }
  function success(category) {
    return { type: categoryConstants.GET_CATEGORY_SUCCESS, category };
  }
  function failure(error) {
    return { type: categoryConstants.SAVE_CATEGORY_ERROR, error };
  }
}
