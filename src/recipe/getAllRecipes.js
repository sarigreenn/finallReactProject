
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"
import { type } from "@testing-library/user-event/dist/type"
import HomePage from "../user/homepage"
import Button from 'react-bootstrap/Button';
import GetAllCategory from "../category/getAllcategory"
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from 'react-bootstrap';
import Header from "../user/header"
import GetAllCategory2 from "../category/getAllCategory2"
const GetAllRecipes = () => {
const isC=useSelector(state=>state.category)
const recipes=useSelector(x=>x.recipes);

  const navig = useNavigate();
  // const [recipes, setRecipes] = useState([])
const dispach=useDispatch();
const [Time,setTime]=useState('')
    const [C,setC]=useState('')
    const [D,setD]=useState('')
 

  useEffect(() => {
    axios.get("http://localhost:8080/api/recipe")
      .then(x => {
        console.log("a",x.data)
        dispach({type:'SET_RECIPES',data:x.data})
      })
      .catch(err => console.log(err))
      .finally()
  }, [])

  const nav = (recipe) => {
    navig("/displayRecipe",{state:recipe})
  }
 const edit=(id,name)=>{
  // navig("/edit",{state:{id}})
  dispach({type:'EDIT_RECIPE',})
 }
const delet=(id,name)=>{
  navig("/delete",{state:{id}})
}


return (

  <div className="container" style={{ maxWidth: "800px" }}>
    <Header />
    <div className="notpizaBackground" style={{ width: "100%" }}>
      <GetAllCategory2 />
      <div className="row mb-4">
        <div className="col-md-4">
          <input className="form-control" type="text" placeholder="Duration" onChange={(e) => setTime(e.target.value)}></input>
        </div>
        <div className="col-md-4 mr-2">
          <input className="form-control" type="number" placeholder="Difficulty" onChange={(e) => setD(e.target.value)}></input>
        </div>
        <div className="col-md-4">
          <input className="form-control" type="number" placeholder="Generated by" onChange={(e) => setC(e.target.value)}></input>
        </div>
      </div>

      <div className="row mt-4">
        {recipes?.map((recipe) => (
          (!isC || (isC.Id == recipe.CategoryId)) &&
          (!Time || (Time == recipe.Duration)) &&
          (!C || (C == recipe.UserId)) &&
          (!D || (D == recipe.Difficulty)) &&
          <div key={recipe.Id} className="col-md-4 mb-4">
            <Card>
              <Card.Img variant="top" src={recipe?.Img} style={{ height: "300px", width: "100%", objectFit: "cover" }} />
              <Card.Body>
                <Card.Title>{recipe?.Name}</Card.Title>
                <Button variant="outline-danger" onClick={() => nav(recipe)}>Details</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
 export default GetAllRecipes;
