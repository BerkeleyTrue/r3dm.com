[![Stories in Ready](https://badge.waffle.io/r3dm/r3dm.com.png?label=ready&title=Ready)](https://waffle.io/r3dm/r3dm.com)
# R3dm landing page

[![Circle CI](https://circleci.com/gh/r3dm/r3dm.com.svg?style=svg)](https://circleci.com/gh/r3dm/r3dm.com)

## Built using React, Rxjs, Flux, Keystone.js and Node.js

To get started run `npm install` and then `npm start`

To dev, use `gulp`, changes to stylesheet will autoinject into all open browsers
Will open a chrome tab at localhost:9002 where changes will be synced

### production pre-req's
* NODE
* NPM

### Dev pre-req's
* NODE
* NPM
* GULP


A template for .env file.

> MONGO_URI=mongodb://localhost:27017/r3dm
> MANDRILL_KEY=mandrillKey
> MANDRILL_USERNAME=mandril@user.com
> CLOUDINARY_URL=cloudinaryURL
> S3_BUCKET=BucketName
> S3_KEY=S3Key
> S3_SECRET=S3Secret
> NEW_RELIC_LICENSE_KEY=Secret key
> NEW_RELIC_LOG=stdout

You will need to create a .env file in the root directory and copy the structure above replacing the phrases with approve values. 
