const mongoose = require('mongoose');

const SiteSchema = mongoose.Schema({
    domain: {
        type: 'string',
    },
    user: {
        type: 'object',
    },
    pages: {
        type: 'array',
    },
    header: {
        type: 'object',
    },
    footer: {
        type: 'object',
    },
    blog: {
        type: 'object',
    },
    have_blog: 'number',
}, {
    timestamp: true,
});

module.exports = mongoose.model('Site', SiteSchema);
