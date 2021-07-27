import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link"
import { useState } from "react";
import { sendPost } from "../lib/fetch";
import useUser from "../lib/useUser";

export default function Header(props) {
    const router = useRouter();
    const [word, setWord] = useState("");
    const [visible, setVisible] = useState(false);
    let user = useUser();
    if (user) user = user.data;
    user = null;
    const title = props.title;
    const search = async () => {
        const { data } = await sendPost(`/api/word/${word}`, 0);
        console.log(data);
        if (data.word) router.push(`/word/${word}`);
        else router.push(`/word/${word}/search`);
    }
    return (<div>
        <Head>
            <title>{title} - Kinyamagambo</title>
        </Head>
        <div className="mb-10">
            <h1>
                <span className="text-6xl text-green-800 font-bold">Kinyamagambo</span>
                <input type="textarea" className="align-bottom ml-10 h-[50px] w-[450px]" onChange={(e) => setWord(e.target.value)} />
                <button className="ml-3 font-bold text-4xl text-green-500" onClick={search}>Shaka</button>
                <Link href="/word/add"><a className="ml-5"><img className="w-10 inline-block" src="/images/svg/plus-circle.svg" /></a></Link>
                {user == null &&
                    <>
                        <div className="relative inline-block float-right mr-12">
                            <img className="w-10 inline-block cursor-pointer relative top-2" src="/images/svg/user.svg" onClick={() => setVisible(!visible)} />
                            {visible && <div className="absolute bg-white text-black p-2">
                                <button className="block hover:text-gray-600"><Link href="/login">Login</Link></button>
                                <button className="block hover:text-gray-600"><Link href="/register">Register</Link></button>
                            </div>}
                        </div>
                    </>}
                {user != null &&
                    <>
                        <span>Hello {user.name}</span>
                    </>}
            </h1>
        </div>
    </div>);
}