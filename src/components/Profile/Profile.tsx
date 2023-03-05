import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const Profile = () => {
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
                    Profile
                </Typography>
                <Typography sx={{ fontSize: 24 }} variant="h5" component="div">
                    Username: admin
                </Typography>
                <Typography sx={{ fontSize: 24 }} variant="h5" component="div">
                    Password: 12345
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Profile;