import Head from "next/head";
import Link from "next/link"
import useUser from "../lib/useUser";

export default function Header(props) {
    const user = useUser();
    const title = props.title;
    return (<div>
        <Head>
            <title>{title} - Kinyamagambo</title>
        </Head>
        <div className="mb-10">
            <h1>
                <span className="text-6xl text-green-800 font-bold">Kinyamagambo</span>
                <input type="textarea" className="align-bottom ml-10 h-[50px] w-[450px]" />

                {user.data == null &&
                    <>
                        <button><Link href="login">Login</Link></button>
                        <button className="ml-5"><Link href="register">Register</Link></button>
                    </>}
                {user.data != null &&
                    <>
                        <span>Hello {user.data.name}</span>
                    </>}
            </h1>
        </div>
    </div>);
}