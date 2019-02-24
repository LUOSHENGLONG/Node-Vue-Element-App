const express = require('express')
// gravatar 获取头像
const gravatar = require('gravatar')
// bcrypt 对密码加密
// const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport');

const keys = require('../../config/keys')

const User = require('../../models/User')

// 测试API
// router.get('/text', (req, res) => {
//     res.json({ msg: 'success'})
// })

// @route 请求方式：POST 请求路径：api/users/register
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/register', (req, res) => {
    // 获取注册邮箱
    const email = req.body.email
    // 获取用户名
    const username = req.body.username
    // 获取密码
    const password = req.body.password
    // 获取注册身份
    const identity = req.body.identity
    console.log(email,username,password,identity)
    // 查询邮箱是否已注册
    User.findOne({ email: email }).then(user => {
        if( user ){
            // user存在 则代表邮箱已被注册
            return res.json({ code: 0, msg: '邮箱已注册'})
        } else {
            // user不存在 则可以注册
            // 获取头像
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })
            // 创建User对象
            const newUser = new User({
                email: email,
                name: username,
                avatar,
                password: password,
                identity: identity
            })

            newUser
                .save()
                .then(user => res.json({ code: 1, msg: '注册成功'}))
                .catch(err => console.log(err))
            // 使用bcrypt对密码加密并提交的数据库
            // bcrypt.genSalt(10, (err, salt) => {
            //     bcrypt.hash(newUser.password, salt, (err, hash) => {
            //         if(err) throw err
            //         // hash 则为加密后的password
            //         newUser.password = hash

            //         // 提交User
            //         newUser
            //             .save()
            //             .then(user => res.json(user))
            //             .catch(err => console.log(err))

            //     })
            // })
        }

    })
})


// @route 请求方式：POST 请求路径：api/users/login
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(email, password)
    User.findOne({ email: email}).then(user => {
        if(!user) {
            return res.json({ code: 0, msg: '邮箱不存在'})
        }
        if(user.password === password) {
            const rule = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                identity: user.identity
            }
            jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.json({ code: 1, msg: '登录成功', token: 'Bearer ' + token })
            })
            
        } else {
            res.json({ code: 0, msg: '密码错误'})
        }
    })
})

//验证token
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    // 如果passport是done(null,user) 即返回回来的是查询的用户信息。则res.send，否则箭头函数不执行
    res.json({success:true});
})

module.exports = router
