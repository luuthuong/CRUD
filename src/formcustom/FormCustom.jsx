import { Box, Button, Container, TextField } from "@mui/material";

import React, { forwardRef,useState } from "react";


import "./formcustom.css";

const custombox = {
    width: 400,
    borderRadius: "10px",
    background: "#2c3e50",
    position: "fixed",
    top: "40%",
    padding: "10px",
};

const FormCustom = (props) => {

const [data,setData]=useState({
    first_name:props.data.first_name||'',
    last_name:props.data.last_name||'',
    avatar:props.data.avatar||'',
    email:props.data.email||'',
    id:props.data.id||''
});

const listInputForm=[
    {
        label:'First Name',
        value:data.first_name,
        onChange:(e)=>setData({...data,first_name:e.target.value})
    },
    {
        label:'Last Name',
        value:data.last_name,
        onChange:(e)=>setData({...data,last_name:e.target.value})
    },
    {
        label:'Email',
        value:data.email,
        onChange:(e)=>setData({...data,email:e.target.value})
    },
    {
        label:'URL Image',
        value:data.avatar,
        onChange:(e)=>setData({...data,avatar:e.target.value})
    },
]

    return (
        <Container
            fixed
            sx={custombox}
            className={`formcustom ${props.activeClass ? "active" : ""}`}
        >
            <Box
                style={{
                    display: "grid",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {
                    listInputForm&&(
                        listInputForm.map((item,index)=>{
                            return  <TextField
                            id="outlined-basic"
                            label={item.label}
                            sx={{ input: { color: '#fff' } }}
                            value={item.value}
                            variant="outlined"
                            onChange={(e)=>item.onChange(e)}
                        />
                        })
                    )
                }
                {/* <input type="file"/> */}
            </Box>
            <Box
                sx={{
                    mt: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={()=>props.handleData(data)}
                >
                    {
                        props.actionContent
                    }
                </Button>
                <Button
                    onClick={props.onCancel}
                    variant="contained"
                    color="error"
                >
                    CANCEL
                </Button>
            </Box>
        </Container>
    );
};

export default FormCustom;
