import { useState } from "react";
export default function Translations(props) {
    const translations = props.translations;
    const [selected, setSelected] = useState("tr");
    const selectedname = "p-[1px] text-[12px] bg-white w-1/5 cursor-pointer";
    const unselectedname = "p-[1px] text-[12px] bg-gray-500 text-white w-1/5 cursor-pointer";
    return (<div>
        <div className="flex flex-row w-1/2">
            {translations['tr'] && <span className={selected=="tr"? selectedname: unselectedname}  onClick={() => setSelected("tr")}>Turkish</span>}
            {translations['en'] && <span  className={selected=="en"? selectedname: unselectedname} onClick={() => setSelected("en")}>English</span>}
            {translations['fr'] && <span  className={selected=="fr"? selectedname: unselectedname} onClick={() => setSelected("fr")}>French</span>}
            {translations['sw'] && <span className={selected=="sw"? selectedname: unselectedname} onClick={() => setSelected("sw")}>Swahili</span>}
        </div>
        <div className="w-1/2 h-[30px] mb-2 border-l-2 text-[14px] border-gray-500 p-1">
            <p className="text-gray-500">{translations[selected]}</p>
        </div>
    </div>);
}