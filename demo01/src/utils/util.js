const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function http(url) {
  return new Promise((res, rej) => {
    wx.request({
      url: 'http://localhost:3000' + url, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (data) {
        res(data)
      },
      fail(err) {
        rej(err)
      }
    })
  })
}

function getData() {  
  return new Promise((res, rej) => {
    wx.request({
      url: 'https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427',
      dataType: "jsonp",
      success(data) {
        res(JSON.parse(data.data))
      },
      fail(err) {
        rej(err)
      }
    })
  })
}


module.exports = {
  formatTime: formatTime,
  http,
  getData
}
