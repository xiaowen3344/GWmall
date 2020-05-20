import Toast from './Toast'
const obj = {}

 obj.install = function (Vue) {
  // console.log(Toast.$el);
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new 方式 根据组件构造器 可以创建出一个对象
  const toast = new toastContrustor()
  // 3.将组件对象，手动挂载到某个一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el 对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}
export default obj