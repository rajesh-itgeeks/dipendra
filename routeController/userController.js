const userModel = require('../model/userModel')
const { v4: uuidv4 } = require('uuid');
const Utils = require('../db/utils.js');
const { SuccessMassage, ErrorMassage } = require('../constant/massage.js');
const bcrypt = require('bcrypt');
const statusCode = require('../constant/statusCode.js');
const saltRounds = 10;
const { Op } = require('sequelize');

exports.createUser = async (req, res) => {
    try {
        // generate uui id got userId  
        const uuid = uuidv4();

        let password = req.body.password;


        const userData = {
            Id: uuid,
            userName: req.body.userName,
            email: req.body.email,
            password: password,
            phoneNumber: req.body.phoneNumber
        }
        const checkEmail = await userModel.findOne({ where: { email: userData.email }, });
        if (checkEmail) {
            return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.EXIST_EMAIL);
        }
        const checkPhone = await userModel.findOne({ where: { phoneNumber: userData.phoneNumber } })
        if (checkPhone) {
            return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.EXIST_PHONE)
        }

        const userDetails = await userModel.create(userData);

        if (!userDetails) {
            return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.USER_NOT_CREATED)
        }
        // delete userDetails.result.password
        delete userDetails.dataValues.password
        return Utils.sendResponse(res, statusCode.CREATED, true, SuccessMassage.USER_CREATED, userDetails);
    } catch (error) {
        console.log(error);
        return Utils.sendResponse(res, statusCode.SERVER, false, ErrorMassage.INTERNAL_SERVER_ERROR);
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        }
        if (userData.email) {
            const checkEmail = await userModel.findOne({ where: { email: userData.email, Id: userId }, });
            if (!checkEmail) {
                return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.EXIST_EMAIL);
            }
        }
        if (userData.phoneNumber) {
            const checkPhone = await userModel.findOne({ where: { phoneNumber: userData.phoneNumber, Id: userId } })
            if (!checkPhone) {
                return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.EXIST_PHONE)
            }
        }

        await userModel.update({ ...userData }, { where: { Id: userId } });
        return Utils.sendResponse(res, statusCode.CREATED, true, SuccessMassage.USER_UPDATED)
    } catch (error) {
        console.log(error);
        return Utils.sendResponse(res, statusCode.SERVER, false, ErrorMassage.INTERNAL_SERVER_ERROR);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const checkUser = await userModel.findOne({ where: { Id: userId }, });
        if (!checkUser) {
            return Utils.sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMassage.USER_NOT_FOUND);
        }

        await userModel.destroy({ where: { Id: userId } })
        return Utils.sendResponse(res, statusCode.CREATED, true, SuccessMassage.USER_DELETED)
    } catch (error) {
        console.log(error);
        return Utils.sendResponse(res, statusCode.SERVER, false, ErrorMassage.INTERNAL_SERVER_ERROR);
    }
}

exports.getList = async (req, res, next) => {
    try {
        let { query, limit, offset } = req.query;

        limit = !limit ? undefined : limit;
        console.log(req.query, limit, "hjhjhj")
        const result = await userModel.findAndCountAll({
            where: query === undefined ? {} : {
                [Op.or]: [
                    {
                        userName: {
                            [Op.iLike]: '%' + query + '%'
                        }
                    },
                    {
                        email: {
                            [Op.iLike]: '%' + query + '%'
                        }
                    },
                    {
                        phoneNumber: {
                            [Op.iLike]: '%' + query + '%'
                        }
                    }
                ]
            },
            attributes: { exclude: ['password'] },
            distinct: true,
            limit: limit === undefined ? 100 : limit,
            offset: offset === undefined ? 0 : offset,
            order: [['createdAt', 'DESC']]
        })
        next()
        return Utils.sendResponse(res, statusCode.OK, true, SuccessMassage.FATCHED_LIST, result);

    } catch (error) {
        console.log(error);
        return Utils.sendResponse(res, statusCode.SERVER, false, ErrorMassage.INTERNAL_SERVER_ERROR);
    }
}