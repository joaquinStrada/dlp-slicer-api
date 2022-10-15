import { config as dotenv } from 'dotenv'
dotenv()

export const config = {
	express: {
		port: process.env.PORT || 3000
	},

	cors: {
		origin: process.env.DOMAIN_APP || '*',
		optionsSuccessStatus: 200
	}
}