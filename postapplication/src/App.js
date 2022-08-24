import { Link, Route, Routes } from 'react-router-dom';
import { Post } from './Post';
import { PostList } from './PostList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/posts/:id" element={<Post />}/>
      </Routes>
    </div>
  );
}

export default App;
