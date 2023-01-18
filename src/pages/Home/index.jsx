import PostCard from '../../components/PostCard';
import { useState, useEffect } from 'react';

function Home() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
        console.log(posts);
    }, []);
    function getPosts() {
        fetch('http://localhost:8080/api/posts')
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
    }
    return (
        <div className="">
            <div className="border-b py-3">Thanh tab</div>

            {/* Danh sách post */}
            <div>
                {posts?.map((post, index) => (
                    <PostCard key={index} post={post} />
                ))}
            </div>
        </div>
    );
}

export default Home;
