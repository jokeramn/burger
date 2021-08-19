import React, { Component } from 'react'
import Header from './Header'
import Order from './Order'
import MenuAdmin from './MenuAdmin'
import sampleBurgers from '../sample-burgers'
import Burger from './Burger'
import base from '../base'

class App extends Component {

  state = {
    burgers: {},
    order: {}
  }

  componentDidMount() {
    const { params } = this.props.match
    this.ref = base.syncState(`${params.restaurantId}/burgers`, {
      context: this,
      state: 'burgers'
    })
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

  render() {
    const { burgers, order } = this.state

    return (
      <div className='burger-paradise'>
        <div className="menu">
          <Header title='Hot Burger' />
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
          burgers={burgers}
          order={order}
        />
        <MenuAdmin
          addBurger={this.addBurger}
          loadSampleBurgers={this.loadSampleBurgers} />
      </div>
    )
  }
}

export default App