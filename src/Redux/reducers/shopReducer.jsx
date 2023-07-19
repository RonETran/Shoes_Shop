import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    arrProduct: [],
    arrProductSearch: [],
    cart:[],
    productDetail: {},
}

const shopReducer = createSlice({
  name: "shopReducer",
  initialState,
  reducers: {
    addToCartAction: (state,action) => {
      action.payload = {...action.payload,num:1};
      let prods = state.cart;
      let prodCart = prods.find(prod => prod.id === action.payload.id);
      if(prodCart){
        prodCart.num = prodCart.num + 1;
      }else {
        prods.push(action.payload);
      }
    },

    getDetailAction: (state,action) =>{
      state.productDetail = {...action.payload,num:1};
      console.log(state.productDetail)
    },

    quantityDetailAction: (state,action) =>{
      const {valid2} = action.payload;
      let prodDetail = state.productDetail;
      console.log(prodDetail)
      if(valid2){
          prodDetail.num += 1;
      }else{
        if(prodDetail.num>1){
          prodDetail.num -= 1;
        }
      }
    },

    addToCartFromDetailAction: (state,action) => {
      let prods = state.cart;
      let prodCart = prods.find(prod => prod.id === action.payload.id);
      if(prodCart){
        prodCart.num = prodCart.num + state.productDetail.num;
      }else {
        prods.push(action.payload);
      }
    },

    quantityChangeAction: (state,action)=>{
      const {id,valid2} = action.payload;
      let prodCart = state.cart.find(prod => prod.id === id);
      if(valid2){
          prodCart.num += 1;
      }else{
        if(prodCart.num>1){
          prodCart.num -= 1;
        }
      }
    },

    delProductAction: (state,action) => {
      const id = action.payload;
      state.cart = state.cart.filter(item => item.id !== id)
    }
  }
});

export const {addToCartAction,delProductAction, quantityChangeAction,getDetailAction,quantityDetailAction,addToCartFromDetailAction} = shopReducer.actions

export default shopReducer.reducer