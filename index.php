<<??>?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" type="text/css" href=".stylesheets/default.css" ></link>
    <script type="text/javascript" src=".javascripts/default.js" ></script>
    <script type="text/javascript" src=".javascripts/fade.js" ></script>
    <script type="text/javascript">

      var Window = window ;
      var Document = document ;
      var iEliptus = null ;

      function EliptusOnClick()
      {
          iClone = null ;
          anOffsetCurrent = new Array() ;
          anOffsetGoal = new Array() ;

          anOffsetCurrent = anOffsetCurrent.concat(fGetWindowOffset(iEliptus)) ;
          anOffsetCurrent.push(iEliptus.offsetWidth, iEliptus.offsetHeight) ;

          iClone = iEliptus.cloneNode(true) ;
          iClone.style.visibility = "hidden" ;
          iClone.style.position = "fixed" ;
          iClone.style.left = String(anOffsetCurrent[0]) + "px" ;
          iClone.style.top = String(anOffsetCurrent[1]) + "px" ;
          iClone.style.width = String(anOffsetCurrent[2]) + "px" ;
          iClone.style.height = String(anOffsetCurrent[3]) + "px" ;

          Document.body.appendChild(iClone) ;
          iClone.style.visibility = "visible" ;

          iEliptus.style.visibility = "hidden" ;

          var debug = Document.getElementById("debug") ;

          if ( null == debug )
          {
            debug = Document.createElement("div") ;
            debug.id = "debug" ;
            Document.body.appendChild(debug) ;
          }

          //debug.innerHTML += String(anOffsetCurrent) ;

      }

      function EliptusOnFade(aStatus)
      {
        if ( "Complete" == aStatus[1] )
        {
          iEliptus.onclick = EliptusOnClick ;
        }
      }

      function WindowOnLoad()
      {
        Window.onload = "" ;

        iEliptus = Document.getElementById("ELIPTUS") ;

        iEliptus.style.opacity = 0 ;
        iEliptus.src = ".images/Eliptus Ambigram - Sharp.jpg" ;
        iEliptus.alt = "ELIPTUS" ;
      }

      function WindowOnMouseOver()
      {
        Window.onmouseover = "" ;

        Fade(iEliptus, 1, 1000, EliptusOnFade) ;
      }

      Window.onload = WindowOnLoad ;
      Window.onmouseover = WindowOnMouseOver ;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
    <div class="SplashContainer" >
      <img class="SplashContent" id="ELIPTUS" alt="" src="" ></img>
      <span class="SplashVerticalSpacer" ></span>
    </div>
  </body>
</html>
