import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface CommentState {
  value: Comment[];
  status: string;
}
interface Comment {
  _id: string;
  text: string;
  like?: string;
  commentCreatedByName: string;
  commentCreatedById: string;
}

const initialState: CommentState = {
  value: [],
  status: "idle",
};

const POSTS_URL = "http://localhost:5000/posts";
export const fetchComments: any = createAsyncThunk(
  "post/fetchComments",
  async () => {
    try {
      const response = await axios.get(`${POSTS_URL}`);
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addCommentReact: (state, action: PayloadAction<any>) => {
      axios.put(`${POSTS_URL}/comment/${action.payload.id}`, {
        like: action.payload.like,
        commentId: action.payload.c_id,
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.status = "succeeded";
      let loadedPosts: Comment[];
      loadedPosts = action.payload.map((post: any) => {
        state.value.push(post.comments);
        return loadedPosts;
      });
    });
  },
});

export const { addCommentReact } = commentSlice.actions;

export default commentSlice.reducer;
