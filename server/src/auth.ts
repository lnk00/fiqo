import { betterAuth } from "better-auth";
import { Pool } from "pg";
import "dotenv/config";

export const auth = betterAuth({
	database: new Pool({
		connectionString: process.env.DB_URL,
		ssl: true,
	}),
	emailAndPassword: {
		enabled: true,
	},
});
