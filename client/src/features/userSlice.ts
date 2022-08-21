import {
  createAsyncThunk,
  createSlice /*//PayloadAction*/,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

interface userState {
  user: UserType;
  findedUser: UserType;
  findedUserState: string;
  registerStatus: string;
  loginStatus: string;
  registerError: ErrorType;
  loginError: ErrorType;
  userLocation: string;
  userProfileLocation: string;
}

interface ErrorType {
  name: string;
  email: string;
  password: string;
}

interface UserType {
  _id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  token: string;
  img: string;
  coverImg: string;
  friends?: [
    {
      friendId: string;
      friendName: string;
      to: string;
    }
  ];
  friendRequests?: [
    {
      friendId: string;
      friendName: string;
    }
  ];
  notifications?: [
    {
      userId: string;
      _id: string;
      message: string;
      to: string;
    }
  ];
}

const initialState: userState = {
  user: {
    _id: "",
    name: "",
    nickname: "",
    email: "",
    password: "",
    token: "",
    img: "",
    coverImg: "",
  },
  findedUser: {
    _id: "",
    name: "",
    nickname: "",
    email: "",
    password: "",
    token: "",
    img: "",
    coverImg: "",
  },
  findedUserState: "idle",
  registerStatus: "idle",
  loginStatus: "idle",
  registerError: {
    email: "",
    password: "",
    name: "",
  },
  loginError: {
    email: "",
    password: "",
    name: "",
  },
  userLocation: "Home",
  userProfileLocation: "Posts",
};

const USERS_URL = "http://localhost:5000/user";

export const checkAuth: any = createAsyncThunk("auth/checkAuth", async () => {
  try {
    const response: any = await axios.get(`${USERS_URL}/getAuth`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return error.response;
  }
});

export const findUser: any = createAsyncThunk(
  "user/findUser",
  async (id: any) => {
    try {
      const response: any = await axios.get(`${USERS_URL}/profile/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const findUserById: any = createAsyncThunk(
  "user/findUserById",
  async (id: any) => {
    try {
      const response: any = await axios.get(`${USERS_URL}/profileid/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const findUserByIdAndAddFriend: any = createAsyncThunk(
  "user/findUserByIdAndAddFriend",
  async (Users: any) => {
    try {
      const response: any = await axios.post(
        `${USERS_URL}/addFriend`,
        {
          id: Users.id,
          uId: Users.uId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);
export const findUserByIdAndAddFriendRequest: any = createAsyncThunk(
  "user/findUserByIdAndAddFriendRequest",
  async (Users: any) => {
    try {
      const response: any = await axios.post(
        `${USERS_URL}/addFriendRequest`,
        {
          id: Users.id,
          uId: Users.uId,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const addCoverImg: any = createAsyncThunk(
  "user/addCoverImg",
  async (initialImg: any) => {
    if (initialImg.userId !== "") {
      try {
        const formData = new FormData();
        formData.append("image", initialImg.file);
        const result = await axios.post(
          `http://localhost:5000/uploadCoverImage/${initialImg.userId}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }
);
export const addProfileImg: any = createAsyncThunk(
  "user/addProfileImg",
  async (initialImg: any) => {
    if (initialImg.userId !== "") {
      try {
        const formData = new FormData();
        formData.append("image", initialImg.file);
        const result = await axios.post(
          `http://localhost:5000/uploadImage/${initialImg.userId}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        return result;
      } catch (error) {
        console.error(error);
      }
    }
  }
);
export const getCoverImg: any = createAsyncThunk(
  "user/getCoverImg",
  async (id: any) => {
    if (id !== "") {
      try {
        const response: any = await axios.get(
          `http://localhost:5000/public/${id}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error: any) {
        return error.response;
      }
    }
  }
);
export const getProfileImg: any = createAsyncThunk(
  "user/getProfileImg",
  async (id: any) => {
    if (id !== "") {
      try {
        const response: any = await axios.get(
          `http://localhost:5000/public/${id}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error: any) {
        return error.response;
      }
    }
  }
);

export const logOutUser: any = createAsyncThunk("auth/logOutUser", async () => {
  try {
    const response: any = await axios.post(
      `${USERS_URL}/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error: any) {
    return error.response;
  }
});

export const addNewUser: any = createAsyncThunk(
  "auth/addNewUser",
  async ({ name, email, password }: UserType) => {
    try {
      const response: any = await axios.post(
        `${USERS_URL}/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const logInUser: any = createAsyncThunk(
  "auth/logInUser",
  async ({ loginEmail, loginPassword }: any) => {
    try {
      const response: any = await axios.post(
        `${USERS_URL}/login`,
        {
          loginEmail,
          loginPassword,
        },
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return error.response;
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeLoginStatus: (state, action: PayloadAction<any>) => {
      state.loginStatus = "idle";
      state.registerStatus = "idle";
    },
    changeUserLocation: (state, action: PayloadAction<any>) => {
      state.userLocation = action.payload;
      localStorage.setItem("l1", action.payload);
    },
    changeUserProfileLocation: (state, action: PayloadAction<any>) => {
      state.userProfileLocation = action.payload;
      localStorage.setItem("l2", action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addNewUser.fulfilled, (state, action) => {
        if (
          action.payload.errors !== null &&
          action.payload.errors !== undefined
        ) {
          const { name, email, password } = action.payload.errors;
          state.registerError = { name, email, password };
          state.registerStatus = "idle";
        } else {
          localStorage.setItem("jwt", action.payload.data.token);
          localStorage.setItem("u1", action.payload.data._id);
          localStorage.setItem("u2", action.payload.data.name);
          state.registerError = { email: "", password: "", name: "" };
          state.registerStatus = "succeeded";
        }
      })
      .addCase(logInUser.fulfilled, (state, action): any => {
        if (
          action.payload.errors !== null &&
          action.payload.errors !== undefined
        ) {
          const { name, email, password } = action.payload.errors;
          state.loginError = { name, email, password };
          state.loginStatus = "idle";
        } else {
          state.loginError = { email: "", password: "", name: "" };
          const { token, _id, name } = action.payload.user;
          localStorage.setItem("u1", _id);
          localStorage.setItem("u2", name);
          localStorage.setItem("jwt", token);
          state.loginStatus = "succeeded";
        }
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("u1");
        localStorage.removeItem("u2");
        localStorage.removeItem("l1");
        localStorage.removeItem("l2");
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload !== "No token available") {
          if (action.payload === "jwt expired") {
            localStorage.removeItem("jwt");
            localStorage.removeItem("u1");
            localStorage.removeItem("u2");
            localStorage.removeItem("l1");
            localStorage.removeItem("l2");
            return;
          }
          state.user = action.payload;
          localStorage.setItem("jwt", action.payload.token);
          localStorage.setItem("u1", action.payload._id);
          localStorage.setItem("u2", action.payload.name);
        } else {
          localStorage.removeItem("jwt");
          localStorage.removeItem("u1");
          localStorage.removeItem("u2");
          localStorage.removeItem("l1");
          localStorage.removeItem("l2");
        }
      })
      .addCase(addCoverImg.fulfilled, (state, action) => {
        state.user.coverImg = action.payload.data.coverImg;
      })
      .addCase(addProfileImg.fulfilled, (state, action) => {
        state.user.img = action.payload.data.img;
      })
      .addCase(findUser.fulfilled, (state, action) => {
        if (action.payload !== "") {
          state.findedUser = action.payload.checkUser;
          state.findedUserState = "succeeded";
        } else {
          state.findedUserState = "failed";
        }
      })
      .addCase(findUserById.fulfilled, (state, action) => {
        if (action.payload !== "") {
          state.findedUser = action.payload.checkUser;
          state.findedUserState = "succeeded";
        } else {
          state.findedUserState = "failed";
        }
      })
      .addCase(findUserByIdAndAddFriend.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const {
  removeLoginStatus,
  changeUserLocation,
  changeUserProfileLocation,
} = userSlice.actions;

export default userSlice.reducer;
