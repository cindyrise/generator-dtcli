const ins = require('./new');
const serverConfig = require('../../build/server');
let reducerDir = ins.path.join(__dirname, '../webapp/features/reducers/');
let apiDir = ins.path.join(__dirname, '../webapp/api');
let routerFile = ins.path.join(__dirname, '../webapp/features/routers.js');
let actionTypeFile = ins.path.join(__dirname, '../webapp/features/constants/actionTypes.js');

//追加router
let routerContent = ins.fs.readFileSync(routerFile).toString();
if (routerContent.indexOf(ins.smallCamel) > -1) {
  ins.log(ins.chalk.yellow(ins.chalk.bgBlue('命名重复或者传入参数为空')));
  return;
}
let routerPath = "<Route path='" + ins.smallCamel + "' component={" + ins.bigCamel + "}></Route>";
routerContent = routerContent.replace(/(import .* from .*;)([\s\n]*const)/, "$1\nimport " + ins.bigCamel + " from \'./pages/" + ins.smallCamel + "\';$2")
  .replace(/(<IndexRoute component={Home}><\/IndexRoute>)/g, "$1\n  " + routerPath);
ins.fs.writeFileSync(routerFile, routerContent);

//新建页面
let tplFragFile = ins.path.join(ins.tplDir, 'fragePage.js');
let fragContent = ins.fs.readFileSync(tplFragFile, "utf-8").replace(/smallCamel/g, ins.smallCamel);
ins.fs.mkdirSync(ins.path.join(ins.pageDir, 'pages/' + ins.smallCamel));
ins.fs.writeFileSync(ins.path.join(ins.pageDir, 'pages/' + ins.smallCamel + '/index.js'), fragContent);

let tplPageFile = ins.path.join(ins.tplDir, 'pages.js');
let pageContent = ins.fs.readFileSync(tplPageFile, "utf-8").replace(/bigCamel/g, ins.bigCamel)
  .replace(/smallCamel/g, ins.smallCamel);
ins.fs.writeFileSync(ins.path.join(ins.pageDir, 'pages/' + ins.smallCamel + '/' + ins.smallCamel + '.js'), pageContent);

//新建action
let actionFile = ins.path.join(ins.tplDir, 'action.js');
let actionContent = ins.fs.readFileSync(actionFile, "utf-8").replace(/smallCamel/g, ins.smallCamel)
  .replace(/Handle/g, ins.bigCamel).replace(/TYPE/g, ins.smallCamel.toUpperCase());
ins.fs.writeFileSync(ins.path.join(ins.pageDir, 'actions/' + ins.smallCamel + 'Action.js'), actionContent);

//新建reducers
let reducerFragPath = ins.path.join(reducerDir, 'index.js');
let reducerFragContent = ins.fs.readFileSync(reducerFragPath, "utf-8");
let reducerImport = "import { " + ins.smallCamel + "Reducer } from '\.\/" + ins.smallCamel + "'";

reducerFragContent = reducerFragContent.replace(/(import .* from .*;)([\n]*const)/, "$1\n" + reducerImport + ";$2")
  .replace(/([\s\n]}\);)/g, "\n ," + ins.smallCamel + ":" + ins.smallCamel + "Reducer$1");
  console.log(reducerFragContent);
 ins.fs.writeFileSync(reducerFragPath, reducerFragContent);

let reducerFile = ins.path.join(ins.tplDir, 'reducer.js');
let reducerContent = ins.fs.readFileSync(reducerFile, "utf-8").replace(/smallCamel/g, ins.smallCamel)
  .replace(/TYPE/g, ins.smallCamel.toUpperCase());
ins.fs.mkdirSync(ins.path.join(reducerDir, ins.smallCamel))
ins.fs.writeFileSync(ins.path.join(reducerDir, ins.smallCamel + '/index.js'), reducerContent);

//添加actionType
let actionTypeStr =
  `export const ${ins.smallCamel}Type = mirror([
  'GET_${ins.smallCamel.toUpperCase()}_DATA',
],'${ins.smallCamel}/');`;
let acitonTypeContent = ins.fs.readFileSync(actionTypeFile, "utf-8").replace(/(mirror-creator';)/g, "$1\n\n" + actionTypeStr);
ins.fs.writeFileSync(actionTypeFile, acitonTypeContent);

//新建api
let apiStr =
  `import http from '../utils/http'
import apiUrl from '../features/constants/apis';
export default {
  get${ins.bigCamel}Data(params) {
    return http.post(apiUrl.getUserData, params);
  }
};`
ins.fs.writeFileSync(ins.path.join(apiDir, ins.smallCamel + '.js'), apiStr);

//新建style
let styleStr =
  `.content{
  margin:160px auto;
 font-size:36px;
}`
ins.fs.writeFileSync(ins.path.join(ins.pageDir, 'pages/' + ins.smallCamel + '/style.scss'), styleStr);
ins.log(ins.chalk.yellow(ins.chalk.bgBlue(`新建页面成功访问地址:http://${serverConfig.host}:${serverConfig.port}/webapp.html#/${ins.smallCamel}`)));





