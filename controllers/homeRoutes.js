const router = require('express').Router();
const { User } = require('../models');
const { Post } = require('../models');
const { Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
        model: User,
        attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((posts) => posts.get({ plain: true }));
    console.log(posts)

    res.render('homepage', {
      posts,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment
        }
      ],
    });

    const post = postData.get({ plain: true });
    for (let i = 0; i < post.comments.length; i++) {
      if (post.comments[i].username === req.session.username) {
        post.comments[i].displayDelete = true;
      }
    }
console.log(post)
    res.render('post', {
      ...post,
      user_id: req.session.user_id,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch
   (err) {
    res.status(500).json(err);
  }
});

router.post('/dashboard', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username
    });
    console.log(req.session)
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;