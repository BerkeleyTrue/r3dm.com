var berkeley = `A Mechanical engineer by training. He fell in love with
  Javascript. Software Engineering
  requires an analytical mind and Berkeley has this. Experienced in all
  things Node.js, REST APIs and Functional Reactive Programming. He
  believes in creating things, the do-it-yourself spirit and is a big fan
  of Sci-Fi.`;

var harry = `A software engineer. Has built many sites using web technologies
  HTML5, CSS,
  Javascript. Is most excited about building Mobile Apps. Other interests
  include 3D Printing, Artificial Intelligence, Machine Learning, GPU
  Programming, Internet of Things, Startups, Bitcoin and Bicycling.`;

var lenore = `Has a great passion for art and design that has grown since
  childhood. Her work shows a love for the graphic arts, demonstrating her
  meticulous eye for design concepts while sharing her optimistic outlook.
  She believes in change through design and accomplishing this through pro
  bono work with non-profits. Focus areas are in branding and identity
  development, print design, and illustration.`;

module.exports = {
  data: [{
    title: 'Developer',
    name: 'Berkeley Martinez',
    copy: berkeley,
    links: [
      {
        type: 'github',
        url: 'http://github.com/berkeleytrue'
      },
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/pub/berkeley-martinez/33/158/3a9'
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
      },
      {
        type: 'linkedin',
        url: 'https://www.linkedin.com/in/lenoremessler'
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
      },
      {
        type: 'linkedin',
        url: 'http://www.linkedin.com/in/harrymoreno'
      }
    ],
    imgUrl: '../images/harry.jpg'
  }]
};
