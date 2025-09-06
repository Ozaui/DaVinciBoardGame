import React from "react";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <nav>
        <Link to="/users">Users</Link> | <Link to="/posts">Posts</Link>
      </nav>
    </div>
  );
};

export default Homepage;
