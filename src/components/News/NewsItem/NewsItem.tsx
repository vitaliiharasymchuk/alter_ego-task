import React from "react";
import { INewsItem } from "../../../utils/types";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

interface IProps {
    data: INewsItem;
    handleDeleteItem: (id: string) => void;
}

const NewsItem = ({ data, handleDeleteItem }: IProps) => {
    return (
        <Card sx={{ minWidth: 275, boxShadow: 10 }}>
            <CardContent>
                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                    №{data.id}. {data.title.toUpperCase()}
                </Typography>
                <Typography sx={{ fontSize: 14 }} variant="h5" component="div">
                    {data.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="error" onClick={() => handleDeleteItem(data.id)}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default NewsItem;