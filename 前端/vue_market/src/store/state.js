

import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'
// 引入axios
import axios from 'axios'
Vue.use(Vuex)
const store =new Vuex.Store({
    state:{
        count:0,
        banner:[],
        setting_msg:[],
        header:false,
        nav:false,
        user_name:"",  //用户姓名
        setting_data:[] //设置模块数据
    },
    mutations:{
        show(state){
            state.header = true;
            state.nav = true;
        },
        hide(state){
            state.header = false;
            state.nav = false;
        }
        // setting(){
        //     this.$axios({
        //         method:"post",
        //         url:"/center/ActivityNoticeImg/list",
        //         data:{

        //         }
        //     }).then(res =>{
        //         // console.log(res.data.data)
        //         this.banner = res.data.data
        //     }).catch(res =>{
        //         console.log(res)
        //     })
        // }
    },
    actions: {
        undisappear(context){
            context.commit("show")
        },
        disappear(context){
            context.commit('hide')
        },
        saveForm(context){
            axios({
                method:"post",
                url:"http://center.marketing.yunpaas.cn/center/ActivityNoticeImg/list",
                data:{

                }
            }).then(res =>{
                // console.log(res.data.data)
                this.state.banner = res.data.data
            }).catch(res =>{
                console.log(res)
            })
        },

        // 登录部分
        userName(context){
            axios({
                method: "post",
                url: "http://center.marketing.yunpaas.cn/center/enterpriseuser/login",
                params: {
                  userName:"13521103385",
                  password:"lhw123"
                }
            }).then(res => {
                this.state.user_name = res.data.data.name
            }).catch(res => {
                console.log(res)
            })
        },
        //设置保存模块
        saveData(context){
            // var CancelToken = axios.CancelToken;
            // var source = CancelToken.source()
            axios({
                method: "post",
                 url: "http://192.168.2.58:8080/jgg/activitySetup/init",
              // url:"http://192.168.2.58:8080/kj/activitySetup/init",
                params: {

                },
                // cancelToken: source.token
            }).then(res => {
                this.state.setting_data = res.data.data
                let strData = JSON.stringify(this.state.setting_data)
                sessionStorage.setItem("Data",strData)

            }).catch(res => {
                console.log(res)
            })

            // $.ajax({
            //     type:"POST",
            //     url:"http://center.marketing.yunpaas.cn/jgg/activitySetup/save",
            //     // data:sendNew,
            //     // contentType:"application/json",
            //     // datatype:"json",
            //     data:{

            //     },
            //     dataType:"json",
            //     success(data){
            //         // this.state.setting_data = data.data
            //         console.log(data)
            //     }
            // })
        }
    }
})


export default store
