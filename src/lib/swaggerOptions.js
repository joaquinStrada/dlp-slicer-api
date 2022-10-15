import apiInfo from '../../package.json'
import { config } from './config'

export const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Stl Slicer',
			description: apiInfo.description,
			version: apiInfo.version
		},
		servers: [
			{
				url: process.env.DOMAIN_API || `http://localhost:${config.express.port}`
			}
		]
	},
	apis: ['./src/routes/*.js']
}