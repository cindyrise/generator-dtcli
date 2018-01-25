import config from '../../public/config/config';
import devconfig from '../../public/config/config.dev';

const CONFIG = __PRODUCTION ? config : devconfig;

export default CONFIG;
