import {Button, FormControl,Alert,LinearProgress, Input, InputLabel,Stack,Typography} from '@mui/material'
import {useState} from 'react'
import {RequestService} from "./Services/RequestService"
import "./style.css"
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/core/ButtonUnstyled';
import { styled } from '@mui/system';

export function DeleteLoc(props) {
    const[location,setLocation] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [alertType, setAlertType] = useState("error");
    const [alertText, setAlertText] = useState("!");
    const [showAlert, setShowAlert] = useState(false);

    async function submitHandler(input){
        setIsLoading(true)
        input.preventDefault()

        if (location === ""){
            setShowAlert(true);
            setAlertType("error")
            setAlertText("Please fill all fields")
            setIsLoading(false)
            return
        }
        
        const status = await RequestService.DeleteLoc(location)
        if(status === 0){
            setShowAlert(true);
            setAlertType("success")
            setAlertText("Item Added")
            props.refresh()
        }
        else{
            //req failed
            setShowAlert(true);
            setAlertType("Item")
            setAlertText("Item could not be added.")
        }

        setIsLoading(false)
    }

    //-------------------Button shinnanigins--------------//
    const CustomButtonRoot = styled('button')`
    background-color: transparent;
    padding: 15px 20px;
    border-radius: 10px;
    color: #fff;
    font-weight: 600;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    transition: all 200ms ease;
    cursor: pointer;
    border: 0.5px;
    border-colour: grey;

    &:hover {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.active} {
        background-color: transparent;
    }

    &.${buttonUnstyledClasses.focusVisible} {
        box-shadow: transparent;
        outline: none;
    }

    &.${buttonUnstyledClasses.disabled} {
        opacity: 0.5;
        cursor: not-allowed;
        box-shadow: 0 0 0 0 rgba(0, 127, 255, 0);
    }
    `;
    function CustomButton(props) {
        return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
    }
    //----------------------------------------------------//


 
    return (
        <form onSubmit = {submitHandler}>
        <Stack>
            <Typography variant = "p" class = "normalText">Delete Location</Typography>
             {showAlert && <Alert severity = {alertType}> {alertText}!</Alert>} 
            <FormControl>
              <InputLabel htmlFor = "id" class = "normalText">id</InputLabel>
                <Input autoComplete="off" disabled = {isLoading} id = "loc" value = {location} onChange = {(e) => setLocation((e.target.value))} />
            </FormControl>
            {isLoading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="inherit" />
            </Stack>}

            <Stack direction = 'row' justifyContent="space-evenly">
                <Button disabled={isLoading} class = "redText" type = "submit">Delete</Button>
                <CustomButton disabled = {isLoading} onClick = {(e)=>{props.setShowDeleteItem(false)}}>Close</CustomButton>
            </Stack>
            
        </Stack>
        </form>
    )
}