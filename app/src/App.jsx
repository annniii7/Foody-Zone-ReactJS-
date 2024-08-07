import styled, { isStyledComponent } from "styled-components";
import { useState,useEffect } from "react";
import SearchResult from "./Components/SearchResult/SearchResult";

 export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setdata] = useState(null);
  const [error, seterror] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [filterdata, setfilterdata] = useState(data);
  const [selectedbtn, setselectedbtn] = useState("all")

  
  useEffect(() => {
    const fetchFooddata = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        // console.log(json)
        setdata(json);
        setLoading(false);
      } catch (error) {
        seterror("Unable to set Data");
      }
    };

  fetchFooddata();
  }, [])
  
  const searchFood=(type) => {
    if(type==="all"){
      setfilterdata(null)
      setselectedbtn("all")
      return;
    }
    const filter=data?.filter((food) => (
      food.type.toLowerCase().includes(type.toLowerCase())
     ));
     setfilterdata(filter);
     setselectedbtn(type);
}
  

if(error) return <div>{error}</div>
if(Loading) return <div>Loading...</div>

const searchdata=(e) => {
  const  searchvalue=e.target.value;
  // console.log(searchvalue);

  if(searchvalue ===""){
    setfilterdata(data);
    return;
  }
  const filter=data?.filter((food) => (
   food.name.toLowerCase().includes(searchvalue.toLowerCase())
  ));
  setfilterdata(filter);
}



  return (
    <>
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" />
        </div>
        <div className="search">
          <input onChange={searchdata} type="text" placeholder="Search Food..." />
        </div>
      </TopContainer>
      <FilterContainer>
        <Button onClick={()=>searchFood("all")}>All</Button>
        <Button  onClick={()=>searchFood("Breakfast")}>Breakfast</Button>
        <Button  onClick={()=>searchFood("lunch")}>Lunch</Button>
        <Button  onClick={()=>searchFood("Dinner")}>Dinner</Button>
      </FilterContainer>
    </Container>
     <SearchResult data={filterdata?filterdata:data}/>
     </>
  );
};

export const Container = styled.div`
  background-color: #323334;
  max-width: 1400px;
  margin: 0 auto;
`;
const TopContainer = styled.div`
  background-color: #323334;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .search {
    input {
      padding: 0 20px;
      height: 40px;
      border-radius: 5px;
      background-color: transparent;
      color: white;
      border: 1px solid red;
      font-size: 16px;
      font-weight: normal;
    }

  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
    margin-bottom: 20px;
    gap: 20px;
    margin-top: 10px;
    justify-content: center;

  }
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #ff4343;
  padding: 12px 15px;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
  
`;

export default App;
