import PostCardSection from '../../components/PostCardSection';
import { useState, useEffect } from 'react';
import TabBar from './TabBar';
import _, { compact } from 'lodash';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';

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
    const user = useSelector(userSelector);

    useEffect(() => {
        getPosts(page);
    }, []);

    function getPosts(page) {
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
        var string = '';
        if (tab.id == 1) {
            string = 'posts';
        } else {
            if (tab.id == 2) {
                string = 'posts/following/posts';
            } else string = 'posts/saved/posts';
        }
        console.log('http://localhost:8080/api/' + string);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };
        var myHeaders = new Headers();
        myHeaders.append('Authorization', 'Bearer ' + user.token);
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
            })
            .catch((error) => {
                console.log(error);
                setPosts([]);
            });
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
                    <PostCardSection key={index} postId={post._id} full={true} />
                ))}
            </div>
        </div>
    );
}

export default Home;
