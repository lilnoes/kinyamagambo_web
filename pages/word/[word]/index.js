import Header from "../../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../../lib/fetch";

export default function Home(props) {
    const [meanings, setMeanings] = useState([]);
    return (<div className="bg-wheat">
        <Header title="Word - edit" />
        <h1 className="text-4xl text-green-600 font-bold">New word</h1>
        <div>
            <label>Word: </label>
            <input type="text" name="word" value={props.word.word} disabled />
        </div>

        <div>
            <label>Isesengura: </label>
            <input type="text" name="isesengura" />
        </div>

        <h2 className="text-3xl text-green-600 font-bold">Meanings</h2>
        <div>
            {meanings.map((meaning, index) => <Meaning meaning={meaning} key={meaning.key} index={index} />)}
        </div>

    </div>);
}

function Meaning(props) {
    const [examples, setExamples] = useState(props.meaning.examples);
    return (<div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
        <div className="meaning1">
            {["meaning", "synonyms", "opposites", "related"].map((name) => <div>
                <label>{name}: </label>
                <input type="text" name={name} value={props.meaning[name]} />
            </div>)}
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name) => <div className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} value={props.meaning.translations[name]} />
            </div>)}
        </div>

        <h2 className="text-2xl text-green-600 font-bold mt-5">Examples</h2>
        <div className="ml-5">
            {examples.map((example, index) => <Example example={example} key={example.key} index={index} />)}
        </div>
    </div>);
}

function Example(props) {
    return (<div className="example mb-5">
        <div>
            <label>Example: </label>
            <input type="text" name="example" value={props.example.example} />
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name) => <div className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} value={props.example.translations[name]} />
            </div>)}
        </div>
        <hr className="" />
    </div>);
}

import getDatabase from "../../../lib/database.js";
export const getServerSideProps = async (context) => {
    const { params, req, res } = context;
    // console.log(context.params);
    const db = await getDatabase();
    const collection = db.collection("words");
    const word = await collection.findOne({ word: params.word });
    return {
        props: { word: JSON.parse(JSON.stringify(word))}
    }
}