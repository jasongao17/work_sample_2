import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';


import axios from 'axios';
import {API_UPLOAD, API_CLASS} from "./const";
import ClassDiagramArea from "./ClassDiagramArea";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    }
}));

function App() {
    const classes = useStyles();

    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);

    return (
        <div className={classes.root}>
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    <Step>
                        <StepLabel>Upload</StepLabel>
                        <StepContent>
                            <div className={classes.actionsContainer}>
                                <UploadStep setData={setData} setActiveStep={setActiveStep} />
                            </div>
                        </StepContent>
                    </Step>

                    <Step>
                        <StepLabel>Graph</StepLabel>
                        <StepContent>
                            <div className={classes.actionsContainer}>
                                {false && <Button variant="outlined" color="secondary" component="span" onClick={() => {setActiveStep(0);}}>
                                    Back
                                </Button>}
                                <ClassDiagramArea rawJson={data}/>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        </div>
    );
}

function UploadStep({setData, setActiveStep}) {
    const classes = useStyles();

    const [isProcessing, setIsProcessing] = React.useState(false);

    const onUploadFile = (event) => {
        setIsProcessing(true);
        let formData = new FormData();
        let file = event.target.files[0];
        formData.append("file", file);
        axios.put(API_UPLOAD, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data).then(data => {
            if (data !== "Upload successful") return Promise.reject();
            axios.get(API_CLASS).then(response => response.data).then(data => {
                setData(data);
                setActiveStep(1);
            }).catch(err => {
                console.log("Fail to retrieve");
            });
        }).catch(err => {
            console.log("Fail to upload");
        }).finally(() => {
            setIsProcessing(false);
        });
    }

    return (
        <div>
            <input
                accept="application/zip"
                className={classes.input}
                id="upload"
                type="file"
                onChange={onUploadFile}
            />
            <label htmlFor="upload">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
                <Backdrop className={classes.backdrop} open={isProcessing}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </label>
        </div>);
}

export default App;
