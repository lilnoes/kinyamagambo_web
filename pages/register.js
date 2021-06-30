import { useState } from "react";
import Header from "../components/Header";
export default function Register() {
    const [state, setState] = useState({});
    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(state.password != state.confpassword){
            setState({...state, passwordError: "Passwords do not match"})
            return;
        }
        // return
    }
    return (<div>
        <Header title="Register" />
        <div>
            <form>
                <div>
                    <label>Name: </label>
                    <input type="text" name="name" onChange={handleChange} />
                </div>

                <div>
                    <label>Surname: </label>
                    <input type="text" name="surname" onChange={handleChange} />
                </div>

                <div>
                    <label>Username: </label>
                    <input type="text" name="username" onChange={handleChange} />
                </div>

                <div>
                    <label>Email: </label>
                    <input type="email" name="email" onChange={handleChange} />
                </div>

                <div>
                    <label>Password: </label>
                    <input type="text" name="password" onChange={handleChange} />
                </div>

                <div>
                    <label>Confirm password: </label>
                    <input type="text" name="confpassword" onChange={handleChange} />
                </div>
                <p className="text-red-600 text-sm">{state.passwordError}</p>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>);
}