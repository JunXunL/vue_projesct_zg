import axios from 'axios'
import qs from 'qs'
import Config  from './requestOption'
import {EventBus,Constants} from '../config/index'
const _axios =  axios.create(Config)


// 请求的拦截器
_axios.interceptors.request.use((config)=>{
  //
  // var _this =this
  // EventBus.$on(Constants.EventBus.sign,(val)=>{
  //   _this.text = 1111
  // })
  let sign = localStorage.getItem(Constants.LocalStorage.sign)
  // 判断请求的类型
  // 如果是post请求就把默认参数拼到data里面
  // 如果是get请求就拼到params里面
  config.params = {
    sign:sign,
    ...config.params
  }
  return config;
},  (error)=> {
  return Promise.reject({
    msg:'request err'
  });
  // return Promise.reject(error);
})

// 添加响应拦截器
_axios.interceptors.response.use( (response)=>{
  // 对响应数据做点什么
  // sign过期或者不正确时提醒重新登陆，移除当前的 sign
  if(response.data.code == 1 && response.data.message == '登录失败' ){
    // window.location.href = location.host + '/#/qalogin'
    EventBus.$emit(Constants.EventBus.showToast,{
      message:"登陆已经过期，请重新登陆"
    })
    window.localStorage.removeItem(Constants.LocalStorage.sign)
    return
  }
  else {
    return response.data;
  }
}, (error) =>{
  // 对响应错误做点什么
  return Promise.reject(error);
  // return Promise.reject(error);
});

export default _axios;
