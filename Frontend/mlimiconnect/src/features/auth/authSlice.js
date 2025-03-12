import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../api/axioConfig';

export const register = createAsyncThunk(
    'auth/register',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.post('/auth/register', data);
            console.log("From the register thunk", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
            
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.post('/auth/login', data);
            console.log("From the login thunk", response.data);
            return response.data;
       } catch (error) {
            return rejectWithValue(error.response.data);
       }
    }
)

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.get('/auth/users');
            console.log("From the getUser thunk", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
            
        }
    }
)

export const followUser = createAsyncThunk(
    'auth/followUser',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.post('/auth/follow', data);
            console.log("From the followUser thunk", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
            
        }
    }
)

export const unfollowUser = createAsyncThunk(
    'auth/unfollowUser',
    async (data, { rejectWithValue}) => {
        try {
            const response = await axios.post('/auth/unfollow', data);
            console.log("From the unfollowUser thunk", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
            
        }
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialstate : {
        user: null,
        error: null,
        loading: false,
        success: false
    
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token')
        }
    }, 

    extraReducers: (builder) => {
        builder
          // Register
          .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token); 
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
          // Login
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            localStorage.setItem('token', action.payload.token); 
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      },

   
})

export const { loginUser,registerUser,logout } = authSlice.actions;
export default authSlice.reducer;