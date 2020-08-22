const { Banner } = require('../models')

class BannerController {
    static getBanners(req, res, next) {
        Banner.findAll({ order: [['id', 'ASC']] })
        .then(banners=>{
            res.status(200).json({banners})
        })
        .catch(next)
    }
    static bannerCreate(req, res, next) {
        const { name, img_url} = req.body
        Banner.create({
            name,
            img_url
        }).then(banner => {
            res.status(201).json(banner)
        }).catch(next)
    }
    static updatebanner(req, res, next) {
        const id = req.params.id
        const { name, img_url } = req.body
        Banner.update({
            name,
            img_url
        }, { where: {id} })
        .then(response => {
            if(response[0] === 1) {
                res.status(200).json({message: "banner has been updated"})
            } else {
                throw { errorCode: 'errorUpdate', message: 'banner not found', status: 404 }
            }
        })
        .catch(next)
    }
    static deletebanner(req, res, next) {
        const id = req.params.id
        Banner.destroy( { where: {id} } )
        .then(response => {
            if(response === 1) {
                res.status(200).json({message: "banner has been deleted"})
            } else {
                throw { errorCode: 'errorDelete', message: 'banner not found', status: 404 }
            }
        })
        .catch(next)
    }
}

module.exports = BannerController