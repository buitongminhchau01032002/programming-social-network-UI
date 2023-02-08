import PostCardSection from '../../components/PostCardSection';
import { useState, useEffect } from 'react';
import TabBar from './TabBar';
import _, { compact } from 'lodash';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TABS = [
    { id: 1, name: 'Tất cả' },
    { id: 2, name: 'Đang theo dõi' },
    { id: 3, name: 'Đã lưu' },
];

function Home() {
    var a = false;
    console.log('init');

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    console.log('page ne ba', page);
    const [selectedTab, setSelectedTab] = useState(TABS[0]);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const showEmtpy = () => toast.error('Danh sách bài viết trống!');
    useEffect(() => {
        getPosts();
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
        setPosts([]);
        var string = '';
        if (tab.id == 1) {
            string = 'posts';
        } else {
            if (tab.id == 2) {
                string = 'posts/following/posts';
            } else string = 'posts/saved/posts';
        }
        fetch('http://localhost:8080/api/' + string, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user?.token,
            },
        })
            .then((res) => res.json())
            .then((resJson) => {
                setPosts(resJson.posts);
                console.log(resJson.posts);
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
    }
    console.log(a);
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
                {posts
                    ?.filter((post) => {
                        if (post) {
                            a = true;
                            return post;
                        }
                    })
                    ?.map((post, index) => (
                        <PostCardSection key={index} postInit={post} full={true} />
                    ))}
                {!a ? (
                    <div className="flex items-center ">
                        <h1>Không có bài viết</h1>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Home;
