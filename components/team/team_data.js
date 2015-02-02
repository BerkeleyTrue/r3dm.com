var fs = require('fs'),
    path = require('path');

var harry = fs.readFileSync(path.join(__dirname, '/team_harry.md'), {
  encoding: 'utf-8'
});

var berkeley = fs.readFileSync(path.join(__dirname, '/team_berkeley.md'), {
  encoding: 'utf-8'
});

var lenore = fs.readFileSync(path.join(__dirname, '/team_lenore.md'), {
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
