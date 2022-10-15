import path from 'path'
import { v4 as uuid } from 'uuid'
import moveFile from '../lib/moveFile'

const validateFile = async (req, res, next) => {
	if (!req.files || !req.files.file) {
		return res.status(400).json({
			error: true,
			message: 'Debe enviar un archivo para analizar'
		})
	}

	const { name } = req.files.file
	const ext = path.extname(name)

	if (ext !== '.stl') {
		return res.status(400).json({
			error: true,
			message: 'El archivo debe ser un stl'
		})
	}

	const filePath = path.join(__dirname, `../public/uploads/${uuid()}${ext}`)

	try {
		req.filePath = await moveFile(req.files.file, filePath)
		next()
	} catch (err) {
		console.error(err)
		res.status(500).json({
			error: true,
			message: 'Ha ocurrido un error'
		})
	}
}

export default validateFile