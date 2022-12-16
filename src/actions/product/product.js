import { productService } from "../../_services/productService";
import { alertActions } from "../alert/alert.actions";

import { productConstants } from "./types";
export const productActions = {
  saveProduct,
  getAll,
  saveProductList,
  getAllBill,
  updateProduct,getAllPrice,getBillToday,saveBill
};

function saveProductList(data = []) {
  return (dispatch) => {
    dispatch({
      type: productConstants.SAVE_PRODUCT_LIST,
      data,
    });
  };
}
 function saveProduct(data) {
  console.log("worked");

   return (dispatch) => {
    dispatch(request(data));

       productService.save(data).then(
      (product) => {
        dispatch(success(product));
        // history.push('/login');
        dispatch(alertActions.success("Saved successful"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: productConstants.SAVE_PRODUCT_REQUEST };
  }
  function success(product) {
    return { type: productConstants.SAVE_PRODUCT_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.SAVE_PRODUCT_ERROR, error };
  }
}
function saveBill(data){

  return async (dispatch) => {
    dispatch({ type: productConstants.SAVE_BILL_REQUEST });

   await productService.saveBill(data).then(
      (bill) => {
        dispatch( { type: productConstants.SAVE_BILL_SUCCESS, bill });
        // history.push('/login');
        console.log("product",bill)


        return Promise.resolve(bill);

      },
      (error) => {
        dispatch( { type: productConstants.SAVE_BILL_ERROR, error });
        dispatch(alertActions.error(error));


      }
    );

  };
}



function updateProduct(id, data) {

  return (dispatch) => {
    dispatch(request(id, data));

    productService.update(id, data).then(
      (product) => {
        dispatch(success(product));
        // history.push('/login');
        dispatch(alertActions.success("Updated successful"));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };

  function request() {
    return { type: productConstants.UPDATE_PRODUCT_REQUEST };
  }
  function success(product) {
    return { type: productConstants.UPDATE_PRODUCT_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.UPDATE_PRODUCT_ERROR, error };
  }
}

function getAll(data = {}) {
  console.log("category action call");

  return (dispatch) => {
    dispatch(request());

    productService.getAll(data).then(
      (product) => {
        dispatch(success(product));
        console.log("category action", product);
        dispatch(success(product));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: productConstants.GET_PRODUCT_REQUEST };
  }
  function success(product) {
    return { type: productConstants.GET_PRODUCT_SUCCESS, product };
  }
  function failure(error) {
    return { type: productConstants.SAVE_PRODUCT_ERROR, error };
  }
}
function getAllBill(data = {}) {
  console.log("category action call");

  return (dispatch) => {
    dispatch(request());

    productService.getAllBill(data).then(
      (bill) => {
        dispatch(success());
        console.log("categobillry action", bill);
        dispatch(success(bill));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: productConstants.GET_BILL_REQUEST };
  }
  function success(bill) {
    return { type: productConstants.GET_BILL_SUCCESS, bill };
  }
  function failure(error) {
    return { type: productConstants.GET_BILL_ERROR, error };
  }
}
function getBillToday(data = {}) {


  return (dispatch) => {
    dispatch(request());

    productService.getAllBill(data).then(
      (bill) => {

        console.log("categobillry action", bill);
        dispatch(success(bill));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: productConstants.GET_BILL_TODAY_REQUEST };
  }
  function success(bill) {
    return { type: productConstants.GET_BILL_TODAY_SUCCESS, bill };
  }
  function failure(error) {
    return { type: productConstants.GET_BILL_TODAY_ERROR, error };
  }
}

function getAllPrice(id) {
  console.log("category action call");

  return (dispatch) => {
    dispatch(request());

    productService.getAllPrice(id).then(
      (price) => {
        dispatch(success());
        console.log("categobillry action", price);
        dispatch(success(price));
      },
      (error) => dispatch(failure(error))
    );
  };

  function request() {
    return { type: productConstants.GET_PRICE_REQUEST };
  }
  function success(price) {
    return { type: productConstants.GET_PRICE_SUCCESS, price };
  }
  function failure(error) {
    return { type: productConstants.GET_PRICE_ERROR, error };
  }
}
