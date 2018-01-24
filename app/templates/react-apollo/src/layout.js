import React from 'react'
import gql from 'graphql-tag'
import { graphql, compose } from 'react-apollo'
import { List, Flex, Icon, WhiteSpace, NavBar, Button } from 'antd-mobile';
import MOVIE_QUERY from './graphql/movieQ.graphql'
import USER_QUERY from './graphql/userQ.graphql'
import USER_CREATE from './graphql/userM.graphql'

const TestC = ({movieData, userData, onLoadMore,updateQuery,createUser }) => {
    console.log(userData,movieData,createUser);
   // if (loading) return <div>loading...</div>
    const { actors, id, title } = {actos:'dfs',id:123,title:'test'}//Movie;
    return <div>
        <div>电影 :《{title}》</div>
        <div>演员列表</div>
        {/* <ul>
            {Movie.actors.map((item, idx) => (<li key={idx}>{item.name}</li>))}
        </ul> */}
        <WhiteSpace />
        <Flex>
            <Flex.Item><Button onClick={onLoadMore}>点击看效果</Button></Flex.Item>
            <Flex.Item><Button onClick={updateQuery}>update</Button></Flex.Item>
            <Flex.Item><Button onClick={() => createUser({ variables: { name: 'apollographql/apollo-client' } }).then(ret => { console.log(ret, 'big') })}>更新用户</Button></Flex.Item>
        </Flex>
    </div>
}

const QueryData = compose(
    graphql(USER_QUERY, {
        props: ({ test }) => ({
            onLoadMore: () => {
                console.log(test, 'users');
                test.refetch();
            },
            updateQuery: () => {
                test.updateQuery((pre,next) => {
                    console.log(pre,'next',next);
                    //pre.users=[{id:12,name:'lili',__typename:'User',"Symbol(id)": "User:cixxhjs05pm0z01585vrc13o0"},{id:10,name:'mam',__typename:'User',"Symbol(id)": "User:cixxhjs05pm0z01585vrc13o1"}]
                    pre.users.push({ id: "cixxhjs05pm0z01585vrc13o6", name: "Gary Oldman", __typename: "User", "Symbol(id)": "User:cixxhjs05pm0z01585vrc13o6" });
               return pre;
                })
            },
            userData: test.users || []
        }),
        alias: 'user_query',
        name: "test",
        //options: { notifyOnNetworkStatusChange: true },
    }),
    graphql(MOVIE_QUERY, {
        alias: 'movie_query',
        name: "movieData",
    }),
    graphql(USER_CREATE, {
        options: {
            update: (proxy, { data}) => {
             console.log(proxy,data);
            },
          },
        name: "createUser",
        alias: 'createUser'
    })
)(TestC)

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }

    render() {
        return (<div>
            {/* <div><Test/></div> */}
            {this.props.children || '暂无页面内容'}
            <div><QueryData /></div>
        </div>);
    }
}