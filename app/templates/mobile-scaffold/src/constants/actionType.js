import mirror from 'mirror-creator';
export const globalAction = mirror([
    "CUR_NAV_TITLE",
    "GET_PUBLISH_GROUP",
    "GET_AREA_LIST"
],
    { prefix: 'global' })
export const homeAction = mirror([
    "GET_HOME_INFO",
],
    { prefix: 'home' });

//管理助手
export const manageAideAction = mirror([
    "GET_ANALYSIS_INFO",
    "GET_BOOK_RANGE",
],
    { prefix: 'manageAide' });
//发行助手
export const publishAideAction = mirror([
    "CUR_NAV_TITLE",
    "GET_STORE_LIST",
    'GET_GROUP_LIST',
    'GET_EFFECT_LIST'
],
    { prefix: 'publishAide' });
//行业趋势
export const industryTrendAction = mirror([
    "GET_GRAIL_INFO",
    'GET_BOOK_RANK'
],
    { prefix: 'industryTrend' });

//优惠活动
export const discountActivityAction = mirror([
    "GET_SALE_INFO",
    "GET_MARKET_INFO",
    "GET_HOT_BOOK"
],
    { prefix: 'discountActivity' });
//集团门店
export const groupStoreAction = mirror([
    "GET_STORE_INFO",
    "GET_COLD_BOOK",
    'GET_GROUP_INFO'
],
    { prefix: 'groupStore' });

//单品详情
export const itemAnalysisAction = mirror([
    "GET_BOOK_INFO",
    "GET_BOOK_ANALYSIS"
],
    { prefix: 'itemAnalysis' });

//单品列表
export const listAction = mirror([
    "GET_ITEM_LIST",
    "GET_EXCEPT_LIST",
    "GET_SEARCH_LIST",
],
    { prefix: 'list' });

//个人中心
export const userAction = mirror([
    "REQ_LOGIN",
    "GET_USER_INFO",
],
    { prefix: 'user' });