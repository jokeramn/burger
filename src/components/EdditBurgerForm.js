import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class EdditBurgerForm extends Component {
  static propTypes = {
    burger: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number
    }),
    index: PropTypes.string,
    updatedBurger: PropTypes.func,
    deleteBurger: PropTypes.func,
  }

  handleChange = (e) => {
    const updatedBurger = {
      ...this.props.burger,
      [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) || 0 : e.target.value
    }
    this.props.updatedBurger(this.props.index, updatedBurger)
  }

  render() {
    const { name, price, desc, image, status } = this.props.burger

    return (
      <div className='burger-edit'>
        <input onChange={this.handleChange} name='name' type='text' value={name} />
        <input onChange={this.handleChange} name='price' type='text' value={price} />
        <select name='status' className='status' value={status} onChange={this.handleChange} >
          <option value="available">Доступно!</option>
          <option value="unavailable">Не доступно!</option>
        </select>
        <textarea onChange={this.handleChange} name='desc' value={desc} />
        <input onChange={this.handleChange} name='image' type='text' value={image} />
        <button onClick={() => this.props.deleteBurger(this.props.index)}>Удалить из меню</button>
      </div>
    )
  }

}