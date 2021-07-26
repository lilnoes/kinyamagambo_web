import { useState } from "react";
import Header from "../Header";
import Meaning from "./Meaning";

export default function Home(props) {
    const sentences = props.sentences;
    const state = props.state;
    const types = props.types;
    const dispatch = props.dispatch;
    return (<div className="bg-wheat">
        <Header title="Word - new" />
        <h1 className="text-4xl text-green-600 font-bold">New word</h1>
        <div>
            <label>Word: </label>
            <input type="text" name="word" value={state.word} onChange={(e) => dispatch(["PROPERTY", { name: "word", value: e.target.value }])} />
        </div>

        <div>
            <label>igicumbi: </label>
            <input type="text" name="igicumbi" value={state.igicumbi} onChange={(e) => dispatch(["PROPERTY", { name: "igicumbi", value: e.target.value }])}/>
        </div>

        <div>
            <label>Ubwoko: </label>
            <select name="ubwoko" value={state.ubwoko} onChange={(e) => dispatch(["PROPERTY", { name: "ubwoko", value: e.target.value }])}>
                {types.map(type => <option value={type}>{type}</option>)}
            </select>
        </div>

        <div>
            <label>synonyms: </label>
            <input type="text" value={state.synonym} onChange={(e) => dispatch(["PROPERTY", { name: "synonyms", value: e.target.value }])}/>
        </div>

        <div>
            <label>opposites: </label>
            <input type="text" value={state.opposites} onChange={(e) => dispatch(["PROPERTY", { name: "opposites", value: e.target.value }])}/>
        </div>

        <div>
            <label>related: </label>
            <input type="text" value={state.related} onChange={(e) => dispatch(["PROPERTY", { name: "related", value: e.target.value }])}/>
        </div>

        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name, index) => <div key={index} className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} defaultValue={state.translations[name]} onChange={(e) => dispatch(["WORDTRANSLATION", {name, value: e.target.value}])}/>
            </div>)}
        </div>

        <div className="m-5 border-2 border-red-700 p-10">
            <h2 className="text-green-700 font-bold">Sentences</h2>
            {sentences.map(sentence => <p key={sentence._id}>{sentence.sentence}</p>)}
            <button onClick={props.fetchSentences}>Get sentences</button>
        </div>

        <h2 className="text-3xl text-green-600 font-bold">Meanings</h2>
        <div>
            {state.meanings.map((meaning, index) => <Meaning meaning={meaning} key={meaning.key} index={index} dispatch={props.dispatch} />)}
        </div>
        <button onClick={props.addMeaning}>Add Meaning</button>
        {/* <button onClick={handleSubmit} className="text-green-800 bg-white rounded-lg p-2 font-bold block">Save</button> */}
        <img id="spinner" className="w-10 hidden animate-spin" src="/images/svg/spinner.svg" />
        <span id="msg" className="transition-opacity duration-[2000ms] opacity-0" onTransitionEnd={e => {
            e.target.classList.remove("opacity-100");
            e.target.classList.add("opacity-0");
        }}>{props.msg}</span>
    </div>);
}