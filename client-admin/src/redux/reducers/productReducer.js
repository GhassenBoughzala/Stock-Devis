/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { toast } from 'react-toastify';
//import { URLDevelopment } from '../../helpers/url';

//Types
const GET_PRODUCTS_S = 'GET ALL PRODUCTS';
const GET_PRODUCTS_F = 'GET PRODUCTS FAILURE';
const GETP_DETAILS = 'PRODUCT DETAILS REQ ID';
const GETP_DETAILS_S = 'PRODUCT DETAILS SECC';
const ADDP_S = 'ADD PRODUCT SUCCESS';
const ADDP_F = 'ADD PRODUCT FAILURE';
const PRODUCT_UPDATE = 'PRODUCT UPDATED';
const PRODUCT_DELETE = 'PRODUCT DELETED';
const PRODUCT_ERR = 'PRODUCT ERROR';

// Intial State
const intialState = {
  products: [],
  product: {},
  error: null,
};


//Reducers
export default function (state = intialState, action){

  switch (action.type) {

      case GET_PRODUCTS_F: return {...state, error: true}
      case GET_PRODUCTS_S: return{...state, products:[...action.payload]}
      case GETP_DETAILS: return{...state, product:action.payload}
      case GETP_DETAILS_S: return{ product:action.payload }

      case ADDP_S: return{...state, products:[...state.products,action.payload ]}
      case ADDP_F:

      case PRODUCT_UPDATE: return{...state, 
        products: state.products.map(p => p._id === action.payload._id ? action.payload : p )}

      case PRODUCT_DELETE: return{...state, 
        products: state.products.filter(p => p._id !== action.payload )}

      case PRODUCT_ERR:
        default:
          return state;
  }

}

export const Fetch = () => axios.get(`/api/products/search`);
export const GetDetails = (id) => axios.get(`/api/products/` + id);
export const AddP = () => axios.post(`/api/products`);
export const UP = (id, updatedP) => axios.put(`/api/products/` + id, updatedP);
export const DLP = (id) => axios.delete(`/api/products/` + id);


//Actions
export const getAll =  () => async(dispatch) => {

  Fetch().then((res) => {
    dispatch({
      type: GET_PRODUCTS_S,
      payload: res.data,
    });
  })
    .catch(
      (err) => 
        GET_PRODUCTS_F
      );
};


export const detailsProduct = productId => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${productId}`);
    dispatch({ 
        type: GETP_DETAILS_S,
        payload: res.data
    });
    console.log(res);
  } catch (error) {
    dispatch({
      type: PRODUCT_ERR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createSuccess = (data) => {
  return {
    type: ADDP_S,
    payload: data,
  };
};

export const addProduct = (product) => {
  const data = {
    name: product.name,
    description: product.description,
    price : product.price,
    quantity: product.quantity,
    category: product.category,
    fournisseur: product.fournisseur,
    shipping: product.shipping,
    photo: product.photo,
  };

  return(dispatch) => {
    
    return axios
    .post(`/api/products`, data)
    .then((res) => {

      const data = res.data;
      console.log(data);
      dispatch(createSuccess(data));
      

    }).catch((err) => 
      console.log(err),
      PRODUCT_ERR
    );

  };

};

export const deleteProduct = async(id, dispatch) => {
  DLP(id)
  .then((res) => {
    console.log(res);
    dispatch({
      type: PRODUCT_DELETE,
      payload: id,
    });
    toast.error(`Supprim?? avec succ??s !`);
  }).catch((err) => 
    console.log(err),
    PRODUCT_ERR
  );

};

export const updateProduct = (id, data) => (dispatch) => {
  UP(id, data)
  .then((res) => {
    console.log(res);
    dispatch({
      type: PRODUCT_UPDATE,
      payload: res.data,
    });
  }).catch((err) => 
    console.log(err),
    PRODUCT_ERR
  );
};

//--------EDIT-V2
export const updateProductV2 = async (id, product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }

  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("quantity", product.quantity);
  formData.append("category", product.category._id);
  formData.append("fournisseur", product.fournisseur._id);
  formData.append("shipping", product.shipping);

  try {
    let res = UP(id,formData)
    return res.data;

  } catch (error) {
    console.log(error);
  }
};

