import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {API_METHOD} from "./const";
import Mermaid from "./Mermaid";
import {renderSequenceInfo} from "./sequenceInfoRender";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function SequenceDialog({open, setOpen, className, methodName}) {

    const [mData, setMData] = React.useState("");
    const [ready, setReady] = React.useState(0);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        if (className === null || methodName === null) return;
        setReady(0);
        axios.get(API_METHOD + className + "/sequence/" + methodName).then(response => response.data).then(data => {
            setMData(renderSequenceInfo(data));
            setReady(1);
        }).catch(err => {
            console.log("Fail to retrieve");
        });

    }, [className, methodName]);

    return (
        <Dialog
            open={open} maxWidth={"xl"} fullWidth
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="title">{className + "." + methodName}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {ready === 0 ?
                        <CircularProgress color="inherit"/>
                        : <Mermaid definition={mData} _key={"sequence"} setReady={setReady}/>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
