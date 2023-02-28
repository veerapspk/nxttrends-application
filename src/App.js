import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const checkProduct = cartList.find(each => each.id === product.id)
    if (checkProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prev => ({
        cartList: [
          ...prev.cartList.map(each => {
            if (each.id === product.id) {
              return {...each, quantity: each.quantity + product.quantity}
            }
            return each
          }),
        ],
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: [...prev.cartList.filter(each => each.id !== id)],
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = (quantity, id) => {
    if (quantity > 1) {
      this.setState(prev => ({
        cartList: [
          ...prev.cartList.map(each => {
            if (each.id === id) {
              return {...each, quantity: quantity - 1}
            }
            return each
          }),
        ],
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  incrementCartItemQuantity = (quantity, id) => {
    this.setState(prev => ({
      cartList: [
        ...prev.cartList.map(each => {
          if (each.id === id) {
            return {...each, quantity: quantity + 1}
          }

          return each
        }),
      ],
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />

          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
