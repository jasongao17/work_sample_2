import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Mermaid from "./Mermaid";

import {renderClassInfo, methodNameHelper} from './classInfoRender';
import SequenceDialog from "./SequenceDialog";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: "100%",
            height: "75vh"
        },
    },
    input: {
        display: 'none',
    },
}));

const getClassNameById = className => className.split("-")[1];

function ClassDiagramArea(props) {
    const classes = useStyles();

    const {rawJson} = props;

    const [mData, setMData] = React.useState("");
    const [ready, setReady] = React.useState(0);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [className, setClassName] = React.useState(null);
    const [methodName, setMethodName] = React.useState(null);

    const handler = useCallback(event => {
        setClassName(getClassNameById(event.path[2].id));
        setMethodName(methodNameHelper(event.target.innerHTML));
        setDialogOpen(true);
    }, [setClassName, setMethodName, setDialogOpen])

    React.useEffect(() => {
        setMData(renderClassInfo(rawJson));
    }, [rawJson]);

    React.useEffect(() => {
        let methodElements = document.querySelectorAll("[id^=classid-] .classText + line + .classText tspan");
        methodElements.forEach(methodElement => {
            methodElement.addEventListener("click", handler);
            methodElement.style.cursor = "pointer";
        });
    }, [rawJson, handler, ready]);

    return (
        <div className={classes.root}>
            <TransformWrapper
                defaultScale={1.5}
            >
                <TransformComponent>
                    <Mermaid definition={mData} _key={"area"} setReady={setReady}/>
                </TransformComponent>
            </TransformWrapper>
            <SequenceDialog open={dialogOpen} setOpen={setDialogOpen} className={className} methodName={methodName}/>
        </div>
    );
}

export default ClassDiagramArea;
