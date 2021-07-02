import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link"
import { useState } from "react";
import { sendPost } from "../lib/fetch";
import useUser from "../lib/useUser";

export default function Header(props) {
    const router = useRouter();
    const [word, setWord] = useState("");
    const user = useUser();
    const title = props.title;
    const search = async () => {
        const res = await sendPost(`/api/word/${word}`, 0);
        console.log(res.data);
    }
    return (<div>
        <Head>
            <title>{title} - Kinyamagambo</title>
        </Head>
        <div className="mb-10">
            <h1>
                <span className="text-6xl text-green-800 font-bold">Kinyamagambo</span>
                <input type="textarea" className="align-bottom ml-10 h-[50px] w-[450px]" onChange={(e) => setWord(e.target.value)} />
                <button className="text-4xl text-green-500" onClick={search}>Shaka</button>

                {(!user || user && user.data == null) &&
                    <>
                        <button><Link href="/login">Login</Link></button>
                        <button className="ml-5"><Link href="/register">Register</Link></button>
                    </>}
                {user && user.data != null &&
                    <>
                        <span>Hello {user.data.name}</span>
                    </>}
            </h1>
        </div>
    </div>);
}