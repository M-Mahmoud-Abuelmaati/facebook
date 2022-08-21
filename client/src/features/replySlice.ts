import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ReplyState {
  value: Reply[];
  status: string;
}

interface Reply {
  _id: string;
  text: string;
  like: string;
  replyCreatedByName: string;
  replyCreatedById: string;
}

const initialState: ReplyState = {
  value: [],
  status: "idle",
};

const POSTS_URL = "http://localhost:5000/posts";

export const fetchReplys: any = createAsyncThunk(
  "post/fetchReplys",
  async () => {
    try {
      const response = await axios.get(`${POSTS_URL}`);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const replySlice = createSlice({
  name: "reply",
  initialState,
  reducers: {
    addReplyReact: (state, action: PayloadAction<any>) => {
      axios.put(`${POSTS_URL}/reply/${action.payload.id}`, {
        like: action.payload.like,
        replyId: action.payload.r_id,
        commentId: action.payload.c_id,
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchReplys.fulfilled, (state, action) => {
      state.status = "succeeded";
      let loadedPosts: Reply[];
      loadedPosts = action.payload.map((post: any) => {
        post.comments.map((comment: any) => {
          return state.value.push(comment.replies);
        });
        return loadedPosts;
      });
    });
  },
});

export const { addReplyReact } = replySlice.actions;

export default replySlice.reducer;
