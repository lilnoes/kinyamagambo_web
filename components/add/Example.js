export default function Example(props) {
    const dispatch = props.dispatch;
    const mIndex = props.mIndex;
    const index = props.index;
    return (<div className="example mb-5">
        <div>
            <label>Example: </label>
            <input type="text" name="example" defaultValue={props.example.example} onChange={(e) => dispatch(["EXAMPLEWORD", {mIndex, index, value: e.target.value}])} />
        </div>
        <div className="translations">
            <h2>Translations</h2>
            {["tr", "en", "fr", "sw"].map((name, _index) => <div key={_index} className="ml-5">
                <label>Translation ({name})</label>
                <input type="text" name={name} defaultValue={props.example.translations[name]} onChange={(e) => dispatch(["EXAMPLETRANSLATION", {mIndex, index, name, value: e.target.value}])}/>
            </div>)}
        </div>
        <button onClick={(e) => dispatch(["DELETEEXAMPLE", {mIndex, index}])}>Siba</button>
        <hr className="" />
    </div>);
}