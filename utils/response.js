const httpStatus = require('http-status');

export default (res, data = {}, code = httpStatus.OK) => res.status(code).json({data})
