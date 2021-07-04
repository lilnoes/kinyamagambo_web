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

const Definition = {
    userID: "",
    verified: false,
    meanings: [Meaning],
    examples: [Example],
    upvotes: 0,
    downvotes: 0,
    date: new Date
}

const Word = {
    word: "",
    definitions: [Definition],
    count: 0,
    isesengura: ""
}