import React, {useEffect} from 'react';
import mermaid from 'mermaid';

export default function Mermaid({definition, _key, setReady}) {
    const id = `mermaid-${_key}`;
    const ref = React.useRef();

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: false
        })
    }, []);

    useEffect(() => {
        if (ref.current) {
            if (definition === "") return;
            mermaid.mermaidAPI.render(id, definition, (result) => {
                ref.current.innerHTML = result;
            });
            setReady(ready => ready + 1);
        }
    }, [definition]);

    return (
        <>
            <div key="faux" id={id}/>
            <div key='preview' ref={ref}/>
        </>
    )
}