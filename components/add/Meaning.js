import { useState } from "react";
import Example from "./Example";

export default function Meaning(props) {
    const meaning = props.meaning;
    const mIndex = props.index;
    const dispatch = props.dispatch;
    let _examples = meaning.examples.map(example => ({ ...example, key: Math.random() }));
    const examples = meaning.examples;
    return (<div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
        <div className="meaning">
            <label>meaning: </label>
            <input type="text" name="meaning" defaultValue={meaning.meaning} onChange={(e)=>dispatch(["MEANINGWORD", {mIndex, value: e.target.value}])}/>
        </div>

        <h2 className="text-2xl text-green-600 font-bold mt-5">Examples</h2>
        <div className="ml-5">
            {examples.map((example, index) => <Example example={example} key={example.key} index={index} mIndex={mIndex} dispatch={dispatch}/>)}
        </div>
        <button onClick={()=>dispatch(["ADDEXAMPLE", {mIndex}])}>Add Example</button>

        <button onClick={()=>dispatch(["DELETEMEANING", {mIndex}])}>Siba</button>
    </div>);
}