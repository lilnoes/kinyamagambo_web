import { useState } from "react";
import Header from "../components/Header";
import { fetcher, sendPost } from "../lib/fetch";
export default function Login() {
    const [state, setState] = useState({});
    const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await sendPost("/api/user/login", state);
        console.log("data", data);
        // return
    }
    return (<div>
        <Header title="Login" />
        <div>
            <form>
                <div>
                    <label>Username: </label>
                    <input type="text" name="username" onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" name="password" onChange={handleChange} />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    </div>);
}