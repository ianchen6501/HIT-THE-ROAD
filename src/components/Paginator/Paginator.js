import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PaginatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  width: fit-content;
  list-style-type: none;
  padding: 0px;
`;

const PagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
`;

const Page = styled.div`
  font-size: 20px;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  line-height: 30px;

  ${(props) =>
    props.$active &&
    `
    background: ${props.theme.primaryColors.primaryLighter};
  `}
`;

const ControlerContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Previous = styled.div`
  display: inline-block;
  font-size: 40px;
  cursor: pointer;
  line-height: 30px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  ${(props) =>
    props.$inactive &&
    `
    color: ${props.theme.secondaryColors.secondary};
  `}
`;

const Next = styled.div`
  display: inline-block;
  font-size: 40px;
  cursor: pointer;
  line-height: 30px;
  color: ${(props) => props.theme.secondaryColors.secondaryDarker};

  ${(props) =>
    props.$inactive &&
    `
  color: ${props.theme.secondaryColors.secondary};
`}
`;

export default function Paginator({
  posts,
  setCurrentPage,
  currentPage,
  limit,
}) {
  const [paginateArray, setPaginateArray] = useState([]);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    if (posts) {
      const length = posts.length;
      const pagesNumber =
        length % limit
          ? parseInt(length / limit) + 1
          : parseInt(length / limit);
      setPages(pagesNumber);
      const array = [];
      for (let i = 1; i <= pagesNumber; i++) {
        array.push(i);
      }
      setPaginateArray(array);
    }
  }, [posts]);

  function handleSwitchPage(page) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    setCurrentPage(currentPage - 1);
  }

  function handleNext() {
    setCurrentPage(currentPage + 1);
  }

  return (
    <PaginatorContainer>
      <PagesContainer>
        {paginateArray.map((page, index) => (
          <Page
            onClick={() => handleSwitchPage(page)}
            key={index}
            $active={currentPage === index + 1}
          >
            {page}
          </Page>
        ))}
      </PagesContainer>
      <ControlerContainer>
        {currentPage !== 1 ? (
          <Previous onClick={handlePrevious}>&#x025C2;</Previous>
        ) : (
          <Previous $inactive={true}>&#x025C2;</Previous>
        )}
        {currentPage !== pages ? (
          <Next onClick={handleNext}>&#x025B8;</Next>
        ) : (
          <Next $inactive={true}>&#x025B8;</Next>
        )}
      </ControlerContainer>
    </PaginatorContainer>
  );
}
