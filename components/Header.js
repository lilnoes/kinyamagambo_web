import Head from "next/head";

export default function Header(props){
    const title = props.title;
    return(<div>
        <Head>
            <title>{title} - Kinyamagambo</title>
        </Head>
        <div className="mb-10">
            <h1>
                <span className="text-6xl text-green-800 font-bold">Kinyamagambo</span>
                <input type="textarea" className="align-bottom ml-10 h-[50px] w-[450px]" />
            </h1>
        </div>
    </div>);
}