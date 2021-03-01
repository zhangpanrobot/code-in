// https://www.programmersought.com/article/29454343854/
// https://juejin.cn/post/6844903782803832845
// why arrow fucntion not working?  (context, ...args) => {}
Function.prototype.myCall = function(context, ...args) {
  if (typeof this !== 'function') return
  context = typeof context === 'object' ? context: window
  const key = Symbol()
  context[key] = this
  const r = context[key](...args)
  delete context[key]
  return r
}

Function.prototype.myApply = function(context, args) {
  if (typeof this !== 'function') return
  context = typeof context === 'object' ? context: window
  const key = Symbol()
  context[key] = this
  const r = context[key](...args)
  delete context[key]
  return r
}

// https://medium.com/@adambomb/understand-javascript-more-deeply-by-writing-a-bind-function-8b619b242dcc#e815
Function.prototype.alternativeBind = function() {
  const functionBeingBound = this
  const contextBeingBound = [...arguments][0]
  const argsBeingBound = [...arguments].slice(1)
 
  const boundFunction = function() {
    const allArgs = [...argsBeingBound, ...arguments]
    return functionBeingBound.apply(contextBeingBound, allArgs)
  }
  
  const firstLetter = functionBeingBound.name[0].toUpperCase()
  const capitalizedFunctionName = firstLetter + functionBeingBound.name.slice(1)
  
  Object.defineProperty(boundFunction, 'name', { 
    value: 'bound' + capitalizedFunctionName
  })
  
  return boundFunction
}