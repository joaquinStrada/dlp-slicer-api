import NodeStl from 'node-stl'
import stl from 'stl'
import fs from 'fs-extra'

export const stlApi = async (req, res) => {
	const { filePath } = req
	const { data: fileData } = req.files.file

	try {
		// Sacamos la informacion del stl
		const stlInfo = new NodeStl(filePath, {
			density: 1.04
		})

		const infoStl = {
			volume: stlInfo.volume,
			weight: stlInfo.weight,
			area: stlInfo.area,
			boundingBox: {
				width: stlInfo.boundingBox[0],
				height: stlInfo.boundingBox[1],
				depth: stlInfo.boundingBox[2]
			},
			centerOfMass: {
				x: stlInfo.centerOfMass[0],
				y: stlInfo.centerOfMass[1],
				z: stlInfo.centerOfMass[2]
			}
		}

		// Extraemos los puntos del stl 
		const { facets } = stl.toObject(fileData)
		await fs.remove(filePath)

		const dataStl = facets.map(facet => {
			const { normal, verts } = facet
			const [ Nx, Ny, Nz ] = normal

			return verts.map(vert => {
				const [ x, y, z ] = vert

				return {
					x: Nx + x,
					y: Ny + y,
					z: Nz + z
				}
			})
		}).flat()

		// generamos las slices
		let slices = []

		dataStl.forEach(vert => {
			if (!slices.includes(vert.z)) {
				slices.push(vert.z)
			}
		})

		slices.sort((a, b) => a - b)

		slices = slices.map((z, i) => {
			const verts = dataStl.filter(vert => vert.z === z).map(vert => ({
				x: vert.x,
				y: vert.y
			}))

			return {
				index: i + 1,
				height: z,
				verts
			}
		})

		res.json({
			error: false,
			info: infoStl,
			dataLength: slices.length,
			data: slices
		})
	} catch (err) {
		console.error(err)
		res.status(500).json({
			error: true,
			message: 'Ha ocurrido un error'
		})
	}
}