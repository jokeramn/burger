import React, { Component } from 'react'
import AddBurgerForm from './AddBurgerForm'
import EdditBurgerForm from './EdditBurgerForm'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'

class MenuAdmin extends Component {
  static propTypes = {
    burgers: PropTypes.object,
    updatedBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
    addBurger: PropTypes.func,
    loadSampleBurgers: PropTypes.func
  }

  state = {
    photo: '',
    user: ''
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user })
      }
    })
  }

  authHandler = async (authData) => {
    const { email, photoURL } = authData.user
    this.setState({ user: email, photo: photoURL })
  }

  render() {
    const { user, photo } = this.state
    const avatar = photo ? photo : "/images/avatar.png"

    return (
      <div className="menu-admin">
        {user ? <div className='login-header'>
          <div className='avatar'>
            <img src={avatar} alt={user} />
          </div>
          <button
            className='buttonLogout'
            onClick={this.props.handleLogout}>
            Выйти
          </button>
        </div> : null}
        <h2>Управление меню</h2>
        {Object.keys(this.props.burgers).map(item => {
          return <EdditBurgerForm
            key={item}
            index={item}
            burger={this.props.burgers[item]}
            updatedBurger={this.props.updatedBurger}
            deleteBurger={this.props.deleteBurger} />
        })}
        <AddBurgerForm addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
      </div>
    )
  }
}

export default MenuAdmin