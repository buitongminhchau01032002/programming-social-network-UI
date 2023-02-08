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
const OPTIONS = [
    { id: 1, name: 'Nhiều lượt thích', opt: 'likes' },
    { id: 2, name: 'Nhiều lượt xem', opt: 'views' },
];

function Home() {
    var a = false;

    const [c, setC] = useState(false);
    const [hide, setHide] = useState(true);

    console.log('init');

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    console.log('page ne ba', page);
    const [selectedTab, setSelectedTab] = useState(TABS[0]);
    const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const showEmtpy = () => toast.error('Danh sách bài viết trống!');
    useEffect(() => {
        getPosts();
    }, [c]);
    function handleSelectedOptionChange(option) {
        console.log('Option change: ', option);
        if (option.id == 1) {
            setC(false);
            console.log('Option la : ', option, c);
        } else {
            setC(true);
            console.log('Option la : ', option, c);
        }
        getPosts();

        console.log('get', posts);
    }
    function getPosts() {
        setPosts([]);
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
            // selectedOption(OPTIONS[0]);
            setHide(true);
        } else {
            if (tab.id == 2) {
                string = 'posts/following/posts';
                setHide(false);
            } else {
                string = 'posts/saved/posts';
                setHide(false);
            }
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
                hide={hide}
                setHide={setHide}
                options={OPTIONS}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                onSelectedOptionChange={handleSelectedOptionChange}
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
                    ?.sort((a, b) => {
                        if (!c) {
                            console.log('a1 lon', c);
                            return b.likes.length - a.likes.length;
                        } else {
                            console.log('a2 lon', c);
                            return b.views.length - a.views.length;
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
