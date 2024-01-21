import Category from "@models/category"



class ControllerCategory {

   async createCategory(req, res) {

        try {
            const category = await Category.create({
                name: req.body.name,
                modelType: req.body.modelType
            })

            res.send(category)
        } catch (error) {
            
        }
    }
}

export default new ControllerCategory()