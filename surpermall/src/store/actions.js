import {
    ADD_COUNTER,
    ADD_TO_CART
  } from './mutations-type'

  export default {
    addCart(context, payload) {
      // console.log(payload);
  
      return new Promise((resolve, rejeck) => {
      
        let oldProducr = context.state.cartList.find(item => item.iid === payload.iid)
  
        if (oldProducr) {  //数量加一
          // oldProducr.count += 1
          context.commit(ADD_COUNTER, oldProducr)
          resolve('当前数量+1')
        } else { //添加新的商品
          payload.count = 1
        //   // context.state.carList.push(payload)
          context.commit(ADD_TO_CART, payload)
          resolve("添加了新的商品")
        }
      })
  
    }
  }


//   export default {
//     addCart(context, payload) {
//         return new Promise((resolve, reject) => {
//          let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
 
//         if (oldProduct) {
//             context.commit(ADD_COUNTER, oldProduct)
//             resolve('当前商品数量+1')
//         } else {
//             payload.count =1
//             context.commit(ADD_TO_CART, payload)
//             resolve('添加了新的商品')
//         }
//         })
//     }
//    }