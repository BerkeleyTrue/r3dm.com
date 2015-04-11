// var fs = require('fs'),
//     path = require('path');

// var harry = fs.readFileSync(path.join(__dirname, '/team_harry.md'), {
//   encoding: 'utf-8'
// });

// var berkeley = fs.readFileSync(path.join(__dirname, '/team_berkeley.md'), {
//   encoding: 'utf-8'
// });

// var lenore = fs.readFileSync(path.join(__dirname, '/team_lenore.md'), {
//   encoding: 'utf-8'
// });

var berkeley = 'A Mechanical engineer with a life-long passion for the ' +
  'creation and the do-it-yourself spirit.';

var harry = 'A software engineer. Holds a Bachelors degree in Computer ' +
  'Science from WPI. Has built many sites using web technologies html5, css, ' +
  'javascript. Is most excited about building mobile apps. Other interests ' +
  'include 3D printing, Artificial Intellegence, Machine Learning, GPU ' +
  'programming, Internet of Things, startups, bitcoin and bicycling.';

var lenore = 'Has a great passion for art and design that has grown since ' +
  'childhood. Her work shows a love for the graphic arts, demonstrating her ' +
  'meticulous eye for design concepts while sharing her optimistic outlook. ' +
  'She believes in change through design and accomplishing this through pro ' +
  'bono work with non-profits. Focus areas are in branding and identity ' +
  'development, print design, and illustration. Holds an M.S. in Integrated ' +
  'Marketing Communications at The Florida State University.';

module.exports = {
  data: [{
    title: 'Developer',
    name: 'Berkeley Martinez',
    copy: berkeley,
    links: [
      {
        type: 'github',
        url: 'http://github.com/berkeleytrue'
      }
    ],
    imgUrl: '../images/berks.jpg'
  }, {
    title: 'Designer',
    name: 'Lenore Messler',
    copy: lenore,
    links: [
      {
        type: 'portfolio',
        url: 'http://www.lenoremessler.com/'
      }
    ],
    imgUrl: '../images/lenore.jpg'
  }, {
    title: 'Developer',
    name: 'Harry Moreno',
    copy: harry,
    links: [
      {
        type: 'github',
        url: 'http://github.com/morenoh149'
      }
    ],
    imgUrl: '../images/harry.jpg'
  }]
};
