const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic
		let productos = products;
		return res.render('products',{productos})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find (function (product) {
			return product.id == req.params.productId
		})
		return res.render ('detail', {product});
	},

	// Create - Form to create
	create: (req, res) => {

        //version vieja
        //let user ={
        //id:"",
        //email:req.body.email,
        //password: req.body.password,}

       // delete req.body.retypePassword;Â¡ si tuviera retypepass
        return res.render('create')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = fs.readFileSync(path.join(__dirname,'..','data','productsDataBase.json'),'utf-8');
        products = JSON.parse(products);
		let product = {
			id: ""+products.length,//esto no va si borro un producto y vuelvo a crear se pisan ids
			...req.body,
        }
        
        

       
  
       products =[...products,product]; 
       products =JSON.stringify(products, null,' ');
		fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'), products);
		return res.redirect('/');
	
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = fs.readFileSync(path.join(__dirname,'..','data','productsDataBase.json'),'utf-8');
		products = JSON.parse(products);
		let producto = products.find(producto =>{
			return producto.id == req.params.productId
		})
		return res.render('edit', {producto});
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let products = fs.readFileSync(path.join(__dirname,'..','data','productsDataBase.json'),'utf-8');
		products = JSON.parse(products);
		let variableMapeada = products.map(producto=>{
			if(producto.id !=req.params.productId){
				return producto;
			}else{
				let productoEditado = {
					id: producto.id,
					...req.body,
					image : producto.image
				}
				return productoEditado;
			}
			
		})
		products =JSON.stringify(variableMapeada, null,' ');
    	fs.writeFileSync(path.join(__dirname,'..','data','productsDataBase.json'), products);
		return res.redirect('/products/detail/'+req.params.productId);
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let aborrar = req.params.productId;	
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		products.forEach((elem,index)=>{
			if(elem.id == aborrar){
				products.splice(index,1)
				//console.log(elem);
				//console.log("esta en indice:"+index);
			}


		})
			nuevoJson = JSON.stringify(products,null, ' ');
			fs.writeFileSync(productsFilePath, nuevoJson);
			
		
			

		return res.redirect('/products');

	}
};

module.exports = controller;