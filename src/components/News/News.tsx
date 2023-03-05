import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import NewsItem from "./NewsItem/NewsItem";
import { INewsItem } from "../../utils/types";

const itemsPerPage = 5;

const News = () => {
    const [news, setNews] = useState<INewsItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [isReachedLastItem, setIsReachedLastItem] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchNews(page);
    }, [page]);

    const fetchNews = (currentPage: number) => {
        setIsLoading(true);
        const url = `https://jsonplaceholder.typicode.com/posts?_start=${itemsPerPage * (currentPage - 1)}&_limit=${itemsPerPage}`;
        fetch(url)
            .then(response => {
                const totalCountHeaderValue = response.headers.get("x-total-count");
                if (totalCountHeaderValue) setTotalCount(parseInt(totalCountHeaderValue));
                return response.json();
            })
            .then(json => {
                const lastItem = json[json.length - 1];
                if (lastItem.id === totalCount) {
                    setIsReachedLastItem(true);
                }
                setNews(prevValue => [...prevValue, ...json]);
                setIsLoading(false);
            });
    };

    const handleLoadMoreClick = () => {
        setPage(prevValue => prevValue + 1);
    };

    const handleDeleteItem = (id: string) => {
        setNews(prevValue => prevValue.filter(el => el.id !== id));
    };

    return (
        <div style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px"
        }}>
            {news.map(item => <NewsItem key={item.id} data={item} handleDeleteItem={handleDeleteItem} />)}
            {isLoading && <CircularProgress />}
            {(!isLoading && !isReachedLastItem) &&
                <Button variant="contained" onClick={handleLoadMoreClick}>Load more</Button>}
        </div>
    );
};

export default News;