BasicGame = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check BasicGame.orientated in internal loops to know if it should pause or not */
    orientated: true

};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBackground', 'images/preloader_background.png');
        this.load.image('preloaderBar', 'images/preloadr_bar.png');

    },

    create: function () {

        this.input.maxPointers = 4;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.minWidth = 480;
            this.scale.minHeight = 260;
            this.scale.maxWidth = 1024;
            this.scale.maxHeight = 768;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.hasResized.add(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
        }

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    },

    addBanner: function() {
        var successCreateBannerView = function() { console.log("addBanner Success"); admob.requestAd({'isTesting': true},success,error); };
        var success = function() { console.log("requestAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        
        var options = {
            'publisherId': 'ca-app-pub-2277344419348786/2594914353',
            'adSize': admob.AD_SIZE.BANNER
        }
        admob.createBannerView(options,successCreateBannerView,error);
    },

    addInterstitial: function() {
        var successCreateBannerView = function() { console.log("addInterstitial Success"); admob.requestAd({'isTesting': true},success,error); };
        var success = function() { console.log("requestAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        
        var options = {
            'publisherId': 'ca-app-pub-2277344419348786/2594914353'
        }
        admob.createInterstitialView(options,successCreateBannerView,error);
    },
    
    killAd: function() {
        var success = function() { console.log("killAd Success"); };
        var error = function(message) { console.log("Oopsie! " + message); };
        admob.killAd(success,error);
    }

};
