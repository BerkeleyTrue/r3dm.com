var jade = require('jade');

/*
 *
 */
module.exports = function(fileName) {
  var _fileName = fileName,
      _dir = '../views/email/',
      _filePath,
      _compiler;

  _filePath = require.resolve(_dir + _fileName + '.jade');
  _compiler = jade.compileFile(_filePath);

  return { render: render };

  function render(locals) {
    return _compiler(locals);
  }
};
