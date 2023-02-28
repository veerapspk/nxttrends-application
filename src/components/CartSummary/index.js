// Write your code here

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const itemCount = cartList.length
      const totalAmountList = cartList.map(each => each.price * each.quantity)
      const totalAmount = totalAmountList.reduce((acc, curr) => acc + curr)

      return (
        <div className="total-cart-container">
          <h1 className="amount-head">
            Order total: <span className="amount">RS {totalAmount}/- </span>
          </h1>
          <p className="cart-count">{itemCount} Items in cart </p>

          <button type="button" className="cart-order-btn">
            Proceed to Pay
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
