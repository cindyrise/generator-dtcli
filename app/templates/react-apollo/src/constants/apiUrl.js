export default {
    getGroupList:`${ZJYYCONFIG.APIURL}/m/publishCent/querySalePubliCentDist.json`,//获取集团列表
    getStoreList:`${ZJYYCONFIG.APIURL}/m/publishstore/querySaleStoreCore90D.json`, //获取门店列表/

    getPublishGroup:`${ZJYYCONFIG.APIURL}/m/publishstore/getCentCompTree.json`,//获取发行集团
    getAreaList:`${ZJYYCONFIG.APIURL}/m/publishCent/queryAllProvince.json`,
    getItemInfo :`${ZJYYCONFIG.APIURL}/m/publishstore/queryBook.json`,

    getStoreInfo:`${ZJYYCONFIG.APIURL}/m/publishstore/querySaleStoreAllInfo.json`,//获取门店详情
    getColdBook:`${ZJYYCONFIG.APIURL}/m/publishstore/querySaleStoreSoldOut.json`,
    
    getGroupInfo:`${ZJYYCONFIG.APIURL}/m/publishCent/queryPublishCentAllInfo.json`,
    getHomeInfo:`${ZJYYCONFIG.APIURL}/m/publishCent/queryPublishCentAllInfo.json`,
    getBookInfo:`${ZJYYCONFIG.APIURL}/m/publishstore/queryBook.json`,
    getBookAnalysis:`${ZJYYCONFIG.APIURL}/m/publishstore/queryBookInfoAnalyse.json`,
    
    //管理助手
    getAnalysisInfo:``,
    getBookRange:``,

    getEffectList:`${ZJYYCONFIG.APIURL}/m/marketActivity/queryHistoryActivityByAuth.json`,
    
    //优惠活动
    getSaleInfo:`${ZJYYCONFIG.APIURL}/m/marketActivity/activitySaleProfile.json`,
    getMarketInfo:`${ZJYYCONFIG.APIURL}/m/marketActivity/effectStoreDist.json`,
    getHotBook:`${ZJYYCONFIG.APIURL}/m/marketActivity/effectStoreHot.json`,
     
    //简单列表类
    getItemList:``,
    getExceptList:``,
    getSearchList:``,
    

   
    //登陆及个人中心
    reqLogin:``,
    getUserInfo:``,

    //行业方向
    getGrailInfo:`${ZJYYCONFIG.APIURL}/m/industryTrend/queryIndustryTrend.json`,
    getBookRank:`${ZJYYCONFIG.APIURL}/m/industryTrend/queryTagRank.json`

}