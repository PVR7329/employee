import { createSlice } from '@reduxjs/toolkit';
import {  addData, deleteUser, userDataTable, updatedUser } from '../Api_services/ApiService';

export interface UserState {
  users: never[] | any,
  loading: boolean,
  isSuccess: boolean,
  message: string,
  // currentPage: number,
  setPerPage: number,
  totalPage: number,
}

const initialState: UserState = {
  users: [],
  loading: false,
  isSuccess: false,
  message: "",
  // currentPage: 1,
  setPerPage: 5,
  totalPage: 0,
};

export const userDataSlice = createSlice({
  name: 'userdata',
  initialState,
  reducers: {
    inisiData: (state, { payload }) => {
      state.users = payload
    },
    // setCurrentPage: (state, action) => {
    //   state.currentPage = action.payload
    // },
    // setRowPerPage: (state, action) => {
    //   state.setPerPage = action.payload
    // },
    // setTotalPerPage: (state, action) => {
    //   state.totalPage = action.payload
    // },
  },
  extraReducers: {
    [userDataTable.pending]: (state) => {
      state.loading = true;
    },
    [userDataTable.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload
      state.isSuccess = true;
    },
    [userDataTable.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },



    [addData.pending]: (state) => {
      state.loading = true;
    },
    [addData.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload)
      state.isSuccess = true;
    },
    [addData.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },



    [updatedUser.pending]: (state) => {
      state.loading = true;
    },
    [updatedUser.fulfilled]: (state) => {
      state.loading = false;
      state.isSuccess = true;
    },
    [updatedUser.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },


    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state) => {
      state.loading = false;
      state.isSuccess = true;
    },
    [deleteUser.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  }
});

export const { inisiData} = userDataSlice.actions;
export default userDataSlice.reducer;
