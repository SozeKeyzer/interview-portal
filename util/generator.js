const generator = require('generate-password');

module.exports={
     genPass:()=>{
      const gen_pass=generator.generate({
        length: 10,
        numbers: true
      });
      return gen_pass;
    }
}