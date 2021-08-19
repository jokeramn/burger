import React, { Component } from 'react'
import AddBurgerForm from './AddBurgerForm'

class MenuAdmin extends Component {
  render() {
    return (
      <div className="menu-admin">
        <h2>Управление меню</h2>
        <AddBurgerForm addBurger={this.props.addBurger} />
        <button onClick={this.props.loadSampleBurgers}>Загрузить бургеры</button>
      </div>
    )
  }
}

export default MenuAdmin