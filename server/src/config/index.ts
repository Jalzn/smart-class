import dotenv from 'dotenv'

dotenv.config()

class Config {
    public port: number

    constructor() {
        this.port = Number(process.env.PORT) ?? 3000
    }
}

const config = new Config()

export default config
