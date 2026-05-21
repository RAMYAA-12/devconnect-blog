import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/posts');
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {

    if(title === '' || content === ''){
      alert('Please fill all fields');
      return;
    }

    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        content
      })
    });

    setTitle('');
    setContent('');

    fetchPosts();
  };

  const deletePost = async (id) => {

    await fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE'
    });

    fetchPosts();
  };

  return (
    <div className="container">

      <h1>DevConnect Blog</h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={addPost}>
        Publish Post
      </button>

      {
        posts.map((post) => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <button onClick={() => deletePost(post.id)}>
              Delete
            </button>
          </div>
        ))
      }

    </div>
  );
}

export default App;