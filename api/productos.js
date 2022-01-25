class productos {
    constructor(array){
        this.array = array
    }

    async getAll() {
        try {
            const All = this.array
            const Lectura = JSON.stringify(All,null,2)
            return Lectura
        } catch (error) {
            console.log(error);
        }
    }

    async getById(data) {
        try {
            const All = this.array
            const Result = All.filter( res => res.id === data)
            if ((Result.length) > 0) {
                return JSON.stringify(Result,null,2)
            } else {
                return JSON.stringify({ error : 'producto no encontrado' },null,2)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async save(product){
        try {
            const All = this.array
            const Id = All.length == 0 ? 1 : All[All.length-1].id +1
            const Add = {id: Id, title: product.title, price: product.price, thumbnail: product.thumbnail}
            All.push(Add)
            return JSON.stringify(Add,null,2)

        } catch {
            console.log(error);
        }
    }
    
    async updateById(id, object) {
        try {
            const All = this.array
            const Filter = All.filter( res => res.id === id)
            const Index = All.findIndex(res => res.id === id)
            if ((Filter.length) > 0) {
                const Delete = All.splice(Index, 1);
                const Update = {id: id, title: object.title, price: object.price, thumbnail: object.thumbnail }
                All.push(Update)

                return (`Modificado:  ${JSON.stringify(Delete,null,2)} por: ${JSON.stringify(Update,null,2)}`)
            } else {
                return JSON.stringify({ error : 'producto no encontrado' },null,2)
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteByID(data) {
        try {
            const All = this.array
            const Index = All.findIndex(res => res.id == data)
            if (Index != -1) {
                const Delete = All.splice(Index, 1);
                return (`Actualizado:  ${JSON.stringify(All,null,2)}  Eliminado el producto: ${JSON.stringify(Delete,null,2)}` )

            } else {
                return JSON.stringify({ error : 'producto no encontrado' },null,2)
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = productos