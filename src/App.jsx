import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchResult from "./component/SearchResult/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const[filterData, setFilterData]= useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(BASE_URL); 
        const json = await response.json();
        setData(json);
        setFilterData(json);
        setLoading(false);
      } catch (error) {

        setError("unable to fetch");
       
      }
    };


  fetchFoodData();
  }, []);

const searchFood= (e)=>{
  const searchValue= e.target.value;
  console.log(searchValue);

  if(searchValue === ""){
    setFilterData(null);
  }

  const filter = data?.filter((food)=>
    food.name.toLowerCase().includes(searchValue.toLowerCase()));
  setFilterData(filter);
}

const filterFood =(type)=>{
if(type ==="all"){
  setFilterData(data);
  setSelectedBtn("all");
  return;
}
const filter = data?.filter((food)=>
  food.type.toLowerCase().includes(type.toLowerCase()));
setFilterData(filter);
setSelectedBtn(type);
};

const filterBtns=[
  {
    name:"All",
    type:"all",
  },
  {
    name:"Breakfast",
    type:"Breakfast",
  },
  {
    name:"Lunch",
    type:"Lunch",
  },
  {
    name:"Dinner",
    type:"Dinner",
  },
];



if(error) return <div>{error}</div>
if(loading) return <div>{loading}</div>

  return (
    <>
  <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>

        <div className="search">
          <input onChange = {searchFood} placeholder="Search Food" />
        </div>
      </TopContainer>
      <FilterContainer>
{
  filterBtns.map((value)=>(
  <Button isSelected={selectedBtn===value.type} key= {value.name} onClick={()=>filterFood(value.type)}>{value.name}</Button>))
}

        
      </FilterContainer>

      </Container>
  
    <SearchResult data = {filterData} />
    </>
  );
};
export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder{
        color: white;
      }
    }
  }

  @media  ( 0 < width < 600px ){
    flex-direction:column;
    height: 80px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;


export const Button = styled.button`
  background: ${({isSelected})=> (isSelected?"#f22f2f":"#ff4343")} ;
  outline: 1px solid  ${({isSelected})=> (isSelected?"white":"#ff4343")} ;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;

  &:hover {
    background: #e63b3b;
  }
`;


const ErrorMessage = styled.p`
 
`;