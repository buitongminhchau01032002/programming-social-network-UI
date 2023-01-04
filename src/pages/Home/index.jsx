import PostCard from '../../components/PostCard';
import { useState, useEffect } from 'react';
const POST = [
    {
        title: 'Cach viet code khoong bugs',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn. Khi người mới đọc đoạn code đó hoặc chính bạn khi đọc lại cũng sẽ nhanh chóng hiểu được ý đồ thể hiện trong...
        `,
    },
    {
        title: 'Cach viet code khoong bugs 2',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        `,
    },
    {
        title: 'Cach viet code khoong bugs',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn. Khi người mới đọc đoạn code đó hoặc chính bạn khi đọc lại cũng sẽ nhanh chóng hiểu được ý đồ thể hiện trong...
        `,
    },
    {
        title: 'Cach viet code khoong bugs 2',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        `,
    },
    {
        title: 'Cach viet code khoong bugs',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        Chú thích (comment) trong mã nguồn giúp cho các đoạn code của bạn chở nên dễ hiểu hơn. Khi người mới đọc đoạn code đó hoặc chính bạn khi đọc lại cũng sẽ nhanh chóng hiểu được ý đồ thể hiện trong...
        `,
    },
    {
        title: 'Cach viet code khoong bugs 2',
        brief: `
        Trong bài viết này chúng ta sẽ tìm hiều về chú thích (comment) trong C#. Các kiểu chú thích khác nhau và tại sao ta phải sử dụng chú thích khi lập trình.
        `,
    },
];

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
