const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] }
  }
  if (action.type === 'REMOVE_ITEM') {
    const items = state.cart.filter((item) => action.payload !== item.id)
    return { ...state, cart: items }
  }

//   if (action.type === 'INCREASE') {
//     let newItem = state.cart.map((item) => {
//       if (item.id === action.payload) {
//         return { ...item, amount: item.amount + 1 }
//       }
//       return item
//     })
//     return { ...state, cart: newItem }
//   }

//   if (action.type === 'DECREASE') {
//     let newItem = state.cart
//       .map((item) => {
//         if (item.id === action.payload) {
//           return { ...item, amount: item.amount - 1 }
//         }
//         return item
//       })
//       .filter((cartItem) => cartItem.amount !== 0)
//     return { ...state, cart: newItem }
//   }

  if (action.type === 'TOTAL') {
    const { total, amount } = state.cart.reduce(
      (acc, curr) => {
        const { price, amount } = curr
        acc.amount += amount
        acc.total += price * amount

        return acc
      },
      {
        total: 0,
        amount: 0,
      }
    )
    return { ...state, amount, total }
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true }
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, loading: false, cart: action.payload }
  }

  if (action.type === 'TOGGLE_AMOUNT') {
    let newItem = state.cart
      .map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.type === 'decrease') {
            return { ...item, amount: item.amount - 1 }
          }
          if (action.payload.type === 'increase') {
            return { ...item, amount: item.amount + 1 }
          }
        }
        return item
      })
      .filter((cartItem) => cartItem.amount !== 0)
    return { ...state, cart: newItem }
  }
  throw new Error('no matching type exists')
  return state
}

export default reducer
