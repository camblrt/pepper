"use strict";

var twit                          = require('twitter');
var fs                            = require('fs');
var images_path                   = __dirname +'/../../twitter_images/';
const twitter_consumer_key        = 'ndMWL1CjZGcFo0I70gJ2W0U0U';
const twitter_consumer_secret     = 'llPN2O30ZPQ1COikYDPd754zua8K2jwG4tlAwhyv1FKUXAHmfm';
const twitter_access_token_key    = '1083743265839554562-eYzIfR3MegoQB7F8AOJEfil1SSqWK3';
const twitter_access_token_secret = '9WD5NBStLJEff2yyRW3RuaGY6VQZiSoTVngk69uChLnwX';

class twitter {

    static sendSimpleTweet (text) {

        var T = new twit({
            consumer_key:         twitter_consumer_key,
            consumer_secret:      twitter_consumer_secret,
            access_token_key:     twitter_access_token_key,
            access_token_secret:  twitter_access_token_secret
          })
        //
        //  tweet 'hello world!'
        //
        if(text == '' || text == null)text='Hello Twitter'
        T.post('statuses/update', { status: text }, function(err, data, response) {
            console.log(data)
        })
    }

    static sendImageTweet(tweet_text,namefile,altText)
    {
        console.log("Start read Image");
        var data = fs.readFileSync(images_path+namefile, { encoding: 'base64' })
        var T = new twit({
            consumer_key:         twitter_consumer_key,
            consumer_secret:      twitter_consumer_secret,
            access_token_key:     twitter_access_token_key,
            access_token_secret:  twitter_access_token_secret
          })
    
          console.log('Uploading an image...');

          T.post('media/upload', { media_data: data }, function (err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Image uploaded!');
              console.log('Now tweeting it...');
        
              T.post('statuses/update', {
                status: tweet_text,
                media_ids: data.media_id_string
              },
                function(err, data, response) {
                  if (err){
                    console.log('ERROR status:');
                    console.log(err);
                  }
                  else{
                    console.log('Posted an image!');
                  }
                }
              );
            }
          });
    }
    
    
}
module.exports = twitter;
