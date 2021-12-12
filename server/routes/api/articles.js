const express = require('express');
const router = express.Router();
require('dotenv').config();

const { Article } = require('../../models/article');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');

const { sortArgsHelper } = require('../../utils');

router.route('/admin/add-articles').post(checkLoggedIn, grantAccess('createAny', 'article'), async (req, res, next) => {
    try {
        const article = new Article({
            ...req.body,
            score: parseInt(req.body.score)
        })
        const result = await article.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/admin/:id')
.get(checkLoggedIn, grantAccess('readAny', 'article'), async (req, res, next) => {
    try {
        const {id} = req.params;

        if (!id) res.status(400).json({message: 'There is no id'});

        const article = await Article.findById(id);

        if (!article) res.status(400).json({message: 'There is no such article'});
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
})
.patch(checkLoggedIn, grantAccess('updateAny', 'article'), async (req, res, next) => {
    try {
        const {id} = req.params;

        if (!id) res.status(400).json({message: 'There is no id'});

        const article = await Article.findByIdAndUpdate(
            {_id: id},
            {'$set': {...req.body}},
            {new: true});

        if (!article) res.status(400).json({message: 'There is no such article'});
        res.status(200).json(article);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
})
.delete(checkLoggedIn, grantAccess('deleteAny', 'article'), async (req, res, next) => {
    try {
        const {id} = req.params;

        if (!id) res.status(400).json({message: 'There is no id'});

        const response = await Article.findByIdAndDelete(id);
        if (!response) res.status(400).json({message: 'There is no such article'});

        const limit = req.body.limit || 10;
        const query = Article.aggregate()
        const options = {
            page: 1,
            limit,
            sort: {
                _id: 'desc'
            }
        }
        const articles = await Article.aggregatePaginate(query, options);
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

// no auth required
router.route('/get-article-by-id/:id').get(async (req, res, next) => {
    try {
        const {id} = req.params;
        Article.find({status: 'public', _id: id}).then(([article]) => {
            res.status(200).json(article);
        }).catch(() => {
            res.status(400).json({message: 'There is no such article'});
        })
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/get-articles').get(async (req, res, next) => {
    try {
        const articles = await Article.find({status: 'public'});
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/load-more').post(async (req, res, next) => {
    try {
        const {sortBy, order, limit, skip} = sortArgsHelper(req.body);

        const articles = await Article
            .find({status: 'public'})
            .skip(skip)
            .sort([[sortBy, order]])
            .limit(limit);

        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/admin/paginate').post(checkLoggedIn, grantAccess('readAny', 'articles'), async (req, res, next) => {
    try {
        const limit = req.body.limit || 5;
        const query = Article.aggregate()
        const options = {
            page: req.body.page,
            limit,
            sort: {
                _id: 'desc'
            }
        }
        const articles = await Article.aggregatePaginate(query, options);
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

module.exports = router;