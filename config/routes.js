/**
 * Created by jimmy on 6/13/15.
 */
 var requestify=require('requestify');
 var Index = require('../controller/index');
 var search = require('../controller/search');
 var User = require('../controller/user');
 var Profile = require('../controller/profile');

module.exports=function(app){
   /**classify**/
   app.get('/charts/trending',Index.getTrend);
   app.get('/charts/new',Index.getNew);
   app.get('/charts/metal',Index.getMetal);
   app.get('/charts/indie',Index.getIndie);
   app.get('/charts/electronic',Index.getElectronic);
   app.get('/charts/hiphop',Index.getHiphop);
   app.get('/charts/pop',Index.getPop);
   app.get('/charts/rock',Index.getRock);
   app.get('/charts/deephouse',Index.getDeephouse);
   app.get('/charts/house',Index.getHouse);
   app.get('/charts/rbsoul',Index.getRbsoul);
   app.get('/charts/jazzblues',Index.getJazzblues);
   app.get('/charts/trap',Index.getTrap);
   app.get('/charts/country',Index.getCountry);
   app.get('/charts/dancehall',Index.getDancehall);
   app.get('/charts/dubstep',Index.getDubstep);
   /***recomend***/
   app.post('/tracks/recommend',User.getRecommend);
   /***profile**/
   app.get('/profile/:id',Profile.getProfile);
   app.get('/profile/:id/tracks',Profile.getProfileTracks);
   /**track**/

   app.get('/track/:id',Index.getTrackInfo);
   app.get('/tracks/related/:id',Index.getRelatedTracks);
   /**search**/
   app.get('/tracks/search',search.getSearchResult);
   /**getRawLink**/
   app.get('/play',Index.getRawLink);

   /**user**/
   app.post('/signup',User.signup);
   app.post('/signin',User.signin);

   /**favorites**/
   app.post('/favorite/save',User.validToken,User.saveFavorite);
   app.get('/charts/favorites',User.validToken,User.getFavorites);

};
