import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Order from './Order'
import MenuAdmin from './MenuAdmin'
import sampleBurgers from '../sample-burgers'
import Burger from './Burger'
import base from '../base'
import SignIn from './Auth/SignIn'
import firebase from 'firebase'

class App extends Component {
  static propTypes = {
    match: PropTypes.object
  }

  state = {
    burgers: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match

    const localStorageRef = localStorage.getItem(params.restaurantId)

    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) })
    }

    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: 'burgers'
    })
  }

  componentDidUpdate() {
    const { params } = this.props.match
    localStorage.setItem(params.restaurantId, JSON.stringify(this.state.order))
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  addBurger = (burger) => {
    console.log('addBurger', burger)

    // Делаем копию объекта state
    const burgers = { ...this.state.burgers }
    // Добавить новый бургер в переменную бургерс
    burgers[`burger${Date.now()}`] = burger
    //
    this.setState({ burgers })
  }

  updatedBurger = (key, updatedBurger) => {
    // Делаем копию объекта state
    const burgers = { ...this.state.burgers }
    // Обновляем нужный burger
    burgers[key] = updatedBurger
    // 
    this.setState({ burgers })
  }

  deleteBurger = (key) => {
    const burgers = { ...this.state.burgers }
    burgers[key] = null
    this.setState({ burgers })
  }

  loadSampleBurgers = () => {
    this.setState({ burgers: sampleBurgers })
  }

  addToOrder = (key) => {
    // 1. Сделать копию объекта state
    const order = { ...this.state.order }
    // 2. Добавить ключ к заказу со значением, либо обновить текущ. знач.
    order[key] = order[key] + 1 || 1
    // 3. Записать наш новый объект order в state
    this.setState({ order })
  }

  deleteFromOrder = (key) => {
    const order = { ...this.state.order }
    delete order[key]
    this.setState({ order })
  }

  handleLogout = async () => {
    await firebase.auth().signOut()
    window.location.reload()
  }

  render() {
    const { burgers, order } = this.state

    return (
      <SignIn>
        <div className='burger-paradise'>
          <div className="menu">
            <Header title='Hot Burgers' />
            <ul className='burgers'>
              {Object.keys(burgers).map(item => {
                return <Burger
                  key={item}
                  index={item}
                  addToOrder={this.addToOrder}
                  details={burgers[item]} />
              })}
            </ul>
          </div>
          <Order
            deleteFromOrder={this.deleteFromOrder}
            burgers={burgers}
            order={order}
          />
          <MenuAdmin
            addBurger={this.addBurger}
            loadSampleBurgers={this.loadSampleBurgers}
            burgers={this.state.burgers}
            updatedBurger={this.updatedBurger}
            deleteBurger={this.deleteBurger}
            handleLogout={this.handleLogout} />
        </div>
      </SignIn>
    )
  }
}

export default App