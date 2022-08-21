import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container">
      <h1>About Page</h1>
      <Link reloadDocument={true} to="/">home</Link>
      <Link reloadDocument={true} to="/profile">profile</Link>
    </div>
  );
};

export default About;
