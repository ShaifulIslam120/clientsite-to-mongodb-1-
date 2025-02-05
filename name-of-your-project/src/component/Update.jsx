import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loaderuser = useLoaderData();

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email };

        console.log(updatedUser);

        fetch(`http://localhost:3000/users/${loaderuser._id}`, { // ✅ Fixed _id reference
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert("User updated successfully!");
        })
        .catch(error => console.error("Error updating user:", error));
    };

    return (
        <div>
            <h3>Update Information of {loaderuser.name}</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loaderuser?.name} />
                <br />
                <input type="email" name="email" defaultValue={loaderuser?.email} />
                <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;
