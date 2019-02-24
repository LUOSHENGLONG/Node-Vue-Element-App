const express = require('express')
const router = express.Router()
const passport = require('passport');


const Profile = require('../../models/Profile')

router.get('/text', (req, res) => {
    res.json({ msg: 'success'})
})


// @route 请求方式：POST 请求路径：api/profiles/add
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/add', passport.authenticate("jwt",{session:false}), (req, res) => {
    // 获取类型
    const type = req.body.type
    // 获取描述
    const describe = req.body.describe
    // 获取收入
    const income = req.body.income
    // 获取支出
    const expend = req.body.expend
    // 获取现金
    const cash = req.body.cash
    // 获取备注
    const remark = req.body.remark
    // 查询邮箱是否已注册
    if( !type ) return res.json({code: 0, message: '请完整填写表单'})
    if( !describe ) return res.json({code: 0, message: '请完整填写表单'})
    if( !income ) return res.json({code: 0, message: '请完整填写表单'})
    if( !expend ) return res.json({code: 0, message: '请完整填写表单'})
    if( !cash ) return res.json({code: 0, message: '请完整填写表单'})
    if( !remark ) return res.json({code: 0, message: '请完整填写表单'})
    // 创建Profile对象
    const newProfile = new Profile({
        type: type,
        describe: describe,
        income: income,
        expend: expend,
        cash: cash,
        remark: remark,
    })
    newProfile
        .save()
        .then(user => res.json({ code: 1, message: '表单提交成功'}))
        .catch(err => console.log(err))
})


// @route 请求方式：POST 请求路径：api/profiles/getData
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/getData', passport.authenticate("jwt",{session:false}), (req, res) => {
    Profile.find()
        .then(profile => {
            if (!profile) {
                return res.json({ code:0, message: '没有任何数据'})
            }
            res.json({ code:1, message: '已加载数据', data:profile})
        })
        .catch(error => console.log(error))
})


// @route 请求方式：POST 请求路径：api/profiles/delete
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/delete', passport.authenticate("jwt",{session:false}), (req, res) => {
    const id = req.body.id
    Profile.findOneAndRemove({ _id: id})
        .then(profile => {
            profile.save().then(profile => res.json({ code: 1, msg: '删除成功'}))
        })
        .catch(err => res.json({ code: 0, msg: '删除失败'}))
})

// @route 请求方式：POST 请求路径：api/profiles/edit
// @desc 返回的请求的json数据
// @access 访问权限：public
router.post('/edit', passport.authenticate("jwt",{session:false}), (req, res) => {
    console.log(req.body)
    // 获取id
    const id = req.body.id
    // 获取类型
    const type = req.body.type
    // 获取描述
    const describe = req.body.describe
    // 获取收入
    const income = req.body.income
    // 获取支出
    const expend = req.body.expend
    // 获取现金
    const cash = req.body.cash
    // 获取备注
    const remark = req.body.remark
    // 查询邮箱是否已注册
    if( !type ) return res.json({code: 0, message: '请完整填写表单'})
    if( !describe ) return res.json({code: 0, message: '请完整填写表单'})
    if( !income ) return res.json({code: 0, message: '请完整填写表单'})
    if( !expend ) return res.json({code: 0, message: '请完整填写表单'})
    if( !cash ) return res.json({code: 0, message: '请完整填写表单'})
    if( !remark ) return res.json({code: 0, message: '请完整填写表单'})
    // 创建Profile对象
    const editProfile = {
        type: type,
        describe: describe,
        income: income,
        expend: expend,
        cash: cash,
        remark: remark,
    }
    console.log(editProfile)
    Profile.findOneAndUpdate(
        { _id: id},
        { $set: editProfile},
        { new: true }
    ).then( profile => res.json({ code: 1, message: '更新成功'}))
    .catch( err => res.json({ code: 0, message: '更新失败'}))
})
module.exports = router