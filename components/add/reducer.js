export const initState = { word: "d", igicumbi: "", ubwoko: "", synonms: "", opposites: "", related: "", translations: {tr: "", en: "", fr: "", sw: ""}, meanings: [] };
export default function reducer(state, [action, payload]) {
    console.log("reducert", action, payload);
    console.log("prev state", state);
    switch (action) {
        case "DEFINITION": {
            return {...state, ...payload};
        }
        case "PROPERTY": {
            state[payload.name] = payload.value; return {...state};
        }
        case "ADDMEANING": {
            if(payload)
            state.meanings.push(...payload);
            return {...state};
        }
        case "MEANINGWORD": {
            state.meanings[payload.mIndex].meaning = payload.value;
            return {...state};
        }
        case "WORDTRANSLATION": {
            state.translations[payload.name] = payload.value;
            return {...state};
        }
        case "DELETEMEANING": {
            state.meanings.splice(payload.mIndex, 1);
            return {...state};
        }
        case "ADDEXAMPLE": {
            state.meanings[payload.mIndex].examples.push({example: "", key: Math.random(), translations: {tr: "", en: "", fr: "", sw: ""}});
            return {...state};
        }
        case "DELETEEXAMPLE": {
            state.meanings[payload.mIndex].examples.splice(payload.index, 1);
            return {...state};
        }
        case "EXAMPLEWORD": {
            state.meanings[payload.mIndex].examples[payload.index].example = payload.value;
            return {...state};
        }
        case "EXAMPLETRANSLATION": {
            state.meanings[payload.mIndex].examples[payload.index].translations[payload.name] = payload.value;
            return {...state};
        }
        case "LOADED": return { ...state, loaded: true };
    }
    return state;
}