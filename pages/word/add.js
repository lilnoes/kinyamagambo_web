import Header from "../../components/Header";
import { useState } from "react";
import { sendPost } from "../../lib/fetch";

export default function Home(props) {
    const [meanings, setMeanings] = useState([]);
    const deleteMeaning = (index) => {
        const _meanings = meanings.slice();
        _meanings.splice(index, 1);
        setMeanings(_meanings);
    };
    const addMeaning = async() => {
        if(meanings.length != 0){
            setMeanings(meanings.concat({key: Math.random(), examples: [], meaning: "", synonyms: "", opposites: "", related: "", translations: {tr: "", en: "", fr: "", sw: ""}}));
            return;
        }
        const data = await sendPost("/api/word/kwiba/meaning", 0);
        console.log(data);
        let _meanings = data.data.meaning.definitions[0].meanings;
        _meanings = _meanings.concat({key: Math.random(), examples: [], meaning: "", synonyms: "", opposites: "", related: "", translations: {tr: "", en: "", fr: "", sw: ""}});
        setMeanings(_meanings);
    };
    const handleSubmit = async () => {
        const word = document.querySelector("input[name='word']").value;
        const isesengura = document.querySelector("input[name='isesengura']").value;
        const meanings = [];
        for(let _meaning of document.querySelectorAll(".meaning")){
            const meaning = {};
            for(let _input of _meaning.querySelectorAll(".meaning1 input"))
                meaning[_input.name] = _input.value;
            meaning["translations"] = {};
            for(let _input of _meaning.querySelectorAll(".translations input"))
                meaning["translations"][_input.name] = _input.value;
            meaning["examples"] = [];
            for(let exampleDiv of _meaning.querySelectorAll(".example")){
                const example = exampleDiv.querySelector("input[name='example']").value;
                const translations = {};

                for(let _input of exampleDiv.querySelectorAll(".translations input"))
                    translations[_input.name] = _input.value;
                meaning["examples"].push({example, translations});
            }
            meanings.push(meaning);
        }
        const data = {word, isesengura, meanings};
        const res = await sendPost("/api/word/save", {word: data});
        console.log(res);
    }
    return (<div className="bg-wheat">
        <Header title="New Word" />
        <h1 className="text-4xl text-green-600 font-bold">New word</h1>
        <div>
            <label>Word: </label>
            <input type="text" name="word" />
        </div>

        <div>
            <label>Isesengura: </label>
            <input type="text" name="isesengura" />
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
    const [examples, setExamples] = useState(props.meaning.examples);
    const deleteExample = (index) => {
        const _examples = examples.slice();
        _examples.splice(index, 1);
        setExamples(_examples);
    };
    const addExample = () => {
        setExamples(examples.concat({ key: Math.random(), example: "", translations: {tr: "", en: "", fr: "", sw: ""}}))
    }
    return (<div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
        <div className="meaning1">
            {["meaning", "synonyms", "opposites", "related"].map((name) => <div>
                <label>{name}: </label>
                <input type="text" name={name} value={props.meaning[name]}/>
            </div>)}
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name) => <div className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} value={props.meaning.translations[name]}/>
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
            <input type="text" name="example" value={props.example.example}/>
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name) => <div className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} value={props.example.translations[name]}/>
            </div>)}
        </div>
        <button onClick={(e) => props.onDelete(props.index)}>Siba</button>
        <hr className="" />
    </div>);
}