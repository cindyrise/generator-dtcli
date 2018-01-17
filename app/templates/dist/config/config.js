var LOGAPICONF = {
  isTelecomVersion: false, // 电信版本配置项，主要是去掉顶部导航，所有导航放到左侧
  APP_DOMAIN: '.dtstack.com', // 云日志部署的域
  APP_UIC_HOST: '//account.dtstack.com', // uic的host
  LOGINURL: '//account.dtstack.com/#/login', // 登录跳转地址
  FOOTER_RIGHT: (new Date()).getFullYear() + ' 杭州玳数科技有限公司 浙ICP备15044486号-1', // 统一页脚版权文案
  LOGSTATICVERSION: 'v1', // 标示云日志部署版本，运维同学可以根据情况自行定义
  COMPANYLOGO: 'img/yunrizhi_03.svg', // 日志logo
  LIVETAIL_HOST: '116.62.175.25', // 实时websocket地址，必填
  LIVETAIL_PORT: 8854, // 实时websocket端口，必填
  LOG_SERVER_HOST: '172.16.1.145', // logservie地址，必配，且不要http://
  AGENT_MANAGE_HOST: '172.16.1.52', // agent管控api，必配，且不要http://
  AGENT_MANAGE_PORT: '8854', // agent管控api，必配
  TIME_RANGE_LIMIT: 7, // 时间选择控件限定时间范围，单位:天，没有限定可设置成false
  navData: [
    {
      title: "Email(公司邮箱)",
      url: 'http://mail.dtstack.com/'
    },
    {
      title: "Gitlab(Git仓库)",
      url: 'http://git.dtstack.cn/'
    },
    {
      title: "Confluece(团队知识库)",
      url: "http://confluence.dev.dtstack.cn/"
    },
    {
      title: "Nexus(Maven私服)",
      url: 'http://nexus.dev.dtstack.cn/nexus'
    },
    {
      title: "Redmine(缺陷管理)",
      url: 'http://redmine.prod.dtstack.cn/'
    },
    {
      title: "SonarQube(Quality Gate)",
      url: 'http://172.16.8.229:9000/'
    },
    {
      title: "Jenkins(自动化神器)",
      url: 'http://172.16.8.229:8080/'
    },
    {
      title: "瓦力部署(部署神器)",
      url: 'http://172.16.10.111/'
    },
    {
      title: "API管理",
      url: 'http://172.16.10.111:8989/yongli'
    },
    {
      title: "TestLink(测试用例管理)",
      url: 'http://172.16.10.111:8080/testlink/'
    },
    {
      title: "ASK问答",
      url: 'http://ask.dtstack.cn/'
    }

  ]
}
