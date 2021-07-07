import Header from "../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../lib/fetch";

export default function Home(props) {
    const [meanings, setMeanings] = useState([]);
    const [isesengura, setIsesengura] = useState("");
    const [loaded, setLoaded] = useState(false);
    const fetchMeaning = async () => {
        const _word = document.querySelector("input[name='word']").value;
        const { data } = await sendPost(`/api/word/${_word}/definition`, 0);
        let word = data.word;
        console.log("word", word);
        if (word==null || word.definitions.length == 0) return [];
        let definition = word.definitions[0];
        let _meanings = definition.meanings.map(meaning => ({ ...meaning, key: Math.random() }));
        if (definition.isesengura)
            setIsesengura(definition.isesengura);
        else
            setIsesengura(word.isesengura);
        return _meanings;
    }
    const deleteMeaning = (index) => {
        const _meanings = meanings.slice();
        _meanings.splice(index, 1);
        setMeanings(_meanings);
    };
    const addMeaning = async () => {
        const _meanings = meanings.slice();
        if (!loaded) { _meanings.push(...(await fetchMeaning())); setLoaded(true); }
        // console.log(_meanings);
        // setMeanings(_meanings);
        // console.log("meanings", meanings);
        setMeanings(_meanings.concat({ key: Math.random(), examples: [], meaning: "", synonyms: "", opposites: "", related: "", translations: { tr: "", en: "", fr: "", sw: "" } }));
    };
    const handleSubmit = async () => {
        const words = new Set();
        const word = document.querySelector("input[name='word']").value;
        const meanings = [];
        for (let _meaning of document.querySelectorAll(".meaning")) {
            const meaning = {};
            for (let _input of _meaning.querySelectorAll(".meaning1 input"))
                meaning[_input.name] = _input.value;
            meaning["translations"] = {};
            for (let _input of _meaning.querySelectorAll(".meaning2.translations input"))
                meaning["translations"][_input.name] = _input.value;
            // console.log(_input.name, _input.value);
            meaning["examples"] = [];
            for (let exampleDiv of _meaning.querySelectorAll(".example")) {
                const example = exampleDiv.querySelector("input[name='example']").value;
                const translations = {};

                for (let _input of exampleDiv.querySelectorAll(".translations input"))
                    translations[_input.name] = _input.value;
                meaning["examples"].push({ example, translations });
            }
            meanings.push(meaning);
        }
        const data = { word, isesengura, meanings };
        const res = await sendPost("/api/word/save", { definition: data });
        console.log(data);
    }
    return (<div className="bg-wheat">
        <Header title="Word - new" />
        <h1 className="text-4xl text-green-600 font-bold">New word</h1>
        <div>
            <label>Word: </label>
            <input type="text" name="word" />
        </div>

        <div>
            <label>Isesengura: </label>
            <input type="text" name="isesengura" value={isesengura} onChange={(e) => setIsesengura(e.target.value)} />
        </div>

        <h2 className="text-3xl text-green-600 font-bold">Meanings</h2>
        <div>
            {meanings.map((meaning, index) => <Meaning meaning={meaning} key={meaning.key} index={index} onDelete={deleteMeaning} />)}
        </div>
        <button onClick={addMeaning}>Add Meaning</button>
        <button onClick={handleSubmit} className="text-green-800 bg-white rounded-lg p-2 font-bold block">Save</button>

    </div>);
}

function Meaning(props) {
    let _examples = props.meaning.examples.map(example => ({ ...example, key: Math.random() }));
    const [examples, setExamples] = useState(_examples);
    const deleteExample = (index) => {
        const _examples = examples.slice();
        _examples.splice(index, 1);
        setExamples(_examples);
    };
    const addExample = () => {
        setExamples(examples.concat({ key: Math.random(), example: "", translations: { tr: "", en: "", fr: "", sw: "" } }))
    }
    return (<div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
        <div className="meaning1">
            {["meaning", "synonyms", "opposites", "related"].map((name, index) => <div key={index}>
                <label>{name}: </label>
                <input type="text" name={name} defaultValue={props.meaning[name]} />
            </div>)}
        </div>
        <div className="meaning2 translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name, index) => <div key={index} className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} defaultValue={props.meaning.translations[name]} />
            </div>)}
        </div>

        <h2 className="text-2xl text-green-600 font-bold mt-5">Examples</h2>
        <div className="ml-5">
            {examples.map((example, index) => <Example example={example} key={example.key} index={index} onDelete={deleteExample} />)}
        </div>
        <button onClick={addExample}>Add Example</button>

        <button onClick={(e) => props.onDelete(props.index)}>Siba</button>
    </div>);
}

function Example(props) {
    return (<div className="example mb-5">
        <div>
            <label>Example: </label>
            <input type="text" name="example" defaultValue={props.example.example} />
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name, index) => <div key={index} className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} defaultValue={props.example.translations[name]} />
            </div>)}
        </div>
        <button onClick={(e) => props.onDelete(props.index)}>Siba</button>
        <hr className="" />
    </div>);
}

// export const getServerSideProps = async (context) => {
//     const { params, req, res } = context;
//     // console.log(context.params);
//     return {
//         props: { word: params.word }
//     }
// }