
import React from 'react'
import { Link } from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import PropTypes from 'prop-types'
import { List, Flex, Icon, WhiteSpace, NavBar,Button } from 'antd-mobile';
const Item = List.Item;
import ACTORS_QUERY from '../../graphql/actorsQ.graphql'
import ALLACTOR_QUERY from '../../graphql/allActorQ.graphql'
import MOVIE_QUERY from '../../graphql/movieQ.graphql'
import './style.scss'
import JSONTree from 'react-json-tree';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            refetchData: {},
            fetchMoreData: {}
        }
    }
    componentDidMount() {
        console.log(this.props, 'lll--home');
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 999900);
    }

    componentWillMount() {

    }
    fetchMore = () => {
        const { refetch, fetchMore } = this.props.data;
        console.log(this.props.movieData,'movieData');
        fetchMore({
            query: ALLACTOR_QUERY,
            updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
                console.log(previousResult, fetchMoreResult, queryVariables);
                return null;
            },
        }).then(ret => {
            console.log(ret, 'fetchMore', this.props);
            this.setState({ fetchMoreData: ret })
        });

    }
    refetch = () => {
        const { refetch, fetchMore } = this.props.data;
        refetch({ "id": "cixxibjp6c1gs0131fvnhi055" }).then(ret => {
            this.setState({ refetchData: ret })
        })
    }
    render() {
        const { refetch, fetchMore } = this.props.data;
        const { fetchMoreData, refetchData } = this.state;
        return (
            <div className="list-border-hide">
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Home</NavBar>
                 <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item> <Button onClick={this.refetch}>获取单条数据</Button></Flex.Item>
                    <Flex.Item><Button onClick={this.fetchMore}>获取批量数据</Button> </Flex.Item>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex>
                    <Flex.Item><JSONTree data={refetchData} /></Flex.Item>
                    <Flex.Item><JSONTree data={fetchMoreData} /> </Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default compose(
    graphql(ACTORS_QUERY, {
        alias: "actor_query",
        name: 'newData',
        props: ({ newData }) => ({
            actorData: newData.Actor || [],
            data: newData
        }),
        options: (props) => {
            return {
                variables: {
                    "id": "cixxibjo1c1go0131ea1t4yor",
                    name: "Leonardo DiCaprio"
                },
            }
        },
    }),
    graphql(MOVIE_QUERY, {
        alias: 'movie_query',
        name: "movieData",
    }),
)(Home)
//export default withApollo(Home)  //高阶组件自己属性-》（data ,mutate,ownprops）;[props]


