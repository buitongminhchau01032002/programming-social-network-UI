import PostCard from '../../components/PostCard';
import { useState, useEffect } from 'react';
import TabBar from './TabBar';

const TABS = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'Đang theo dõi' },
    { id: 3, name: 'Đã lưu' },
];

function Home() {
    const [posts, setPosts] = useState([]);
    const [selectedTab, setSelectedTab] = useState(TABS[0]);
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

    function handleSelectedTabChange(tab) {
        console.log('Tab change: ', tab);
        // Handle change posts ...
    }
    return (
        <div className="">
            <TabBar
                tabs={TABS}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                onSelectedTabChange={handleSelectedTabChange}
            />
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
