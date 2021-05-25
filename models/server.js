const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.routePaths = {
            auth: '/api/auth',
            user: '/api/users',
            category: '/api/categories',
            subcategory: '/api/subcategories',
            product: '/api/products',
            gender: '/api/genders',
            color: '/api/colors',
            brand: '/api/brands',
            search: '/api/search'
        };

        this.connectToDatabase();
        this.middlewares();
        this.routes();
    }

    async connectToDatabase() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.routePaths.user, require('../routes/user'));
        this.app.use(this.routePaths.auth, require('../routes/auth'));
        this.app.use(this.routePaths.category, require('../routes/category'));
        this.app.use(this.routePaths.subcategory, require('../routes/subcategory'));
        this.app.use(this.routePaths.product, require('../routes/product'));
        this.app.use(this.routePaths.gender, require('../routes/gender'));
        this.app.use(this.routePaths.color, require('../routes/color'));
        this.app.use(this.routePaths.brand, require('../routes/brand'));
        this.app.use(this.routePaths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

}


module.exports = Server;