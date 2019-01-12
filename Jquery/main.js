        var windowHeight = $(window).height(); //Height of  browser window
        var windowWidth = $(window).width(); //width of browser window
        var bulletNumber =1;   //
        var bulletFireNumber=1; // This variable used for Bullet which is fire from enemy
        var fighterHealth = 10;
        var bombID = 1;
        var bulletID = 1;
        var devicespaceshipHeight = Math.floor ((windowHeight-200) /5); //caclulate size for spaceship based on width and height of device
        var minutes =1;
        var seconds = minutes * 120;
        var gamescore= 0;
        var startGame=false;
        var stopGame = false;
        var pauseGame=false ;
        var level = 1;
        var bulletInterval = 0;
        var fireInterval = 0;
        var enemyGTime = 0;
        var enemyFTime = 0;
        var planeGTime = 0;
        var planeFTime = 0;
        var enemyGspeed = 5000; // speed of enemy generation
        var enemyFspeed = 200; // speed of enemy from top to bottom
        var planeGspeed = 3000; // speed of enemy fighter plane generation
        var planeFspeed = 200; // speed of enemy fighter plane from top to bottom
        var FighterBulletspeed =2000; // Bullet speed from bottom to up
        var NoOfEnemy = 2;
        var NoOfEnemyPlane = 2;
        var mute=false;
        var fireBulletTime=0;
        var fireBLT=0;


        //Move Bullet From top to Bottom
        function MOVETO(id,position,time){

            $(id).fadeIn()
            .css({top:position,position:'absolute'}).animate({top: 5}, time, 'linear',function(){$(this).remove()});

        }

        //Move Bullet From Bottom to Top

        function MOVETODOWN(id,bulletFirePosition,type){  
            var d,e;
            if(type == 'pau') {d=60;e=10} else{d=0;e=0}  
            var BottomPosition = (windowHeight -10) - ( bulletFirePosition.top + 100 ) + d ;
            $(id).fadeIn()
                .css({bottom:BottomPosition ,left:bulletFirePosition.left - e,position:'absolute'}).animate({bottom:0 }, {
                duration: 4000,
                complete: function () { console.log('hello');$(this).remove();}
              })
        }

          /*
        This adjusts the game when a window resize event occurs .
        It will :
        - change all spaceship sizes
        */
      
        function adjustgame()
        {
          console.log ("width:"+ $ (window).width());
          console.log ("height:"+ $ (window).height());
          windowWidth = $ (window).width();
          windowHeight = $ (window).height();
          // set the height and width of the #enemyingScreen div equivalent to that of the window's
          $('body').css('height', windowHeight);
          $('body').css('width', windowWidth);

          if (windowWidth< windowHeight)
          {
            console.log ("Potrait mode");
          }
          else
          {
            console.log("Landscape mode");
          }

          var scale = devicespaceshipHeight  / 71;

          $(".spaceship").css ("transform", "scale ("+scale+")");

          $(".spaceship").each (function()
            {
              var x =$ (this).position ().left;
              if (x >= (windowWidth-50 ))
              {
                $(this).css ("left",(windowWidth-50) + "px");
              }
            });
        }



        function LoadHomePage(){
            CloseAllPopup();
            $('#homeDesk').show();
             $('.popup_div').show();
          }

          function LoadMainPage(){
            CloseAllPopup();
            $('.popup_div').hide();
            $('.centers').show();
            $('#pause').show();
            $('#play').hide();
            $.fn.startGame();
          }

          function LoadLicencePage(){
              CloseAllPopup();
              $('#licence').show();
              $('.popup_div').show();
          }


          function LoadHelpWindow(){
              CloseAllPopup();
              LoadMainPage();
              $('#helpWindow').show();
              $.fn.pauseGame();
              //$('.popup_div').hide();
          }

          function CloseAllPopup(){
              $('#homeDesk').hide();
              $('.centers').hide();
              $('#helpWindow').hide();
              $('#LevelComplet').hide();
              $('#gameOver').hide();
              $('.popup_div').hide();
          }

          function NextLevel()
          {
              level++;
              console.log(level);
              $.fn.startGame();
              $('#pause').show();
          }

          function getDirectLevel(a)
          {
              $.fn.stopGame();
              level=a;
              CloseAllPopup();
              startGame=true;
              stopGame=false;
              pauseGame=false;
              $.fn.startGame();
              $('.centers').show();
              $('#pause').show();

          }
        /*  When web page / web app is loaded
          - Create a spaceship  and move from top to bottom
          - Create a fighter plan*/

         $(document).ready(function (){

          var keys = {};

          $( window).resize (function () {
            console.log ("resized");
            adjustgame ();  // Adjust Screen when resizing
          });

          setInterval(movePlane, 10);

          $(window).keypress(function (e) {
            keys[e.keyCode] = true;
          });

          $(document).keydown(function(e) {
            keys[e.keyCode] = true;
          });

         $(document).keyup(function(e) {
              delete keys[e.keyCode];
          });


          //this function used for move the bottom plane using up,down,left and right key

          $.fn.startGame = function(){
              console.log(level);
              startGame=true;
              stopGame=false;
              pauseGame=false;
              fighterHealth =150;
              gamescore=00;
              $(".health").text(fighterHealth);
              $(".gamescore").text(gamescore);
              removeElement();
              if(level==1)

              {
                    var bg = 'images/level1.jpg';
                    $('body').css('background','url('+bg+')');
                    $.fn.gameTimer();
                    generateenemy();
                    enemyFalling();
                    enemyGspeed = 2000;
                    minutes = 1;
                    seconds = minutes*60;
              }
              else if(level==2)
              {
                    var bg = 'images/level2.jpg';
                    $('body').css('background','url('+bg+')');
                    NoOfEnemy = 3;
                    NoOfEnemyPlane = 3;
                    enemyGspeed = 9500;
                    planeGTime = 9500;
                   // generateenemy();
                    //enemyFalling();
                    generatePlane();
                    planeFalling();
                    setInterval(fireBullet,11000);
                    $.fn.gameTimer();
                    minutes = 1.5 ;
                    seconds = minutes*60;
              }
              else if(level==3)
              {
                    var bg = 'images/level3.jpg';
                    $('body').css('background','url('+bg+')');
                    NoOfEnemy = 2;
                    NoOfEnemyPlane = 2;
                    enemyGspeed = 10000;
                    planeGTime = 10000;
                    fighterHealth=1000;
                    generateenemy();
                    enemyFalling();
                    generatePlane();
                    planeFalling();
                    $.fn.gameTimer();
                    setInterval(fireBullet,12000);
                    minutes = 2 ;
                    seconds = minutes*60;
              }

          }

          $.fn.pauseGame = function(){
               pauseGame=true;
                $('#play').show();
                $('#pause').hide();
                $(".bullet").stop();
                $(".bulletFire").stop();
                $('.spaceship').stop();
               clearTimeout(enemyGTime);
               clearTimeout(enemyFTime);
          }


          $.fn.playGame = function(){

              $('#play').hide();
              $('#pause').show();
              if(stopGame){
                removeElement();
                $.fn.startGame();
                stopGame=false;
              }
              else
              {
                  console.log('play');
                 $(".bullet").each(function(){
                    var id = $(this).attr('id');
                    var pos = $('#'+id).position();
                    MOVETO("#"+id,pos.top-10,FighterBulletspeed);
                 });
                  $(".bulletFire").each(function(){
                    var id = $(this).attr('id');
                    var pos = $('#'+id).position();
                    MOVETODOWN("#"+id,pos,'pau');
                 });
                 stopGame=false;
                 pauseGame=false;
                 enemyFalling();
                 generateenemy();
                 $.fn.gameTimer();
                  if(level==2)
                 {
                    generatePlane();
                    planeFalling();
                 }
                 console.log(seconds);
              }
          }

          $.fn.showHelp = function(){
              $('#helpWindow').show();
          }

          $.fn.stopGame = function(){

               $('#play').show();
              $('#pause').hide();
              stopGame=true;
              $(".bullet").stop();
              $(".bulletFire").stop();
              $(".fighterPlane").stop();
              $('.spaceship').stop();
              clearTimeout(enemyGTime);
              clearTimeout(enemyFTime);
              clearTimeout(planeGTime);
              clearTimeout(planeFTime);
              clearTimeout(fireBLT);
              clearInterval(fireBulletTime);
          }

          $.fn.gameOver = function(){
            stopGame=true;
            $.fn.stopGame();
            $('#gameOver').show();
          }

          $('.gamescore').text(gamescore);
          $('.health').text(fighterHealth);
          var bomb = document.getElementById("bomb");
           // bomb.play();
          var shot = document.getElementById("shot");
          //shot.play();

          function movePlane() {

              if(stopGame || pauseGame)
              {
                  return false;
              }
              for (var direction in keys)
              {
                  if (!keys.hasOwnProperty(direction)) continue;

                  if (direction == 37)
                  {
                      if( $("#plane").position().left > 0 )
                          $("#plane").animate({left: "-=7"}, 0);     //Plane move left
                  }

              /*    if (direction == 38)
                  {
                      if( $("#plane").position().top >0)
                          $("#plane").animate({top: "-=7"}, 0);  //Plane move top
                  }
  */                if (direction == 39)
                  {
                      if( ($("#plane").position().left + $("#plane").width()) < windowWidth)
                          $("#plane").animate({left: "+=7"}, 0);  //Plane move right
                  }
    /*              if (direction == 40)
                  {
                     if( ($("#plane").position().top + $("#plane").height()) < windowHeight)
                        $("#plane").animate({top: "+=7"}, 0);  //Plane move down
                  }
            */      if(direction == 32  && startGame )
                  {
                          //-creates a tap handler to the entire window, to create a new bullet and fire him up the screenX*/
                          //creates: <div id ='bullet1 class='bullet'> </div>
                          var bulletHeight=0;
                          var bulletPosition=0;
                          var planePosition = $('#plane').position();
                          var planW = ($('#plane').width()/2) + 10;
                          if(mute){
                          shot.play();
                          }
                          bulletHeight = $("#bullet"+(bulletNumber-2)).height();

                          if(bulletNumber > 1 && (bulletHeight!=null || bulletHeight!=undefined ))
                          {
                            bulletPosition = $("#bullet"+(bulletNumber-1)).position();
                            bulletHeight = bulletPosition.top ;
                          }
                          if(bulletHeight < planePosition.top)
                          {
                            $("body").append ("<div id ='bullet"+ bulletNumber + "' class='bullet'></div>");
                            MOVETO("#bullet"+ bulletNumber,planePosition.top,FighterBulletspeed);
                            $("#bullet"+ bulletNumber).css("top",planePosition.top + "px");
                            $("#bullet"+ bulletNumber).css("left",planePosition.left + "px");
                            bulletNumber++;


                            $("body").append ("<div id ='bullet"+ bulletNumber + "' class='bullet'></div>");
                            MOVETO("#bullet"+ bulletNumber,planePosition.top,FighterBulletspeed);
                            $("#bullet"+ bulletNumber).css("top",planePosition.top + "px");
                            $("#bullet"+ bulletNumber).css("left",(planePosition.left + planW)+ "px");
                            bulletNumber++;
                          }

                  }
              }
          }


          function getPosition(entity) {
            var $entity = $(entity);
            var position = $entity.position();
            var width = $entity.width();
            var height = $entity.height();
            return [
              [position.left, position.left +  (width/2)],
              [position.top, position.top + (height/2)]
            ];
          }

          function posEqual(pos1, pos2) {
            var x1 = pos1[0] < pos2[0] ? pos1 : pos2,
                x2 = pos1[0] < pos2[0] ? pos2 : pos1;
            return x1[1] > x2[0] || x1[0] === x2[0];
          }

          function onCollisions(){

            if(stopGame || pauseGame)
            {
                clearTimeout(fireBLT); return false;
            }

                var $enemy1 = $("#plane")[0];
                      var pos2 = getPosition($enemy1);

                          $('.bulletFire').each(function(){

                              var $enemy = $(this)[0],
                                  pos1 = getPosition($enemy);
                        
                              var hMatch = posEqual(pos1[0], pos2[0]),
                                  vMatch = posEqual(pos1[1], pos2[1]),
                                  match = hMatch && vMatch;

                                  if (match) 
                                  {
                                      var hit = $('#plane').data('hit');

                                      hit || $('#plane').data('hit', !hit);

                                      if (hit) return;
                                       // console.log('#'+$(this).attr('id'));
                                        //explosion($('#'+$(this).attr('id')));
                                       // $(this).remove();
                                       // if(mute){
                                       // bomb.play();
                                       // }
                                       fighterHealth -= 20;

                                        if(fighterHealth<=0)
                                        {
                                          $.fn.stopGame();
                                          $.fn.gameOver();
                                        }
                                        $('.health').text(fighterHealth);
                                                          } 
                                  else 
                                  {
                                        $('#plane').data('hit', !!hit);
                                  }

                              })

                 fireBLT =  setTimeout(onCollisions,100);
              } 
            
         fireBLT = setTimeout( onCollisions,11000);



        //This function used for check plan and bullet is collied or not
        function checkCollisions(enemy,type){

            var pos2 = getPosition(enemy);

                $('.bullet').each(function(){

                  var $enemy = $(this)[0],
                      pos1 = getPosition($enemy);

                  var hMatch = posEqual(pos1[0], pos2[0]),
                      vMatch = posEqual(pos1[1], pos2[1]),
                      match = hMatch && vMatch;

            if (match) {
              var hit = $('#plane').data('hit');

              hit || $('#plane').data('hit', !hit);

              if (hit) return;
                $(enemy).remove();
                explosion($('#'+$(this).attr('id')));
                $(this).remove();
                if(mute){
                bomb.play();
                }
                gamescore= gamescore + 10;

                $('.gamescore').text(gamescore);

            } else {
              $('#plane').data('hit', !!hit);
            }

          })
    }


  //----------------------------------
    // this function is to generate enemy randomly scattered around screen
    function generateenemy() {

        if(stopGame || pauseGame)
        {
          clearTimeout(enemyGTime);return false;
        }
        // generate enemy using a for loop
        for (i = 0; i < NoOfEnemy; i++) {

            // randomize the top position of the enemy
            var enemyTop = Math.floor(2);

            // randomize the left position of the enemy
            var enemyLeft = Math.floor(Math.random() * (windowWidth - 10));

            // appending the enemy to the #enemyingScreen
            $('body').append(

            // generate the div representing the enemy and setting properties using various jQuery methods
            $('<div />')
                .addClass('spaceship')
                .css('top', enemyTop)
                .css('left', enemyLeft)
                .css('position', 'absolute'));
            //.html('*')


        }

        // repeat the generateenemy() function for each 3000 seconds
        enemyGTime = setTimeout(generateenemy, enemyGspeed);

    }

    // this function is to alter the top of each enemy, using the handy .each() jQuery method
    function enemyFalling() {

      if(stopGame || pauseGame)
        {
          clearTimeout(enemyFTime);return false;
        }
        // move the enemy
        $('.spaceship').each(function (key, value) {

            // check if the enemy has reached the bottom of the screen
            if (parseInt($(this).css('top')) > windowHeight - 80) {

                // remove the enemy from the HTML DOM structure
                $(this).remove();
                fighterHealth -= 20;

                if(fighterHealth<=0)
                {
                  $.fn.stopGame();
                  $.fn.gameOver();
                }
                $('.health').text(fighterHealth);
            }
            else
            {
                    checkCollisions(this,'spaceship');
            }

            // set up a random speed
            var fallingSpeed = Math.floor(Math.random() * 5 + 1);

            // set up a random direction for the enemy to move
            var movingDirection = Math.floor(Math.random() * 2);

            // get the enemy's current top
            var currentTop = parseInt($(this).css('top'));

            // get the enemy's current top
            var currentLeft = parseInt($(this).css('left'));

            // set the enemy's new top
            $(this).css('top', currentTop + fallingSpeed);

            // check if the enemy should move to left or move to right
            if (movingDirection === 0) {

                // set the enemy move to right
                $(this).css('left', currentLeft + fallingSpeed);

            } else {

                // set the enemy move to left
                $(this).css('left', currentLeft + -(fallingSpeed));

            }

        });


        // repeat the rollIt() function
       enemyFTime = setTimeout(enemyFalling, enemyFspeed);

    }

    // call the function when the document is loaded completely
//--------------------------------------------------------------------------------------------------

    // this function is to generate enemy randomly scattered around screen
    function generatePlane() {

      if(stopGame || pauseGame)
        {
          clearTimeout(planeFTime);return false;
        }
        // generate enemy using a for loop
        for (i = 0; i < NoOfEnemyPlane; i++) {

            // randomize the top position of the enemy
            var panTop = Math.floor(2);

            // randomize the left position of the enemy
            var planLeft = Math.floor(Math.random() * (windowWidth - 20));

            // appending the enemy to the #enemyingScreen
            $('body').append(

            // generate the div representing the enemy and setting properties using various jQuery methods
            $('<div />')
                .addClass('fighterPlane')
                .css('top', panTop)
                .css('left', planLeft)
                .css('position', 'absolute'));
            //.html('*')


        }

        // repeat the generateenemy() function for each 3000 seconds
        planeGTime = setTimeout(generatePlane, planeGspeed);

    }

    // this function is to alter the top of each enemy, using the handy .each() jQuery method
    function planeFalling() {

      if(stopGame || pauseGame)
        {
          clearTimeout(planeFTime );return false;
        }
        // move the enemy
        $('.fighterPlane').each(function (key, value) {

            // check if the enemy has reached the bottom of the screen
            if (parseInt($(this).css('top')) > windowHeight - 80) {

                // remove the enemy from the HTML DOM structure
                $(this).remove();
                fighterHealth -= 20;

                if(fighterHealth<=0)
                {
                  $.fn.stopGame();
                  $.fn.gameOver();
                }
                $('.health').text(fighterHealth);
            }
            else
            {
                    checkCollisions(this,'fighterPlane');
            }

            // set up a random speed
            var fallingSpeed = Math.floor(Math.random() * 5 + 1);

            // set up a random direction for the enemy to move
            var movingDirection = Math.floor(Math.random() * 2);

            // get the enemy's current top
            var currentTop = parseInt($(this).css('top'));

            // get the enemy's current top
            var currentLeft = parseInt($(this).css('left'));

            // set the enemy's new top
            $(this).css('top', currentTop + fallingSpeed);

            // check if the enemy should move to left or move to right
            if (movingDirection === 0) {

                // set the enemy move to right
                $(this).css('left', currentLeft + fallingSpeed);

            } else {

                // set the enemy move to left
                $(this).css('left', currentLeft + -(fallingSpeed));

            }

        });

        // repeat the rollIt() function for each 200 microseconds
       planeFTime = setTimeout(planeFalling, planeFspeed);

    }


//---------------------------------------------------------------------------------------------
        //remove unused element from source code..
        function removeElement(){
            $('.spaceship').each(function(){
                $(this).remove();
            });

            $(".fighterPlane").each(function()
            {
               
               $(this).remove();

            });

            $(".bulletFire").each(function()
            {
              $(this).remove();
            });
        }

       
        /// create fighter plane from enemy for second level
        // create Random Bullet from enemy side and fire

        function fireBullet()
        {
         
          if(stopGame || pauseGame)
          {
            clearTimeout(fireBulletTime); return false;
          }
          var NumberOFPlane = $(".fighterPlane").length;
          var random = Math.floor(Math.random() * $('.fighterPlane').length);
          var bulletFireH=0;
          var bulletFirePosition=0;
          var bulletFirePosition = $('.fighterPlane').eq(random).position();
          bulletHeight = $("#bulletFire"+(bulletFireNumber-1)).height();

          //create and append bullet in body
          if(bulletFirePosition.top !=null || bulletFirePosition.top !='' ) {
            $("body").append ("<div id ='bulletFire"+ bulletFireNumber + "' class='bulletFire'></div>");
            MOVETODOWN("#bulletFire"+ bulletFireNumber,bulletFirePosition,'bull'); 
            bulletFireNumber++;
          }

          //append random bullet after every 5000 milisecond
         fireBulletTime = setTimeout(fireBullet, 5000);
        }
       

        
        // this create firebomb when hit bullet enemy
        function explosion(explosionObject)
        {
          var bombLeft = explosionObject.position().left - (explosionObject.width()/10);
          var bombTop =  explosionObject.position().top - (explosionObject.height()/10);
          if(bombLeft > 20)
          {
            bombLeft -=10;
          }

          if(bombTop > 20)
          {
            bombTop -=10;
          }

          //create and append bullet in body
          $("body").append("<div  id='bomb"+bombID+"' class='bomb'  border='0' style='top:"+ bombTop + "px;left:"+ bombLeft + "px; transform:  scale(0.4);'></div>");

          var elem = $("#bomb"+bombID);

          //rotate firebomb
          $({deg: 0}).animate({deg: 90}, {
              duration: 600,
              step: function(now){
                      elem.css({
                      transform: "rotate(" + now + "deg)"
                    });
                  },
              complete:function()
                {
                  elem.hide();
                }
            });
          bombID++;
        }


        $.fn.gameTimer = function() { // has to be defined as a function, does not need to be inside a nested document ready function

        function convertIntToTime (num) {
            var mins = Math.floor(num/60);
            var secs = num % 60;
            var timerOutput = (mins < 10 ? "0" : "" ) + mins + ":" + (secs < 10 ? "0" : "" ) + secs;
            return(timerOutput);
        }

        var countdown = setInterval(function() {
            if(pauseGame){
              clearInterval(countdown);return false;
            }
            if(stopGame){
              seconds=minutes*60;clearInterval(countdown);return false;
            }
            var current = convertIntToTime(seconds); // set the display of the time

            $('.timer').text(current); // place the display time in the div
            if(seconds == 0) {
                if(fighterHealth > 0)
                {
                    clearInterval(countdown);
                    if(level==1 || level==2)
                    {
                      $.fn.stopGame();
                      $('#LevelComplet').show();
                    }
                    else
                    {

                      $.fn.stopGame();
                      $.fn.gameOver();

                    }

                }
                else
                {
                    $.fn.stopGame();
                    $.fn.gameOver();

                } // stop the time when there are no more seconds
            }

            seconds--; // subtract a second

        }, 1000);

      };



      //call the function when the document is loaded completely
      // start game
      //generateEnemy();
      //Play background music
      var backgroundMusic = document.getElementById("sound1");
        backgroundMusic.play();


      $("#mute >img").onTap(function(){

                $("#mute").hide();
                $("#unmute").show();
                backgroundMusic.play();
                mute=true;
      });

      $("#unmute >img").onTap(function(){

              $("#mute").show();
              $("#unmute").hide();
              backgroundMusic.pause();
              mute=false;

      });


      $("#pause >img").onTap(function(){

              $("#mute").show();
              $("#unmute").hide();
              backgroundMusic.pause();
              pauseGame=true;
              $.fn.pauseGame();
        });

      $('#play >img').onTap(function(){

              $("#mute").hide();
              $("#unmute").show();
              backgroundMusic.play();
               $.fn.playGame();
      });

      $('#help >img').onTap(function(){

              $('#helpWindow').show();
              $.fn.pauseGame();

      });

      $('#home >img').onTap(function(){
            removeElement();
            $.fn.stopGame();
            LoadHomePage();
            startGame=false;

      });

      $('#playAgain >img').onTap(function(){

            $('#gameOver').hide();
            removeElement();
            $.fn.startGame();

      });

      $('#reset >img').onTap(function(){

            $.fn.stopGame();
            stopGame=true;
            $.fn.startGame();
            $('#pause').show();
            $('#play').hide();

      });


      $('#gotIt').onTap(function(){
           $.fn.playGame();
      });

       $('#nextLevelGame').onTap(function(){
           $('#LevelComplet').hide();

           stopGame=true;
           $.fn.stopGame();
           NextLevel();
      });

    LoadHomePage();

});
