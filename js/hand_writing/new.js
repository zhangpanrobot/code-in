// https://juejin.cn/post/6844903782803832845
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// https://www.programmersought.com/article/60703567002/
function Animal(type) {
  this.type = type
}
Animal.prototype.say = function() {
  console.log('say')
}

function mockNew (func) {
  let newObj = Object.create(func.prototype) // Create a new object inherited from func.prototype
  let returnObj = func.apply (newObj, Array.prototype.slice.call(arguments, 1)) // Intercept the second and new parameters of the new1 function, execute the transformation function func in the scope of newObj
  // If the returnObj after the execution of the constructor passed in the parameter is of type "object" (such as new1 (Object)), then this object will replace newObj as the returned object
  if ((typeof returnObj === "object" || typeof returnObj === "function") && ret !== null) {
    return returnObj
  }
  return newObj
}

let animal = mockNew(Animal, 'dog')
  
console.log(animal.type) // dog
animal.say() // say