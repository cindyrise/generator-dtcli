
import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => new Promise(resolve =>
    require.ensure([], require => {
        resolve(require('./personCenter.js'));
      })
    )
});
