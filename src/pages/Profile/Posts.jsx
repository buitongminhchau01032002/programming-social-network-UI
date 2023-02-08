import { useEffect, useMemo, useState } from 'react';
import TabBar from '../Home/TabBar';
import { convert as convertHTMLtoText } from 'html-to-text';
import UserWithAvatarAndName from '../../components/UserWithAvatarAndName/UserWithAvatarAndName';
import CategoryBadge from '../../components/CategoryBadge/CategoryBadge';
import { Link, useNavigate } from 'react-router-dom';
const TABS = [
    { id: 1, name: 'Đã đăng' },
    { id: 2, name: 'Đang theo dõi' },
    { id: 3, name: 'Đã lưu' },
];

function Posts({ user, currentUser, isOwner }) {
    const [selectedTab, setSelectedTab] = useState({ id: 1, name: 'Đã đăng' });
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const tabs = useMemo(() => {
        if (isOwner) {
            return [
                { id: 1, name: 'Đã đăng' },
                { id: 3, name: 'Đã lưu' },
            ];
        } else {
            return [
                { id: 1, name: 'Đã đăng' },
                { id: 3, name: 'Đã lưu' },
            ];
        }
    }, [isOwner]);

    useEffect(() => {
        if (selectedTab.id === 2) {
            getFollowingPosts();
        } else {
            getOwnPosts();
        }
    }, [user]);

    function getOwnPosts() {
        fetch('http://localhost:8080/api/posts')
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setPosts([]);
                    return;
                }
                const ownPosts = data.posts?.filter((post) => post?.creator?._id === user?._id);
                setPosts(ownPosts);
            })
            .catch((err) => {
                console.log(err);
                setPosts([]);
            });
    }
    function getFollowingPosts() {
        fetch('http://localhost:8080/api/posts/following/posts', {
            headers: {
                Authorization: 'Bearer ' + currentUser?.token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setPosts([]);
                    return;
                }
                setPosts(data.followingPosts);
            })
            .catch((err) => {
                console.log(err);
                setPosts([]);
            });
    }

    function handleSelectedTabChange(tab) {
        if (tab.id === 2) {
            getFollowingPosts();
        } else {
            getOwnPosts();
        }
    }
    return (
        <div>
            <h2 className="text-lg font-semibold">Danh sách bài đăng</h2>
            <div className="mt-3">
                <TabBar
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                    onSelectedTabChange={handleSelectedTabChange}
                />
                <div className="mt-3 space-y-3">
                    {posts?.map((post) => (
                        <Link
                            to={'/comment/' + post._id}
                            key={post._id}
                            className="block w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-left hover:shadow"
                        >
                            <div className="flex justify-between">
                                <h2 className="font-bold line-clamp-1">{post?.title}</h2>
                                {isOwner ? (
                                    <button
                                        title=""
                                        className="mr-2 grid place-items-center items-center justify-center transition hover:text-slate-600"
                                        onClick={() => {
                                            navigate('/edit-post/' + post._id);
                                        }}
                                    >
                                        <i className=" fa-solid fa-pencil"></i>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <p className="mt-1 text-sm leading-4 text-gray-600 line-clamp-1">
                                {convertHTMLtoText(post?.content, { wordwrap: false })}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <UserWithAvatarAndName user={post?.creator} />
                                <CategoryBadge category={post?.category} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Posts;
