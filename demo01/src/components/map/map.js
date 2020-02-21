// components/map/map.js
import * as echarts from "../ec-canvas/echarts.js"
import { http } from '../../utils/util';
let areaObj = {}
const PIN = {
  '中国': 'china',
  '北京': 'beijing',
  '湖北': 'hubei',
  '广东': 'guangdong',
  '浙江': 'zhejiang',
  '河南': 'henan',
  '湖南': 'hunan',
  '重庆': 'chongqing',
  '安徽': 'anhui',
  '四川': 'sichuan',
  '山东': 'shandong',
  '吉林': 'jilin',
  '福建': 'fujian',
  '江西': 'jiangxi',
  '江苏': 'jiangxu',
  '上海': 'shanghai',
  '广西': 'guangxi',
  '海南': 'hainan',
  '陕西': 'shanxis',
  '河北': 'hebei',
  '黑龙江': 'heilongjiang',
  '辽宁': 'liaoning',
  '云南': 'yunnan',
  '天津': 'tianjin',
  '山西': 'shanxi',
  '甘肃': 'gansu',
  '内蒙古': 'neimenggu',
  '台湾': 'taiwai',
  '澳门': 'aomen',
  '香港': 'xianggang',
  '贵州': 'guizhou',
  '西藏': 'xizang',
  '青海': 'qinghai',
  '新疆': 'xinjiang',
  '宁夏': 'ningxia'
}
let option = {
  title: {
    text: "珠峰培训"
  },
  series: [
    {
      name: "确诊人数",
      type: "map",
      map: 'china',
      label: {
        show: true,
        color: "#333",
        fontSize: 8
      },
      itemStyle: {
        areaColor: '#eee'
      },
      emphasis: {
        label: {
          color: '#fff',
          fontSize: 9
        },
        itemStyle: {
          areaColor: "#00f"
        }
      },
      data: [
        {
          name: '北京',
          value: 0
        }
      ]
    },
  ],
  visualMap:[
    {
      type: 'piecewise',
      pieces: [{min: 10000}, {min: 1000, max: 9999}, {min: 100, max: 999}, {min: 10, max: 99}, {min: 1, max: 9}],
      textStyle: {
        fontSize: 8
      },
      inRang: {
        symbol: 'rect',
        color: ['pink', 'red']
      }
    }
  ]
}

let chart = null

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  option.mychange && bindClick
  chart.setOption(option);
  return chart;
  }
let binded = false;
function bindClick() {
  if (binded) return false
  binded = true
  chart.on('click', option.mychange)
}


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    ec: {
      onInit: initChart,
    },
    left: 20,
    top: 20,
    num: 0,
    isShow: false,
    area: '中国',
    showList: [],
    btnHidden: true
  },
  ready() {
    this.registerMap()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    registerMap() {
      const area = PIN[this.data.area]
      http(`/${area}.json`).then((data) => {
        echarts.registerMap(area, data.data)
        const ary = this.data.showList.map((item) => ({
          name: item.mapName || item.name,
          value: item.conNum || item.value
        }))
        if(ary.length) {
          const ary = this.data.showList.map((item) => ({
            name: item.mapName || item.name,
            value: item.conNum || item.value
          }))
          option.series[0].data = ary
          option.series[0].map = area
          option.mychange = (e) => {
            areaObj = e
            this.setData({
              isShow: true,
              num: e.value || 0,
              left: e.event.offsetX,
              top: e.event.offsetY
            })
          }
        }
        chart && chart.on('click', option.mychange)
        chart && chart.setOption(option)
      })
    },
    tipClick() {
      console.log(this.data.data)
      this.setData({
        btnHidden: false,
        isShow: false,
        area: areaObj.name,
        showList: this.data.data.filter(item => {
          return item.name === areaObj.name
        })[0].city
      })
      
    },
    back() {
      this.setData({
        btnHidden: true,
        isShow: false,
        area: "中国",
        showList: this.data.data.map((item) => ({
          name: item.mapName || item.name,
          value: item.conNum || item.value
        }))
      })
    }
  },
  observers: {
    'data,area': function() {
      this.data.showList = this.data.showList.length ? this.data.showList : this.data.data;
      this.registerMap()
    }
  }
})
