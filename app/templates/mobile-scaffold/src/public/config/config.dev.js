var LOGAPICONF = {
    isTop:false, // 电信版本配置项，主要是去掉顶部导航，所有导航放到左侧
    APP_DOMAIN:'.dtstack.net', // 云日志部署的域
    APP_UIC_HOST:'//dtuic.test.dtstack.net:85/', // uic的host
    LOGINURL:'//dtuic.test.dtstack.net:85/', // 登录跳转地址
    FOOTER_RIGHT:(new Date()).getFullYear() + ' 杭州玳数科技有限公司 浙ICP备15044486号-1', // 统一页脚版权文案
    LOGSTATICVERSION:'v1', // 标示云日志部署版本，运维同学可以根据情况自行定义
    COMPANYLOGO:'img/yunrizhi_03.svg', // 日志logo
    LIVETAIL_HOST:'log.dev.dtstack.net', // 实时websocket地址，必填
    LIVETAIL_PORT:8854, // 实时websocket端口，必填
    LOG_SERVER_HOST: '172.16.10.115', // logservie地址，必配，且不要http://
    AGENT_MANAGE_HOST: 'log.dev.dtstack.net', // agent管控api，必配，且不要http://
    AGENT_MANAGE_PORT: '8854', // agent管控api，必配
    TIME_RANGE_LIMIT:7 // 时间选择控件限定时间范围，单位:天，没有限定可设置成false
}