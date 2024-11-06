import dotenv from 'dotenv'

dotenv.config()

class Config {
    public port: number
    public secret: string

    constructor() {
        this.port = Number(this.getValue('PORT'))
        this.secret = this.getValue('SECRET')
    }

    private getValue(value: string) {
        const env = process.env[value]

        if (!env) {
            throw new Error(`Config [${value}] is missing in .env`)
        }

        return env
    }
}

const config = new Config()

export default config
