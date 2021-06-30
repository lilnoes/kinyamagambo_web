const Meaning = {
    meaning: "",
    synonym: "",
    opposite: "",
    related: "",
    translations: {tr: "", en: "", fr: "", sw: ""},
}

const Example = {
    example: "",
    translations: {tr: "", en: "", fr: "", sw: ""},
}

const Person = {
    userid: "",
    verified: false,
    meanings: [Meaning],
    examples: [Example],
    upvotes: 0,
    downvotes: 0,
    date: new Date
}

const Word = {
    word: "",
    people: [Person],
    count: 0,
    isesengura: ""
}