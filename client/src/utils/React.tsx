import React from "react";

export const switchReacts = (react: string) => {
  if (react === "haha") {
    return <img alt="haha" src="http://i.imgur.com/f93vCxM.gif"></img>;
  } else if (react === "love") {
    return <img alt="love" src="http://i.imgur.com/k5jMsaH.gif"></img>;
  } else if (react === "like") {
    return <img alt="like" src="http://i.imgur.com/LwCYmcM.gif"></img>;
  } else if (react === "wow") {
    return <img alt="wow" src="http://i.imgur.com/9xTkN93.gif"></img>;
  } else if (react === "sad") {
    return <img alt="sad" src="http://i.imgur.com/tFOrN5d.gif"></img>;
  } else if (react === "angry") {
    return <img alt="angry" src="http://i.imgur.com/1MgcQg0.gif"></img>;
  } else {
    return "";
  }
};

export const switchNames = (react: string) => {
  if (react === "haha") {
    return "Haha";
  } else if (react === "love") {
    return "Love";
  } else if (react === "like") {
    return "Like";
  } else if (react === "wow") {
    return "Wow";
  } else if (react === "sad") {
    return "Sad";
  } else if (react === "angry") {
    return "Angry";
  } else {
    return "Like";
  }
};

export const likeColor = (react: string) => {
  if (react === "like") {
    return { color: "#4267B2" };
  } else if (react === "love") {
    return { color: "red" };
  } else if (react === "wow") {
    return { color: "yellow" };
  } else if (react === "sad") {
    return { color: "yellow" };
  } else if (react === "angry") {
    return { color: "red" };
  } else if (react === "haha") {
    return { color: "yellow" };
  }
};
