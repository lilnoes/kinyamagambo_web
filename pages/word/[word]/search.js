import Header from "../../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../../lib/fetch";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home(props) {
    const results = [];
    const search = props.search;
    for(let word of props.words){
        if(word.word.includes(search)) results.push(<p>{word.word}</p>);
        for(let definition of word.definitions)
            for(let meaning of definition.meanings){
                ["meaning", "synonyms", "opposites", "related"].map((name)=>{
                    if(meaning[name].includes(search)) results.push(<p>{meaning[name]}</p>);
                });
                ["tr", "en", "fr", "sw"].map((name)=>{
                    if(meaning.translations[name].includes(search)) results.push(<p>{meaning.translations[name]}</p>);
                });
                for(let example of meaning.examples){
                    if(example.example.includes(search)) results.push(<p>{example.example}</p>);
                    ["tr", "en", "fr", "sw"].map((name)=>{
                        if(example.translations[name].includes(search)) results.push(<p>{example.translations[name]}</p>);
                    });
                }
            }
    }
    
    return (<div className="bg-wheat">
        <Header title={`${props.search} - Search`} />
        <h1 className="text-4xl text-green-600 font-bold">{props.search} - Search results</h1>

        <div>
            {results}
        </div>

    </div>);
}

import getDatabase from "../../../lib/database.js";
export const getServerSideProps = async (context) => {
    const { params, req, res } = context;
    const {word} = params;
    const db = await getDatabase();
    const collection = await db.collection("words");
    const words = await (collection.find({$text: {$search: word}})).toArray();
    // console.log("words", words);
    return {
        props: { search: params.word, words: JSON.parse(JSON.stringify(words))}
    }
}

// db.words.aggregate([
//     { $match: { $text: { $search: "kwiba" } } },
//     { $project: { word: 1, "definitions.$": 1} },
//     { $sort: { score: { $meta: "textScore" } } }
// ]).pretty()
