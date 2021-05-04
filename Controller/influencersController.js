const Influencer =require("../Model/influencers")
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){//dung de tim nguoi
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){// sap xep nguoi
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){//chuyen trang trong trang nguoi
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}
const influencerCtrl = {
    getInfluencer: async(req, res) =>{
        try {
            const features = new APIfeatures(Influencer.find(), req.query)
            .filtering().sorting().paginating()

            const influencers = await features.query

            res.json({
                status: 'success',
                result: influencers.length,
                influencer: influencers
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createInfluencer: async(req, res) =>{
        try {
            const {influencer_id, facebook,address,name,images,instagram,tiktok} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const influencer = await Influencer.findOne({influencer_id})
            if(influencer)
                return res.status(400).json({msg: "This influencer already exists."})

            const newInfluencer = new Influencer({
                influencer_id, name: name.toLowerCase(), tiktok, instagram,facebook, images,address
            })

            await newInfluencer.save()
            res.json({msg: "Created a influencer"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteInfluencer: async(req, res) =>{
        try {
            await Influencer.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a influencer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateInfluencer: async(req, res) =>{
        try {
            const {influencer_id, facebook,address,name,images,instagram,tiktok} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Influencer.findOneAndUpdate({_id: req.params.id}, {
                name: name.toLowerCase(),  tiktok, instagram,facebook, images,address
            })

            res.json({msg: "Updated a influencer"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = influencerCtrl