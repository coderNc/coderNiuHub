const labelService = require('../service/label.service')

class LabelController {
  async addLabel(ctx, next){
    const {name} = ctx.request.body
    const result = await labelService.addLabel(name);

    ctx.body = {
      code:10000,
      data:result
    }
  }


}



module.exports = new LabelController()