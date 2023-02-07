import { Link } from 'react-router-dom';

function UserWithAvatarAndName({ user }) {
    return (
        <Link to={'/profile/' + user?._id} className="flex cursor-pointer items-center">
            <div className="peer h-6 w-6 overflow-hidden rounded-full">
                <img
                    src={
                        user?.avatar ||
                        'https://simulacionymedicina.es/wp-content/uploads/2015/11/default-avatar-300x300-1.jpg'
                    }
                    className="h-full w-full object-cover"
                />
            </div>
            <p className="mb-0.5 pl-2 text-sm font-medium hover:underline peer-hover:underline">{user?.name}</p>
        </Link>
    );
}

export default UserWithAvatarAndName;
