import "./App.css";
import Login from "./components/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import ProfileFriends from "./components/nested/ProfileFriends";
import ProfileAbout from "./components/nested/ProfileAbout";
import ProfilePosts from "./components/nested/ProfilePosts";
import UserProfile from "./components/nested/UserProfile";

function App() {
  const auth = localStorage.getItem("jwt");

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile" element={<ProfilePosts />} />
          <Route path="/profile/about" element={<ProfileAbout />} />
          <Route path="/profile/friends" element={<ProfileFriends />} />
        </Route>
      </Route>
      <Route path="/login" element={auth ? <Navigate to="/" /> : <Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

/* 

interface PostsData {
  id: string;
  text: string;
  like: string;
  comments: [
    {
      id: string;
      text: string;
      like: string;
      replies: [
        {
          id: string;
          text: string;
          like: string;
        }
      ];
    }
  ];
};

const PostsS: PostsData[] = [{
  id: "",
  text: "",
  like: "",
  comments: [
    {
      id: "",
      text: "",
      like: "",
      replies: [
        {
          id: "",
          text: "",
          like: "",
        },
      ],
    },
  ],
}]


PostsS.map((post) => {
  post.comments.map(com => {
    com.replies.map(repl => {
      if(repl.id === repl.id){
        repl.like = "haha"
      }
    })
  })
});

*/
