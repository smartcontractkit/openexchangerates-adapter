const request = require('request')

const createRequest = (input, callback) => {
  let url = 'https://openexchangerates.org/api'
  const endpoint = input.data.endpoint || 'convert'
  const amount = input.data.amount || '1'
  const from = input.data.from || 'GBP'
  const to = input.data.to || 'USD'
  url = `${url}/${endpoint}/${amount}/${from}/${to}`

  const queryObj = {
    app_id: process.env.API_KEY
  }

  const options = {
    url: url,
    qs: queryObj,
    json: true
  }
  request(options, (error, response, body) => {
    if (error || response.statusCode >= 400) {
      callback(response.statusCode, {
        jobRunID: input.id,
        status: 'errored',
        error: body,
        statusCode: response.statusCode
      })
    } else {
      const result = body.response
      body.result = result
      callback(response.statusCode, {
        jobRunID: input.id,
        data: body,
        result: result,
        statusCode: response.statusCode
      })
    }
  })
}

exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}

module.exports.createRequest = createRequest
