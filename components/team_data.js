var fs = require('fs');
var harry = fs.readFileSync(__dirname + '/team_harry.md', {
  encoding: 'utf-8'
});
var berkeley = fs.readFileSync(__dirname + '/team_berkeley.md', {
  encoding: 'utf-8'
});
var lenore = fs.readFileSync(__dirname + '/team_lenore.md', {
  encoding: 'utf-8'
});

module.exports = {
  data: [{
    title: 'CEO',
    name: 'BERKELEY MARTINEZ',
    copy: berkeley
  }, {
    title: 'CTO',
    name: 'HARRY MORENO',
    copy: harry
  }, {
    title: 'CCO',
    name: 'LENORE MESSLER',
    copy: lenore
  }]
};
