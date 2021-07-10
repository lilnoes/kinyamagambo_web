import { useState } from "react";
import Header from "../components/Header.js";
import Upvotes from "../components/Upvotes.js";
import Translations from "../components/Translations.js";

export default function Home(props) {
  return (
    <div className="bg-wheat">
      <Header title="Inyungururamagambo" />
      <div className="m-2">
        <WordDay word={props.random} key={Math.random()} />
        {props.words.map((word) => (
          <Word word={word} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}

function WordDay(props) {
  const word = props.word;
  return (
    <div className="p-3 bg-white rounded-lg shadow-xl my-3">
      <h1 className="text-[13px] relative bottom-[-8px] text-green-800 font-bold">
        Word of the day
      </h1>
      {word.definitions.map(definition => <Definition definition={definition} word={word.word} />)}
    </div>
  );
}



function Definition(props) {
  const definition = props.definition;
  const word = props.word;
  return (<div>
    <h2 className="text-5xl text-green-600 font-bold relativs">{word}
      <img className="w-3 inline-block relative top-[-20px]" src="images/svg/badge-check.svg" />
    </h2>
    <h2 className="text-[10px] text-gray-700 mb-2">By <span className="text-[15px] font-bold mr-5">lilnoes</span>
      On May 21, 2020
    </h2>
    {definition.meanings.map((meaning) => (
      <Meaning meaning={meaning} key={Math.random()} />
    ))}
    <Upvotes upvotes={definition.upvotes} downvotes={definition.downvotes} />

  </div>);
}

function Word(props) {
  const word = props.word;
  return (
    <div className="p-3 bg-white rounded-lg shadow-xl my-3">
      {word.definitions.map(definition => <Definition definition={definition} word={word.word} />)}
    </div>
  );
}

function Meaning(props) {
  const meaning = props.meaning;
  return (
    <div className="ml-5">
      <p><img className="w-4 inline-block mr-3" src="images/svg/arrow-circle-right.svg" /><span className="font-bold text-xl">{meaning.meaning}</span></p>
      <Translations translations={meaning.translations} />
      <div className="ml-5">
        {meaning.examples.map((example) => (
        <Example example={example} key={Math.random()} />
      ))}
      </div>
    </div>
  );
}

function Example(props) {
  const example = props.example;
  return (
    <div>
      <p><img className="w-3 inline-block mr-2" src="images/svg/hand-point-right.svg" /><span className="text-gray-800">{example.example}</span></p>
      <Translations translations={example.translations} />
    </div>
  );
}

import getDatabase from "../lib/database";
export const getServerSideProps = async (context) => {
  const db = await getDatabase();
  const collection = db.collection("words");
  const _random = collection.aggregate([
    { $sample: { size: 1 } },
    { $project: { word: 1, definitions: { $slice: ["$definitions", 1] } } },
  ]);
  const _words = collection.find(
    {},
    {
      sort: { _id: -1 },
      limit: 10,
      projection: { word: 1, definitions: { $slice: ["$definitions", 1] } },
    }
  );
  const random = await _random.toArray();
  const words = await _words.toArray();
  return {
    props: {
      random: JSON.parse(JSON.stringify(random[0])),
      words: JSON.parse(JSON.stringify(words)),
    },
  };
};
