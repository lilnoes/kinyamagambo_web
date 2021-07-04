import Header from "../../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../../lib/fetch";

export default function Home(props) {
  const word = props.word.word;
  const isesengura = props.word.isesengura;
  const definitions = props.word.definitions;
  const meanings = [];
  for (let definition of definitions)
    for (let meaning of definition.meanings)
      meanings.push({
        id: definition.userID,
        meaning: meaning,
      });
  return (
    <div className="bg-wheat">
      <Header title={word} />
      <h1 className="text-4xl text-green-600 font-bold">{word}</h1>

      <div>
        <label>Isesengura: </label>
        <input type="text" name="isesengura" value={isesengura} disabled />
      </div>

      <h2 className="text-3xl text-green-600 font-bold">Meanings</h2>
      <div>
        {meanings.map((meaning, index) => (
          <Meaning meaning={meaning.meaning} key={index} user={meaning.id}/>
        ))}
      </div>
    </div>
  );
}

function Meaning(props) {
  const examples = props.meaning.examples;
  return (
    <div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
      <div className="meaning1">
        {["meaning", "synonyms", "opposites", "related"].map((name) => (
          <div>
            <label>{name}: </label>
            <input type="text" name={name} value={props.meaning[name]} />
          </div>
        ))}
      </div>
      <div className="translations">
        <h2>Translations</h2>
        {["tr", "en", "fr", "sw"].map((name) => (
          <div className="ml-5">
            <label>Translation ({name})</label>
            <input
              type="text"
              name={name}
              value={props.meaning.translations[name]}
            />
          </div>
        ))}
      </div>

      <h2 className="text-2xl text-green-600 font-bold mt-5">Examples</h2>
      <div className="ml-5">
        {examples.map((example, index) => (
          <Example example={example} key={example.key} index={index} />
        ))}
      </div>
    </div>
  );
}

function Example(props) {
  return (
    <div className="example mb-5">
      <div>
        <label>Example: </label>
        <input type="text" name="example" value={props.example.example} />
      </div>
      <div className="translations">
        <h2>Translations</h2>
        {["tr", "en", "fr", "sw"].map((name) => (
          <div className="ml-5">
            <label>Translation ({name})</label>
            <input
              type="text"
              name={name}
              value={props.example.translations[name]}
            />
          </div>
        ))}
      </div>
      <hr className="" />
    </div>
  );
}

import getDatabase from "../../../lib/database.js";
export const getServerSideProps = async (context) => {
  const { params, req, res } = context;
  // console.log(context.params);
  const db = await getDatabase();
  const collection = db.collection("words");
  const word = await collection.findOne({ word: params.word });
  return {
    props: { word: JSON.parse(JSON.stringify(word)) },
  };
};
