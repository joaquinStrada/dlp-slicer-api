import '@babel/polyfill'
import app from './app'
import createFolder from './createFolder'

createFolder()

app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'))
})