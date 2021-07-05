import Header from "../../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../../lib/fetch";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home(props) {
    return (<div className="bg-wheat">
        <Header title={`${props.word} - Search`} />
        <h1 className="text-4xl text-green-600 font-bold">{props.word} - Search results</h1>

        <div>
            {props.words.map((word, index) => <div key={word._id}>
                <h2 className="text-3xl text-green-600 font-bold"><Link href={`/word/${word.word}`}>{word.word}</Link></h2>
            </div>)}
        </div>

    </div>);
}

import getDatabase from "../../../lib/database.js";
export const getServerSideProps = async (context) => {
    const { params, req, res } = context;
    const {word} = params;
    const db = await getDatabase();
    const collection = await db.collection("words");
    const words = collection.aggregate([
        { $match: { $text: { $search: word } } },
        { $project: { word: 1} },
        { $sort: { score: { $meta: "textScore" } } }
    ]);
    console.log("words", await words.toArray());
    return {
        props: { word: params.word, words: JSON.parse(JSON.stringify(await words.toArray()))}
    }
}

// db.words.aggregate([
//     { $match: { $text: { $search: "kwiba" } } },
//     { $project: { word: 1, "definitions.$": 1} },
//     { $sort: { score: { $meta: "textScore" } } }
// ]).pretty()
