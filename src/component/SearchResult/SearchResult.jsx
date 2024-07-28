import React from "react";
import styled from "styled-components";
import { BASE_URL } from "../../App";


const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <FoodCards>
        {data?.map((food) => (
          <FoodCard key={food.name}>
            <div className="food_image">
            <img src={`${BASE_URL + food.image }`} alt={food.name} />            </div>
           
            </FoodCard>
        ))}
      </FoodCards>
    </FoodCardContainer>
  );
};

export default SearchResult;

const FoodCardContainer = styled.section`
  height: calc(100vh - 240px);
  background-image: url("/bg.jpg");
  background-size: cover;
`;

const FoodCards = styled.div``;
const FoodCard = styled.div``;
