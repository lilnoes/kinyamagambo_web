import "./Example.module.css";
export default function Example(props) {
    const dispatch = props.dispatch;
    const mIndex = props.mIndex;
    const index = props.index;
    return (<div className="example bg-white m-10">
        <div>
            <label className="w-[120px] inline-block">Example: </label>
            <textarea className="border-[1px] border-wheat w-[300px]" name="example" defaultValue={props.example.example} onChange={(e) => dispatch(["EXAMPLEWORD", {mIndex, index, value: e.target.value}])} />
            <button onClick={(e) => dispatch(["EXAMPLEWORD", {mIndex, index, value: props.sentences[props.sentences.length * Math.random() | 0]?.sentence}])}>Random example</button>
        </div>
        <div className="translations">
            <h2 className="font-bold">Translations</h2>
            {["tr", "en", "fr", "sw"].map((name, _index) => <div key={_index} className="">
                <label className="w-[120px] inline-block">Translation ({name})</label>
                <textarea className="border-[1px] border-wheat w-[400px]" name={name} defaultValue={props.example.translations[name]} onChange={(e) => dispatch(["EXAMPLETRANSLATION", {mIndex, index, name, value: e.target.value}])}/>
            </div>)}
        </div>
        <button onClick={(e) => dispatch(["DELETEEXAMPLE", {mIndex, index}])}>Siba</button>
        <hr className="" />
    </div>);
}