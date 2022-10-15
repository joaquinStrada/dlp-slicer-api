const path = require('path')
const fs = require('fs')


const main = () => {
	const readFile = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8')
	const outputFile = readFile.split('\r\n').join('').split(' ').join('')

	fs.writeFileSync(path.join(__dirname, 'data.txt'), outputFile)
}

main()