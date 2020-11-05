/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

let apiUrl = "https://api.nytimes.com/svc/topstories/v2/";
let apiKey = process.env.REACT_APP_NEWS_API_KEY;
let type = "world.json";

export const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    let api = `${apiUrl}/${type}?api-key=${apiKey}`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
      });
  }, []);

  return (
    news &&
    news.results.splice(0, 5).map((article, index) => {
      return (
        <article key={article.url}>
          <ArticleImages alt={index} src={article.multimedia[0].url} />
          <ArticleUrl href={article.url}>{article.title}</ArticleUrl>
        </article>
      );
    })
  );
};

const ArticleImages = styled.img`
  height: 540px;
`;

const ArticleUrl = styled.a`
  display: block;
  margin-top: 8px;
  margin-bottom: 32px;
  color: #333;
  text-decoration: none;
  font-size: 24px;
`;
