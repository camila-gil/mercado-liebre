const fs = require('fs');
const path = require('path');

module.exports = (archivo) => {
    const funciones = {
        path: path.join (__dirname, '..', 'data', archivo + '.json'),
        leerJson: function() {
            const productsJson = fs.readFileSync(this.path, 'utf-8');
            const products = JSON.parse(productsJson)
            return products;
        },
        escribirJson: function(product){
            product = JSON.stringify(product, null, ' ')
            
            fs.writeFileSync(this.path, product);
        },
        guardarUno: function(newData, id){
            // leer todo el json
            let allProducts = this.leerJson();
            // agregar la data
            let newProduct= {
                id: allProducts.length + 1,
                ...newData
            }
            allProducts = [...allProducts, newProduct]
            
            // guardar json
            this.escribirJson(allProducts);
        },
        
        findById: function(id){
            const products = this.leerJson();
            const object = products.find(elem => elem.id == id)
            return object;
        },
        findBySomething: function(callback){
            const products = this.leerJson();
            const product = products.find(callback);
            return product;
        },

        filterBySomething: function(callback){
            const products = this.leerJson();
            const productsFiltered = products.filter(callback);
            return productsFiltered
        },
        edit: function(newData, id){
            let products = this.leerJson();

            // editar
           let newProduct = {
                id: id,
                ...newData
            }

            products = products.map(product => {
                if(product.id == id){
                    newProduct = {
                        ...newProduct,
                        image: product.image
                    }

                    return newProduct;
                }
                return product
            })
            // actualizar
            this.escribirJson(products)
        },
        delete: function(productId){
            let products = this.leerJson();
            let productToDelete = productId
            products.forEach((product, index) => {
                if(product.id == productToDelete){
                    products.splice(index,1)
                }
            })
            this.escribirJson(products)
        }
    }
    return funciones
}


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