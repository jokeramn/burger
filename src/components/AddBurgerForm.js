import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AddBurgerForm extends Component {

  static propTypes = {
    addBurger: PropTypes.func
  }

  nameRef = React.createRef()
  priceRef = React.createRef()
  statusRef = React.createRef()
  descRef = React.createRef()
  imageRef = React.createRef()

  createBurger = (e) => {
    e.preventDefault()

    const burger = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value || 0),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    }

    this.props.addBurger(burger)
    e.target.reset()
  }


  render() {
    return (
      <form className='burger-edit' onSubmit={this.createBurger}>
        <input ref={this.nameRef} name='name' type='text' placeholder='Name' />
        <input ref={this.priceRef} name='price' type='text' placeholder='Price' />
        <select ref={this.statusRef} name='status' className='status' >
          <option value="available">Доступно</option>
          <option value="unavailable">Убрать из меню</option>
        </select>
        <textarea ref={this.descRef} name='desc' placeholder='Desc' />
        <input ref={this.imageRef} name='image' type='text' placeholder='Image' />
        <button type='submit'>+ Добавить в Меню</button>
      </form>
    )
  }
}

export default AddBurgerForm