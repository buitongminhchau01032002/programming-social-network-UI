import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userSelector } from '../../redux/selectors/userSelector';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import Following from './Following';
import InforGroup from './InforGroup';
import Posts from './Posts';

function Profile() {
    const currentUser = useSelector(userSelector);
    const [user, setUser] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        if (!id) {
            return;
        }
        getUser();
    }, [id]);

    function getUser() {
        fetch('http://localhost:8080/api/users/' + id)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setUser(null);
                    return;
                }
                setUser({ ...data.user, _id: id });
            })
            .catch((err) => {
                console.log(err);
                setUser(null);
            });
    }

    function isOwner() {
        return user && currentUser?._id === user?._id;
    }

    return (
        <div>
            <h2 className="py-10 text-center text-lg font-bold">Thông tin tài khoản</h2>

            {/* AVATAR AND INFOR  */}
            <div className="mt-4 grid grid-cols-3 gap-7">
                {/* AVATAR */}
                <div className="col-span-1 flex flex-col items-center space-y-2">
                    <Avatar user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                    <div className="flex flex-col items-center">
                        <div className="">{user?.email}</div>
                        <div className="font-semibold">{user?.role?.name}</div>
                    </div>
                    <FollowButton user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>

                {/* INFOR  */}
                <div className="col-span-2">
                    <InforGroup user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>
            </div>

            {/* BOTTOM GROUP */}
            <div className="mt-7 grid grid-cols-3 gap-7">
                {/* POST */}
                <div className="col-span-2">
                    <Posts user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>

                {/* FOLLOWING */}
                <div className="col-span-1">
                    <Following user={user} currentUser={currentUser} onChange={getUser} isOwner={isOwner()} />
                </div>
            </div>
        </div>
    );
}

export default Profile;
