import React from 'react'

function Carousels() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide mt-5" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img style ={{height:"60vh"}}src="https://assets.tatacliq.com/medias/sys_master/images/64927657164830.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img style ={{height:"60vh"}} src="https://assets.tatacliq.com/medias/sys_master/images/64927657099294.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img style ={{height:"60vh"}} src="https://assets.tatacliq.com/medias/sys_master/images/64927657361438.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img style ={{height:"60vh"}} src="https://assets.tatacliq.com/medias/sys_master/images/64927657295902.jpg" className="d-block w-100" alt="..."/>
    </div>
    
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}

export default Carousels