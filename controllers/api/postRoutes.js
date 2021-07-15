const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.post('/:id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.id,
      username: req.session.username
    });
    console.log("IS IT REACHING HERE")
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;