import React, { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import Select from 'react-select';
import UserDetails from "./UserDetails"; //Country.getAllCountries() //State.getAllStates()

const Home = () => {
    const crdata = Country.getAllCountries()
    // console.log(crdata)
    const [input, setinput] = useState({ fName: "", lName: "", email: "", mobile: "", address1: "", address2: "", city: "", zipcode: "" });
    const [countrys, updateCountry] = useState();
    const [states, updateState] = useState();
    const [user, setUser] = useState([])   // to store user data
    const [flag, setflag] = useState(false)
    const [search, setsearch] = useState("");
    console.log(countrys)
    console.log(states)


    const inputHandler = (event) => {
        setinput({ ...input, [event.target.name]: event.target.value });
    }

    const userInfo = { fname: input.fName, lname: input.lName, email: input.email, mobile: input.mobile, address1: input.address1, address2: input.address2, city: input.city, zipcode: input.zipcode, country: countrys, state: states }

    const submit = () => {
        if (!input.fName || input.fName.length <= 4 || !input.lName || input.lName.length <= 4 || !input.address1 || !input.mobile) {
            alert("All field mandatory!")
        }
        else {
            const url = " http://localhost:9864/user"
            const postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(userInfo)
            }
            fetch(url, postData)
                .then(res => res.json())
                .then(data => {
                    alert("submitted")
                    setinput({ fName: "", lName: "", email: "", mobile: "", address1: "", address2: "", city: "", zipcode: "" })
                    updateCountry("");
                    updateState("");
                    getUser();
                })

        }
    }
    const deleteItem = (id) => {
        const url = " http://localhost:9864/user/" + id;
        const postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE"
        };
        fetch(url, postData)
            .then(res => res.json())
            .then(deldata => {
                alert("Deleted")
                getUser();
            })

    }

    const [fName, setfName] = useState("");
    const [lName, setlName] = useState("");
    const [email, setemail] = useState("");
    const [mobile, setmobile] = useState("");
    const [address1, setaddress1] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [countrieEdit, setCountrie] = useState();
    const [stateEdit, setState] = useState();
    const [userid, setid] = useState(0);
    const edit = (id) => {
        fetch(" http://localhost:9864/user/" + id)
            .then(res => res.json())
            .then(Data => {
                setfName(Data.fname); setlName(Data.lname); setemail(Data.email); setmobile(Data.mobile); setaddress1(Data.address1);
                setzipcode(Data.zipcode); setCountrie(Data.country); setState(Data.state);
                setid(id)
                setflag(true)
            })
    }
    const update = () => {
        const editData = { fname: fName, lname: lName, email: email, mobile: mobile, address1: address1, zipcode: zipcode, country: countrieEdit, state: stateEdit }
        const url = " http://localhost:9864/user/" + userid;
        const postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(editData)
        }
        fetch(url, postData)
            .then(res => res.json())
            .then(data => {
                alert("Data is Updated")
                getUser();
                setflag(false)
            })

    }

    const getUser = () => {
        fetch(" http://localhost:9864/user")
            .then(res => res.json())
            .then(apidata => setUser(apidata.reverse()))
    }
    useEffect(() => {
        getUser();
    }, [])
    const Cdata = Country.getAllCountries().map(item => ({ value: item.name, label: item.name }))
    const Sdata = State.getAllStates().map(item => ({ value: item.name, label: item.name }))
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-danger text-center mt-3 mb-3 header">
                        <h1>Form validation</h1>
                    </div>
                </div>
                <div className="row" >
                    <div className=" col-md-6 ">
                        <form className="border rounded-3 p-3 mb-4">
                            <h5 className="text-danger">User details</h5>
                            <hr />
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input className="form-control"
                                    value={input.fName}
                                    name='fName'
                                    onChange={inputHandler}
                                    type="text" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Last name</label>
                                <input className="form-control"
                                    name='lName'
                                    value={input.lName}
                                    onChange={inputHandler} type="text" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input className="form-control"
                                    value={input.email}
                                    name='email'
                                    onChange={inputHandler}
                                    type="email" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mobile</label>
                                <input className="form-control"
                                    value={input.mobile}
                                    name='mobile'
                                    onChange={inputHandler}
                                    type="number" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address1</label>
                                <textarea className="form-control"
                                    value={input.address1}
                                    name='address1'
                                    onChange={inputHandler}
                                    type="text" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address2</label>
                                <textarea className="form-control"
                                    value={input.address2}
                                    name='address2'
                                    onChange={inputHandler}
                                    type="text" />
                            </div>

                            <div className="sc mb-3">
                                <label className="form-label">Country</label>
                                <Select
                                    options={Cdata}
                                    placeholder='Select Country'
                                    isMulti
                                    value={countrys}
                                    onChange={obj => updateCountry(obj)} />
                            </div>

                            <div className="sc mb-3">
                                <label className="form-label">Country</label>
                                <Select
                                    options={Sdata}
                                    placeholder='Select State'
                                    isMulti
                                    value={states}
                                    onChange={obj => updateState(obj)} />
                            </div>

                            <div className="d-flex mb-5 justify-content-between">
                                <div className="code1">
                                    <label className="form-label">City</label>
                                    <input className="form-control"
                                        value={input.city}
                                        name='city'
                                        onChange={inputHandler}
                                        type="text" />
                                </div>
                                <div className="code1">
                                    <label className="form-label">Zip Code</label>
                                    <input className="form-control"
                                        value={input.zipcode}
                                        name='zipcode'
                                        onChange={inputHandler}
                                        type="number" />
                                </div>
                            </div>
                            <div className="text-center">
                                <button className=" btn btn-success form-control code1" onClick={submit}> Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className=" col-7 col-md-3">
                        {
                            user.map((user) => (
                                <UserDetails edit={edit} key={user.id} deleteItem={deleteItem} user={user} />
                            ))
                        }
                    </div>
                    <div className=" col-8 col-md-3 mb-4">
                        {
                            (flag) ?
                                <div className="border p-2">
                                    <div className="text-center text-danger fs-4">Edit User</div>
                                    <hr />
                                    <div className="mb-2">
                                        <label>First Name</label>
                                        <input className="form-control" value={fName} onChange={obj => setfName(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Last Name</label>
                                        <input className="form-control" value={lName} onChange={obj => setlName(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Email</label>
                                        <input className="form-control" value={email} onChange={obj => setemail(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Mobile</label>
                                        <input className="form-control" value={mobile} onChange={obj => setmobile(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Address1</label>
                                        <input className="form-control" value={address1} onChange={obj => setaddress1(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>zipcode</label>
                                        <input className="form-control" value={zipcode} onChange={obj => setzipcode(obj.target.value)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>Country</label>
                                        <Select
                                            options={Cdata}
                                            placeholder='Select Country'
                                            isMulti
                                            value={countrieEdit}
                                            onChange={obj => setCountrie(obj)} />
                                    </div>
                                    <div className="mb-2">
                                        <label>State</label>
                                        <Select
                                            options={Sdata}
                                            placeholder='Select State'
                                            isMulti
                                            value={stateEdit}
                                            onChange={obj => setState(obj)} />
                                    </div>

                                    {/* <div className="mb-2">
                                        <label>Country</label>
                                        <select className="form-select" value={countrieEdit} onChange={obj => setCountrie(obj.target.value)}>
                                            {optioncountry}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label>State</label>
                                        <select className="form-select" value={stateEdit} onChange={obj => setState(obj.target.value)}>
                                            {optionState}
                                        </select>
                                    </div> */}
                                    <div className="text-center">
                                        <button className="btn btn-sm btn-success" onClick={update}>Update</button>
                                    </div>
                                </div>
                                :
                                ""
                        }
                    </div>
                </div>
            </div>
        </>
    );
};
export default Home;
