import PostCardSection from '../../components/PostCardSection';
import { useState, useEffect } from 'react';
import TabBar from './TabBar';
import _, { compact } from 'lodash';

const TABS = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'Đang theo dõi' },
    { id: 3, name: 'Đã lưu' },
];

function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    console.log('page ne ba', page);
    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    useEffect(() => {
        getPosts(page);
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            if (scrollTop + clientHeight >= scrollHeight - 0.5) {
                fetch('http://localhost:8080/api/posts/?limit=3&page=' + page)
                    .then((res) => res.json())
                    .then((resJson) => {
                        console.log('Gọi thêm api');
                        setPosts(posts.concat(resJson.posts));
                    })
                    .catch((error) => {
                        console.log(error);
                        setPosts([]);
                    });
            }
        });

        return () => {
            window.removeEventListener('scroll', () => {
                setPage(page + 1);
            });
        };
    }, []);

    function getPosts(page) {
        console.log('goi lại');
        fetch('http://localhost:8080/api/posts/?limit=3&page=' + page)
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
                if (page == 1   ) setPage(page + 1);
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
                    <PostCardSection key={index} postInit={post} full={true} />
                ))}
            </div>
        </div>
    );
}

export default Home;
