import { useState } from "react";
import Header from "../components/Header.js";
import Upvotes from "../components/Upvotes.js";

export default function Home(props) {
  return (
    <div className="bg-wheat">
      <Header title="Inyungururamagambo" />
      <div className="m-2">
        <WordDay word={props.random} key={Math.random()} />
        <hr className="mb-5 border-2" />
        {props.words.map((word) => (
          <Word word={word} key={Math.random()} />
        ))}
      </div>
    </div>
  );
}

function WordDay(props) {
  const word = props.word;
  const meanings = [];
  for (let def of word.definitions)
    for (let meaning of def.meanings)
      meanings.push({ meaning: meaning, user: def.userID });
  return (
    <div className="p-3 bg-white rounded-lg shadow-xl my-3">
      <h1 className="text-[13px] relative bottom-[-8px] text-green-800 font-bold">
        Word of the day
      </h1>
      <h2 className="text-5xl text-green-600 font-bold">{word.word}</h2>
      <h2 className="text-[10px] text-gray-700 mb-2">By <span className="text-[15px] font-bold mr-5">lilnoes</span>
        On May 21, 2020
      </h2>
      {meanings.map((meaning) => (
        <Meaning meaning={meaning} key={Math.random()} />
      ))}
      <Upvotes upvotes={50} downvotes={100} />
    </div>
  );
}



function Word(props) {
  const word = props.word;
  const meanings = [];
  for (let def of word.definitions)
    for (let meaning of def.meanings)
      meanings.push({ meaning: meaning, user: def.userID });
  return (
    <div>
      <h2>{word.word}</h2>
      {meanings.map((meaning) => (
        <Meaning meaning={meaning} key={Math.random()} />
      ))}
    </div>
  );
}

function Meaning(props) {
  const meaning = props.meaning.meaning;
  return (
    <div>
      <p><img className="w-4 inline-block mr-3" src="images/svg/arrow-circle-right.svg"/>{meaning.meaning}</p>
      {meaning.examples.map((example) => (
        <Example example={example} key={Math.random()} />
      ))}
    </div>
  );
}

function Example(props) {
  const example = props.example;
  return (
    <div>
      <h2>Example</h2>
      <p>example: {example.example}</p>
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
