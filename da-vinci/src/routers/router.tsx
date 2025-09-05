import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import Users from "../pages/Users";
import Posts from "../pages/Posts";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};

export default Router;
