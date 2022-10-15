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
				url: config.swagger.url
			}
		]
	},
	apis: ['./src/routes/*.js']
}