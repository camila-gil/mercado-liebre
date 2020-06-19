const jsonModel = require('../models/jsonModel');
const productModel = jsonModel('productsDataBase')
			
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			
			
const controller = {
	// Root - Show all products
	root: (req, res) => {
		const products = productModel.leerJson();
		res.render('products', {products})
		},
			
	// Detail - Detail from one product
	detail: (req, res) => {
		const product = productModel.findById(req.params.productId)
		return res.render('detail', {product})
	},
			
	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
				
	// Create -  Method to store
	store: (req, res) => {
		productModel.guardarUno(req.body, req.params.productId);
		res.redirect('/products')

	},
			
	// Update - Form to edit
	edit: (req, res) => {
		const product = productModel.findById(req.params.productId);
		return res.render('product-edit-form', {product})
	},
			
	// Update - Method to update
	update: (req, res) => {
		productModel.edit(req.body, req.params.productId);
		return res.redirect('/products/detail/' + req.params.productId);
	},
			
	// Delete - Delete one product from DB
	destroy : (req,res) => {
		productModel.delete(req.params.productId)
		res.redirect('/')
	}

}
			
module.exports = controller;