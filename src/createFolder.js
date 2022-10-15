import path from 'path'
import fs from 'fs'

const createFolder = () => {
	const folderPath = path.join(__dirname, 'public/uploads')
	fs.promises.access(folderPath)
		.catch(() => {
			fs.mkdirSync(folderPath, {
				recursive: true
			})
		})
}

export default createFolder