import React from 'react'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import {Link} from 'react-router-dom';

const CardEngineer = (props) => {
  return (
    <div className="card card-pin">
      <img className="card-img" src={props.img} alt="Card image" />
      <div className="overlay">
        <h2 className="card-title title">{props.title}</h2>
        <p>Erdin Keren Banget</p>
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
        <div className="more">
          <Link to="engineer/1">
            <FaArrowAltCircleRight /> More </Link>
        </div>
      </div>
    </div>
  )
}

CardEngineer.defaultProps = {
  title: 'Title',
  img: 'https://www.pngfind.com/pngs/m/110-1102775_download-empty-profile-hd-png-download.png'
}



export default CardEngineer