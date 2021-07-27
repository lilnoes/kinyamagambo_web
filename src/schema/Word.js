const Meaning = {
    meaning: "",
    examples: [Example]
}

const Example = {
    example: "",
    translations: {tr: "", en: "", fr: "", sw: ""},
}

const Definition = {
    word: "",
    igicumbi: "",
    ubwoko: "",
    synonyms: "",
    opposites: "",
    related: "",
    translations: {},
    userID: "",
    verified: false,
    meanings: [Meaning],
    upvotes: 0,
    downvotes: 0,
    date: new Date
}

const Word = {
    word: "",
    definitions: [Definition],
    count: 0,
}

//word index
// db.cleanedwords.createIndex({word: 1}, {unique: true})
// db.cleanedwords.createIndex({igicumbi: 1})
// db.cleanedwords.createIndex({ubwoko: 1})
// db.cleanedwords.createIndex({"$**": "text"}, {name: "textIndex", weights: {
//     "word": 10,
//     "translations.en": 10,
//     "translations.tr": 10,
//     "translations.fr": 10,
//     "translations.sw": 10,
//     "definitions.meanings.meaning": 5,
// }})

//search index

