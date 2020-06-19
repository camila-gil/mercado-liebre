const jsonModel = require('../models/jsonModel');
const productModel = jsonModel('productsDataBase');


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		const visited = productModel.filterBySomething(product => product.category == "visited")

		const inSale = productModel.filterBySomething(product => product.category == "in-sale")

		return res.render('index', {visited, inSale})
	},


	search: (req, res) => {
		const busqueda = req.query.keywords;
	
		const products = productModel.filterBySomething(product => product.name == busqueda)

		return res.render('results', {busqueda, products})

	},
};

module.exports = controller;
