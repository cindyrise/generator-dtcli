import global from './reducer';
import home from '../home/reducer';
import auth from '../auth/reducer';
import userList from  '../user/list/reducer';



const appReducer = {
  global,
  home,
  auth,
  userList
};
	
	
	
	

export default appReducer;
