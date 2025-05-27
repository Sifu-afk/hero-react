import React from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react"
import Axios from 'axios'



  

const Card = () => {
  const [name, setName] = useState('');
  const [rName, setRName] = useState('');
  const [gottenName, setGottenName] = useState(0);
  const [gottenPhoto, setGottenPhoto] = useState(0)
  const [powerstats, setPowerstats] = useState(0)
  const [noName, setNoName] = useState('not valid name');
  const [isVisible, setIsVisible] = useState(false)
  const [liked, setLiked] = useState(false);




  const fetchData = (id = null) => {
  const url = id ? `https://superheroapi.com/api.php/18f875092e4ed2763919c4e1e71c3514/${id}` : `https://superheroapi.com/api.php/18f875092e4ed2763919c4e1e71c3514/search/${name}`;

  Axios.get(url)
    .then(res => {
      const data = res.data.results ? res.data.results[0] : res.data;

      if (res.data.response === "success"){
        setGottenName(data.name);
        setGottenPhoto(data.image.url)
        setPowerstats(data.powerstats)
        setIsVisible(true);
        setNoName('')
      }else{
        setGottenName('')
        setIsVisible(false);
        toast.error('Not a valid name')
      }
    })
    .catch((err) =>{
      console.error(err)
      setGottenName('')
      toast.error('Something went wrong')
      setIsVisible(false);
    })
    
  };
  
  return (

    

    <div className="card">

        <div className="inputCard">

          <input className="input" type="text" placeholder="ex. Iron Man" onChange={(event) => {setName(event.target.value)}}/>
          <button className="button" onClick={() => (fetchData())}>Press me</button>
          <button className="ranButton" onClick={() => {
            const id = Math.floor(Math.random() * 100);
            fetchData(id);
          }}>Random Hero</button>

        </div>

    {  isVisible &&  <div className="heroCard">

          <div className="cardTitle">

          <h2 className="heroName">{gottenName || noName}</h2>
          <button className="likeButton" onClick={() => {
            setLiked(!liked);
            if (!liked && gottenName){
              localStorage.setItem('likedHero', gottenName)
              toast.success(`${gottenName} saved to favorites`)
            }else{
              localStorage.removeItem('likedHero')
              toast.info('Removed from favorites')
            }
          }}> {liked ? '❤️' : '🤍'}</button>

          </div>
          
          <img className="heroPhoto" src={gottenPhoto} alt="" />

          <p className="heroStats">
              {Object.entries(powerstats).map(([key, value]) => (
                <span key={key}>
                  {key}: {value}<br />
                </span>
              ))}
          </p>
        </div>}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
    </div>
  )
}

export default Card