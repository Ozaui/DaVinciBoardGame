import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import Users from "../pages/Users";
import Posts from "../pages/Posts";
import NotFoundPage from "../pages/NotFoundPage";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/users" element={<Users />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
