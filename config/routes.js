/**
 * Created by jimmy on 6/13/15.
 */
 var requestify=require('requestify');
 var Index = require('../controller/index');
 var search = require('../controller/search');
 var User = require('../controller/user');

module.exports=function(app){
   /**classify**/
   app.get('/tracks/trending',Index.getTrend);
   app.get('/tracks/new',Index.getNew);
   app.get('/tracks/metal',Index.getMetal);
   app.get('/tracks/indie',Index.getIndie);
   app.get('/tracks/electronic',Index.getElectronic);
   app.get('/tracks/hiphop',Index.getHiphop);
   app.get('/tracks/pop',Index.getPop);
   app.get('/tracks/rock',Index.getRock);
   app.get('/tracks/deephouse',Index.getDeephouse);
   app.get('/tracks/house',Index.getHouse);
   app.get('/tracks/rbsoul',Index.getRbsoul);
   app.get('/tracks/jazzblues',Index.getJazzblues);
   app.get('/tracks/trap',Index.getTrap);
   app.get('/tracks/country',Index.getCountry);
   app.get('/tracks/dancehall',Index.getDancehall);
   app.get('/tracks/dubstep',Index.getDubstep);
   /**search**/
   app.get('/search',search.getSearchResult);

   /**getRawLink**/
   app.get('/play',Index.getRawLink);

   /**user**/
   app.post('/signup',User.signup);
   app.post('/signin',User.signin);

};
