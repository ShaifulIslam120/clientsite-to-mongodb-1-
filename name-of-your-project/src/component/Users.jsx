import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDeleteUser = (_id) => {
        console.log(_id);
        fetch(`http://localhost:3000/users/${_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                alert('User deleted successfully');
                const remainingUsers = users.filter(user => user._id !== _id);
                setUsers(remainingUsers);
            }
        });
    };

    return (
        <div>
            <h2>Total Users: {users.length}</h2>
            <div>
                {users.map(user => (
                    <p key={user._id}>
                        {user.name}: {user.email} {user._id}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDeleteUser(user._id)}>X</button>
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Users;
