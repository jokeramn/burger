import React from 'react'
import PropTypes from 'prop-types'


const Header = ({ title }) => {
  return (
    <header className='top'>
      <div className="wrap">
        <div className="headerr-content">

          <div className="header-rating">
            <div className="header-rating_tag">Рейтинг: </div>
            <div className="header-rating_icon">★★★★★</div>
          </div>

          <div className="header-divider"></div>
          <h1 className="font-effect-fire-animation">{title}</h1>
          <h3>
            <span>
              Быстрая доставка горячих
              <span className='sub-header'> #бургеров</span>
            </span>
          </h3>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header