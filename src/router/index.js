//动态循环注册每个路由
const fs = require('fs')



const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    //console.log(file);
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  })
}

module.exports = useRoutes;