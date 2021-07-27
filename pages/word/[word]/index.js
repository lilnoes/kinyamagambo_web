import Header from "../../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../../lib/fetch";

export default function Home(props) {
  const word = props.word;
  return (
    <div className="bg-wheat">
      <Header title={word.word} />
      <h1 className="text-4xl text-green-600 font-bold">{word.word}</h1>

      <div>
        <p><span className="font-bold">igicumbi: </span>{word.igicumbi}</p>
        <p><span className="font-bold">ubwoko: </span>{word.ubwoko}</p>
        <p><span className="font-bold">synonyms: </span>{word.synonyms}</p>
        <p><span className="font-bold">opposites: </span>{word.opposites}</p>
        <p><span className="font-bold">related: </span>{word.related}</p>
      </div>

      <div>
        {word.definitions.map((definition, index) => (
          <Definition definition={definition} key={index} />
        ))}
      </div>
    </div>
  );
}

function Definition(props) {
  const definition = props.definition;
  const meanings = definition.meanings;
  return (<div>
    <div className="translations">
      <h2>Translations</h2>
      {["tr", "en", "fr", "sw"].map((name) => (
        <div className="ml-5">
          <label>Translation ({name})</label>
          <input
            type="text"
            name={name}
            value={definition.translations[name]}
          />
        </div>
      ))}
    </div>
    {meanings.map(meaning => <Meaning meaning={meaning} />)}
  </div>);
}

function Meaning(props) {
  const meaning = props.meaning;
  const examples = meaning.examples;
  return (
    <div className="meaning m-5 bg-white rounded-lg shadow-lg p-5">
      <div className="meaning1">
        <label>meaning: </label>
        <input type="text" value={meaning.meaning} />
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
  const example = props.example;
  return (
    <div className="example mb-5">
      <div>
        <label>Example: </label>
        <input type="text" name="example" value={example.example} />
      </div>
      <div className="translations">
        <h2>Translations</h2>
        {["tr", "en", "fr", "sw"].map((name) => (
          <div className="ml-5">
            <label>Translation ({name})</label>
            <input
              type="text"
              name={name}
              value={example.translations[name]}
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
  const collection = db.collection("cleanedwords");
  const word = await collection.findOne({ word: params.word });
  return {
    props: { word: JSON.parse(JSON.stringify(word)) },
  };
};
