
import  React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers'
import ApolloClient from 'apollo-client'
import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr' }),
    cache: new InMemoryCache().restore({}),
    dataIdFromObject: object => object.key || null
})

const render = Component =>
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Component />
        </ApolloProvider>,
        document.getElementById('root')
    )
render(Routers)

if (module.hot) {
    module.hot.accept('./routers', () => {
        const NextRootContainer = require('./routers').default
        render(NextRootContainer)
    })
}

