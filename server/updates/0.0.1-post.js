import keystone from 'keystone';

const Post = keystone.list('Post');

module.exports = function(done) {

  new Post.model({
    slug: 'toasty-kitten',
    title: 'Toasty Kitten',
    state: 'published',
    content: {
      brief: {
        html: `<p>Panic is your body revving up temporarily, but it will slow
        down. Exhale and let the muscles in your shoulders drop and relax.
        Take a deep breath. Picture yourself releasing the burden you feel
        from sorrow, regret or resentment. Just acknowledge what&#39;s
        there and let be. Open your heart&#39;s eyes. Take a deep breath.
        Anxiety and panic will pass.</p>\n`,
        md: `Panic is your body revving up temporarily, but it will slow down.
        Exhale and let the muscles in your shoulders drop and relax.
        Take a deep breath. Picture yourself releasing the burden you feel from
        sorrow, regret or resentment. Just acknowledge what's there and let be.
        Open your heart's eyes. Take a deep breath. Anxiety and panic will
        pass.`
      },
      extended: {
        html: `<p>Panic is your body revving up temporarily, but it will slow
down. Exhale and let the muscles in your shoulders drop and relax. Take
a deep breath. Picture yourself releasing the burden you feel from
sorrow, regret or resentment. Just acknowledge what&#39;s there and let
be. Open your heart&#39;s eyes. Take a deep breath. Anxiety and panic
will pass.</p>\n<p>Impermanence and change is a powerful teacher and
teaching. Give yourself a break. Let go of the need to analyze and let
be. Let the muscles in your neck and shoulders relax. Bring love into
your heart, into your breath and into your being. Panic is your body
revving up temporarily, but it will slow down.</p>\n<p>Impermanence
and change is a powerful teacher and teaching. Feelings of panic are
uncomfortable, but they will not harm you. Open your heart to change,
forgiveness and lovingkindness. Live life one inhalation and one
exhalation at a time. Stop and take a slow breath.</p>\n<p>It will be
ok. Open your heart to change, forgiveness and lovingkindness. Live
life one inhalation and one exhalation at a time. Feelings of panic
are uncomfortable, but they will not harm you. Empty your mind; be
formless, shapeless like water. Stop and focus on whatever is being
carried within you and let be. Take a look around and notice what is
really happening, right now, in this moment. Open your heart to love
as boundless as the sun, the moon, the stars.</p>\n<p>Stop and take a
slow breath. Briefly notice any emotions, thoughts or sensations that
may be driving fear and anxiety and let them be. Just acknowledge wha
&#39;s there and let be. Give yourself a break. Love is the first
seed of the soul. Just acknowledge what&#39;s there and let be.</p>\n
p>Bring love into your heart, into your breath and into your being.
Exhale and let the muscles in your shoulders drop and relax. Stop and
focus on whatever is being carried within you and let be.
Impermanence and change is a powerful teacher and teaching.</p>\n<p
Stop and take a slow breath. Open your heart to love as boundless as
the sun, the moon, the stars. Feelings of panic are uncomfortable,
but they will not harm you. You can do what you set out to do; yes,
you can. Empty your mind; be formless, shapeless like water.</p>\n<p
Give yourself a break. You can get through this. Let go of the need
to analyze and let be. Live life one inhalation and one exhalation at
a time. Empty your mind; be formless, shapeless like water. Inhale
slowly and exhale slowly. It will be ok.</p>\n<p>You can do this.
Hear the internal and external sounds around you rise and fall.
Anxiety and panic will pass. Impermanence and change is a powerful
teacher and teaching. Hear the internal and external sounds around
you rise and fall.</p>\n<p>You can do this. Just acknowledge what&#39
s there and let be. Love is the first seed of the soul. It will be o
. Let the muscles in your neck and shoulders relax. Bring love into
your heart, into your breath and into your being. Watch each breath
appear and disappear, just breathing. This discomfort will pass.</p>`,
        md: `Panic is your body revving up temporarily, but it will slow down.
Exhale and let the muscles in your shoulders drop and relax. Take a deep
breath. Picture yourself releasing the burden you feel from sorrow, regret or
resentment. Just acknowledge what's there and let be. Open your heart's eyes.
Take a deep breath. Anxiety and panic will pass.\r\n\r\nImpermanence and
change is a powerful teacher and teaching. Give yourself a break. Let go of
the need to analyze and let be. Let the muscles in your neck and shoulders
relax. Bring love into your heart, into your breath and into your being. Panic
is your body revving up temporarily, but it will slow
down.\r\n\r\nImpermanence and change is a powerful teacher and teaching.
Feelings of panic are uncomfortable, but they will not harm you. Open your
heart to change, forgiveness and lovingkindness. Live life one inhalation and
one exhalation at a time. Stop and take a slow breath.\r\n\r\nIt will be ok.
Open your heart to change, forgiveness and lovingkindness. Live life one
inhalation and one exhalation at a time. Feelings of panic are uncomfortable,
but they will not harm you. Empty your mind; be formless, shapeless like
water. Stop and focus on whatever is being carried within you and let be. Take
a look around and notice what is really happening, right now, in this moment.
Open your heart to love as boundless as the sun, the moon, the
stars.\r\n\r\nStop and take a slow breath. Briefly notice any emotions,
thoughts or sensations that may be driving fear and anxiety and let them be.
Just acknowledge what's there and let be. Give yourself a break. Love is the
first seed of the soul. Just acknowledge what's there and let be.\r\n\r\nBring
love into your heart, into your breath and into your being. Exhale and let the
muscles in your shoulders drop and relax. Stop and focus on whatever is being
carried within you and let be. Impermanence and change is a powerful teacher
and teaching.\r\n\r\nStop and take a slow breath. Open your heart to love as
boundless as the sun, the moon, the stars. Feelings of panic are
uncomfortable, but they will not harm you. You can do what you set out to do;
yes, you can. Empty your mind; be formless, shapeless like water.\r\n\r\nGive
yourself a break. You can get through this. Let go of the need to analyze and
let be. Live life one inhalation and one exhalation at a time. Empty your
mind; be formless, shapeless like water. Inhale slowly and exhale slowly. It
will be ok.\r\n\r\nYou can do this. Hear the internal and external sounds
around you rise and fall. Anxiety and panic will pass. Impermanence and change
is a powerful teacher and teaching. Hear the internal and external sounds
around you rise and fall.\r\n\r\nYou can do this. Just acknowledge what's
there and let be. Love is the first seed of the soul. It will be ok. Let the
muscles in your neck and shoulders relax. Bring love into your heart, into
your breath and into your being. Watch each breath appear and disappear, just
breathing. This discomfort will pass.`
      }
    },
    language: 'English',
    publishedDate: '2015-05-29T07:00:00Z',
    cover: {
      filename: '5fa9decff0091e103244374e5bce9597.jpg',
      originalname: 'Blue-Sunset-on-Mars.jpg',
      path: '',
      size: 330718,
      filetype: 'image/jpeg',
      url: '//r3dm-blog.s3.amazonaws.com/5fa9decff0091e103244374e5bce9597.jpg'
    }
  })
  .save(done);
};
