import fs from 'fs'
import path from 'path'

const moveFile = (file, filePath) => {
	return new Promise((resolve, reject) => {
		fs.promises.access(filePath)
			.then(() => reject(new Error(`File ${path.basename(filePath)} already exists`)))
			.catch(() => {
				file.mv(filePath, err => {
					if (err) {
						reject(err)
					} else {
						resolve(filePath)
					}
				})
			})
	})
}

export default moveFile