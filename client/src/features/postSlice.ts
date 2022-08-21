import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PostState {
  value: Post[];
  status: string;
  likeType: string[];
  likeStatus: string;
  postCreatedByImg: string;
}

interface Post {
  _id: string;
  text: string;
  postCreatedByName: string;
  postCreatedById: string;
  reacts: {
    _id: string;
    type: string;
    createdByUserId: string;
    createdByUserName: string;
  }[];
  comments: [
    {
      _id: string;
      text: string;
      like: string;
      commentCreatedByName: string;
      commentCreatedById: string;
      replies: [
        {
          _id: string;
          text: string;
          like: string;
          replyCreatedByName: string;
          replyCreatedById: string;
        }
      ];
    }
  ];
}

// interface ReactState {
//   id: string;
//   likeType: string;
//   createdByUserId: string;
//   createdByUserName: string;
// }

const initialState: PostState = {
  value: [],
  status: "idle", // idle, loading, succeeded, failed
  likeType: [],
  likeStatus: "idle",
  postCreatedByImg: "",
};

const POSTS_URL = "http://localhost:5000/posts";

export const fetchPosts: any = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

export const deletePosts: any = createAsyncThunk(
  "post/deletePosts",
  async (initialPost: { id: string }) => {
    const { id } = initialPost;
    const response = await axios.delete(`${POSTS_URL}/${id}`);
    if (response?.status === 200) return initialPost;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const addReact: any = createAsyncThunk(
  "post/addNewReact",
  async (initialReact: {
    id: string;
    likeType: string;
    createdByUserId: string;
    createdByUserName: string;
  }) => {
    const response = await axios.put(`${POSTS_URL}/${initialReact.id}`, {
      type: initialReact.likeType,
      createdByUserId: initialReact.createdByUserId,
      createdByUserName: initialReact.createdByUserName,
    });
    if (response?.status === 200) return response.data;
    return `${response?.status}: ${response?.statusText}`;
  }
);

export const addNewPost: any = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost: {
    text: string;
    createdByName: string;
    createdById: string;
  }) => {
    const response = await axios.post(POSTS_URL, {
      text: initialPost.text,
      postCreatedById: initialPost.createdById,
      postCreatedByName: initialPost.createdByName,
      reacts: [],
      comments: [],
    });
    return response.data;
  }
);

export const addComment: any = createAsyncThunk(
  "post/addComment",
  async (value: any) => {
    try {
      const response = await axios.post(`${POSTS_URL}/${value.id}`, {
        text: value.text,
        commentCreatedByName: value.commentCreatedByName,
        commentCreatedById: value.commentCreatedById,
      });
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const addReply: any = createAsyncThunk(
  "post/reply/addReply",
  async (value: any) => {
    try {
      const response = await axios.post(`${POSTS_URL}/reply/${value.pId}`, {
        text: value.text,
        cId: value.cId,
        replyCreatedByName: value.replyCreatedByName,
        replyCreatedById: value.replyCreatedById,
      });
      return response.data;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // addReact: (state, action: PayloadAction<ReactState>) => {
    //   axios.put(`${POSTS_URL}/${action.payload.id}`, {
    //     type: action.payload.likeType,
    //     createdByUserId: action.payload.createdByUserId,
    //     createdByUserName: action.payload.createdByUserName,
    //   });
    // },
  },
  extraReducers(builder) {
    builder
      //Fetch Posts
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let loadedPosts: Post[];
        loadedPosts = action.payload.map((post: Post) => {
          state.value.push(post);
          return loadedPosts;
        });
      })
      //Delete Post
      .addCase(deletePosts.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const index = state.value.findIndex((item) => item._id === id);
        if (index > -1) {
          state.value.splice(index, 1);
        }
      })
      //Add New Post!
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      //Add Comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.value.map((post) => {
          if (post._id === action.payload._id) {
            let comment = action.payload.comments.slice(-1);
            post.comments.push(...comment);
          }
          return post;
        });
      })
      //Add Reply
      .addCase(addReply.fulfilled, (state, action) => {
        state.value.map((post) => {
          post.comments.map((comment) => {
            if (comment._id === action.payload._id) {
              const reply = action.payload.replies.slice(-1);
              comment.replies.push(...reply);
            }
            return comment;
          });
          return post;
        });
      })
      .addCase(addReact.fulfilled, (state, action) => {
        state.likeStatus = "succeeded";
        state.likeType = action.payload;
      });
  },
});

// export const { addReact } = postSlice.actions;

export default postSlice.reducer;
