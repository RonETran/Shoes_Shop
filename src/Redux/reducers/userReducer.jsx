import { createSlice } from "@reduxjs/toolkit";
import {
  USER_LOGIN,
  USER_PROFILE,
  getStorageJSON,
  http,
  saveStorageJSON,
} from "../../Util/config";
import { history } from "../../index";

const initStateUserLogin = () => {
  let userLoginInit = {
    email: "",
    accessToken: "",
  };
  if (getStorageJSON(USER_LOGIN)) {
    userLoginInit = getStorageJSON(USER_LOGIN);
  }
  return userLoginInit;
};

const initialState = {
  userLogin: initStateUserLogin(),
  userProfile: {
    avatar: "",
    deleted: false,
    email: "",
    facebookId: "",
    gender: true,
    name: "",
    ordersHistory: [],
    password: null,
    phone: "",
  },
  userProfileUpdate: {
    email: "",
    password: "",
    name: "",
    gender: true,
    phone: ""
  },
  errors:{
    name:'',
    phone:''
  }
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      const userLogin = action.payload;
      state.userLogin = userLogin;
    },
    getProfileAction: (state, action) => {
      const userProfile = action.payload;
      state.userProfile = userProfile;
    },
    changeProfileAction: (state,action) => {
      let {values, errors }= action.payload;
      state.userProfile = values;
      state.userProfileUpdate = values;
      state.errors = errors;
    },
    editProfileAction: (state,action) => {
      let values = action.payload;
      state.userProfile = values;
    },
    updateProfileAction: (state,action) => {
      let values = action.payload;
      state.userProfileUpdate = values;
    }
  },
});

export const { loginAction, getProfileAction, changeProfileAction, editProfileAction, updateProfileAction } = userReducer.actions;

export default userReducer.reducer;

export const loginActionApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const res = await http.post("/api/Users/signin", userLogin);
      const action = loginAction(res.data.content);
      dispatch(action);
      saveStorageJSON(USER_LOGIN, res.data.content);
      history.push("/profile");
    } catch (err) {
      alert(err.response?.data.message);
    }
  };
};

export const getProfileActionApi = () => {
  return async (dispatch) => {
    try {
      const res = await http.post(`/api/Users/getProfile`);
      const action = getProfileAction(res.data.content);
      dispatch(action);
      saveStorageJSON(USER_PROFILE, res.data.content);
    } catch (err) {
      return err;
    }
  };
};

export const updateProfileActionApi = (values) => {
  return async (dispatch) => {
    try{
      const res = await http.post('/api/Users/updateProfile',values);
      const action = updateProfileAction(res.data.content);
      dispatch(action);
      alert(res.data?.content);
    }
    catch(err){
      alert(err.response.data.content);
    }
  }
}
