
const UserDetails = ({ edit, deleteItem, user }) => {

    return (
        <>
            <div className="border rounded mb-3 text-center p-2">
                <h5>{user.fname} {user.lname} </h5>
                <h6>{user.email}</h6>
                <p>{user.mobile}</p>
                <div className="d-flex justify-content-around"  >
                    <button className="btn btn-warning btn-sm text-dark" onClick={() => edit(user.id)}>Edit</button>
                    <button className="btn btn-danger btn-sm text-dark" onClick={() => deleteItem(user.id)}>Delete</button>
                </div>
            </div>
        </>
    );
}
export default UserDetails;