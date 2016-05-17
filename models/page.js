var mongoose = require('mongoose')
var PageSchema = require('../schemas/category')
var Page = mongoose.model('Category', PageSchema)

module.exports = Page;