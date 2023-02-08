import PostCardSection from '../../components/PostCardSection';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import _, { compact } from 'lodash';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors/userSelector';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function PostCategory() {
    var a = false;
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    console.log('page ne ba', page);
    const user = useSelector(userSelector);
    const navigate = useNavigate();
    const showEmtpy = () => toast.error('Danh sách bài viết trống!');
    useEffect(() => {
        setPosts([]);
        getPosts();
    }, [id]);

    function getPosts() {
        fetch('http://localhost:8080/api/posts/?categoryId=' + id)
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
            {/* Danh sách post */}
            <div>
                {posts
                    ?.filter((post) => {
                        if (post.category._id.includes(id)) {
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

export default PostCategory;
