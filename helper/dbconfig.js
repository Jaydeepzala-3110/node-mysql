import mysql from "mysql";

class DatabaseConfig {
    constructor() {
        this.connection = undefined;
        this.config = {};
    }

    createConnection() {
        this.setConfig();

        if (!this.validateConfig()) {
            return new Error("Enter valid credentials...")
        }

        this.connection = mysql.createConnection(this.config)
    }

    getConnection() {
        if (!this.connection) this.createConnection();
        console.log("db is connected...")
        return this.connection;
    }

    setConfig() {
        return this.config = {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        }

    }

    getConfig() {
       return this.config;
    }

    validateConfig() {
     const {host , user , password , database} = this.config;
     return (
         host && user && password && database
     )
    }

    executeQuery(queryString , params = []) {
        return new Promise((resolve , reject) => {
            if (!queryString) {
                console.log("enter a query")
            }

            this.getConnection().query(queryString , params , (error , result) => {
                if (error) reject(error);
                resolve(result)
            })
        })
    }
}

export const Database = new DatabaseConfig();
