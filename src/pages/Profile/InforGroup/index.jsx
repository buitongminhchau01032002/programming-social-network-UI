import Birthday from './Birthday';
import Name from './Name';
import Password from './Password';

function InforGroup({ user, currentUser, onChange, isOwner }) {
    return (
        <div>
            <Name user={user} currentUser={currentUser} onChange={onChange} isOwner={isOwner} />
            <Birthday user={user} currentUser={currentUser} onChange={onChange} isOwner={isOwner} />
            {isOwner && <Password user={user} currentUser={currentUser} onChange={onChange} isOwner={isOwner} />}
        </div>
    );
}

export default InforGroup;
