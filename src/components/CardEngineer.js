import React from 'react'
import { FaArrowAltCircleRight, FaCheckCircle, FaStar } from 'react-icons/fa'
import {Link} from 'react-router-dom';

const CardEngineer = (props) => {
  return (
    <div className="card card-pin">
      <img className="card-img" src={props.img} alt="Card Personality" />
      
      <div className="overlay">
        <h1 className="card-title title">{props.title}</h1>

          <p className="ml-2">
            <strong>{props.job}</strong> <br/> 
            <small><FaCheckCircle/> : {props.totSuccess === null ? 0 : props.totSuccess} Project | <FaStar/> : {props.rateProj === null ? 0 : props.rateProj }% Success</small> <br/> 
            <small>Skill : {props.skill}</small>
          </p>
       
        <div className="more">
          {JSON.parse(localStorage.getItem('state')).data.userData.id_eng ? ('') : (<Link to={'/detail/' + props.ideng}><FaArrowAltCircleRight /> More Detail</Link>)}
          
        </div>
      </div>
      
    </div>
  )
}

CardEngineer.defaultProps = {
  ideng: 0,
  title: 'Title',
  img: 'https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png',
  job: '-',
  skill: '-',
  totSuccess: 0,
  rateProj: 0,
}



export default CardEngineer