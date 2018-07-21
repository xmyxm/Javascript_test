const now = Date.now()
const pr = Promise.resolve('机智')
pr.then(res => {
	console.log(res + (Date.now() - now))
})
let count = 10000000000
while(count){
	--count
}
console.log('循环结束!')




