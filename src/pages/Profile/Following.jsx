import { Link } from 'react-router-dom';

function Following({ user }) {
    return (
        <div>
            <h2 className="text-lg font-semibold">Đang theo dõi</h2>
            <div className="mt-5 space-y-3">
                {user?.following?.map((followingUser) => (
                    <Link to={'/profile/' + followingUser?._id} key={followingUser?._id} className="flex items-center">
                        <img className="block h-10 w-10 rounded-full border object-cover" src={followingUser?.avatar} />
                        <div className="flex-1 space-y-1 pl-3">
                            <p className="font-semibold leading-4">{followingUser.name}</p>
                            <p className="font-sm leading-4 text-gray-700">{followingUser.email}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Following;
