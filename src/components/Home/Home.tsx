import React from "react";
import { Card, CardContent, Typography, Link } from "@mui/material";

const Home = () => {
    return (
        <Card sx={{
            minWidth: 275,
            boxShadow: 10,
            marginTop: "50px",
            width: "fit-content",
            marginLeft: "auto",
            marginRight: "auto"
        }}>
            <CardContent>
                <Typography sx={{ fontSize: 32 }} color="text.secondary" gutterBottom>
                    Welcome !
                </Typography>
                <Typography sx={{ fontSize: 24 }} variant="h5" component="div">
                    You are using <Link href="https://alterego.digital">AlterEGO</Link> test task!
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Home;