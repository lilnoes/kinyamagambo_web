import Header from "../../components/Header.js";
import { useEffect, useState } from "react";
import { sendPost } from "../../lib/fetch";
import { useReducer } from "react";
import * as reducers from "../../components/add/reducer";
import * as add from "../../components/add/Home";
const fetchMeaning = async (_word) => {
    const { data } = await sendPost(`/api/word/${_word}/definition`, 0);
    let word = data.word;
    console.log("word", word);
    let definition = word?.definitions?.[0];
    let _meanings = definition?.meanings?.map(meaning => ({ ...meaning, key: Math.random() }));
    return _meanings;
}

export default function Home(props) {
    const [state, dispatch] = useReducer(reducers.default, reducers.initState); 
    const [sentences, setSentences] = useState([]);
    const [msg, setMsg] = useState("");
    const types = ["izina rusange", "izina bwite", "igisantera", "izina ntera", "ikinyazina", "indangahantu", "icyungo", "umugereka/ngera", "irangamutima", "inyigana", "ikegeranshinga", "akamamo", "inshinga iri mu mbundo", "inshinga idasanzwe", "inshinga itondaguye"];

    const addMeaning = async () => {
        if (state.loaded) {
            dispatch(["ADDMEANING", [{ meaning: "", examples: [], key: Math.random() }]]);
            return;
        }
        const { data } = await sendPost(`/api/word/${state.word}/definition`, 0);
        let word = data.word;
        console.log("word", word);
        let definition = word?.definitions?.[0];
        let _meanings = definition?.meanings?.map(meaning => ({ ...meaning, key: Math.random() }));
        dispatch(["ADDMEANING", _meanings]);
        dispatch(["ADDMEANING", [{ meaning: "", examples: [], key: Math.random() }]]);
        dispatch(["LOADED"]);
        return;
    }

    const fetchSentences = async () => {
        const { data } = await sendPost(`/api/sentence`, { word: state.word });
        setSentences(data.sentences);
        console.log("sentences", data.sentences);
    };


    const handleSubmit = async () => {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("spinner").classList.add("inline-block");
        const res = await sendPost("/api/word/save", { definition: state });
        document.getElementById("spinner").classList.remove("inline-block");
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("msg").classList.remove("opacity-0");
        document.getElementById("msg").classList.add("opacity-100");
        setMsg(res.data);
        console.log(res);
    }
    return (<add.default sentences={sentences} dispatch={dispatch} state={state} types={types} fetchSentences={fetchSentences} addMeaning={addMeaning} msg={msg}/>);
    
}
// export const getServerSideProps = async (context) => {
//     const { params, req, res } = context;
//     // console.log(context.params);
//     return {
//         props: { word: params.word }
//     }
// }