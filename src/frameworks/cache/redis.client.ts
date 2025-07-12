import { createClient } from 'redis';
import dotenv from 'dotenv'
import {config} from "@shared/config"
import chalk from 'chalk';

dotenv.config()


export const RedisClient = createClient({
    username: config.redis.REDIS_USERNAME,
    password: config.redis.REDIS_PASS,
    socket: {
        host: config.redis.REDIS_HOST,
        port: parseInt(config.redis.REDIS_PORT)
    }
});

RedisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
	await RedisClient.connect();
	console.log(
		chalk.yellowBright.bold(
			"\t|         " +
				chalk.blueBright.bold("📦 Redis connected successfully!") +
				"            |"
		)
	);
	
})();


