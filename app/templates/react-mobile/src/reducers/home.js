import { homeAction } from '../constants/actionType'
let initialState = {
    homeInfo: {
        "centCoreVo": {
            "salePriceDeal": "2125",
            "saleCntDeal": "60",
            "purCntDeal": "27"
        },
        "saleAlert": [{ bkName: '降龙十八掌', saleCntDeal: 300, bkId: 121312312 }],
        "dataExcept": [{ bkName: '铁掌水上漂', saleCntDeal: 300, bkId: 121312312 }],
        "trendData": [{ saleDate: "201710", salePrice: 123 }],
    }
}

export function home(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case homeAction.GET_HOME_INFO:
            return {
                ...state,   //三个点是展开符
                // storeList: payload
            }
        default:
            return { ...state };
    }
}