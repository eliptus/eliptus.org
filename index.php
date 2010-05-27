<<??>?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" type="text/css" href=".stylesheets/default.css" ></link>
    <script type="text/javascript" src=".javascripts/default.js" ></script>
    <script type="text/javascript" src=".javascripts/fade.js" ></script>
    <script type="text/javascript" src=".javascripts/splash.js" ></script>
    <script type="text/javascript">

      var Window = window ;
      var Document = document ;
      var iEliptus = new Image() ;
      var oSplash = new SplashObject() ;
      var oHeader = new HeaderObject() ;

      function EliptusOnMove(aStatus)
      {
        if ( "Complete" == aStatus[1] )
        {
          iEliptus.style.visibility = "visible" ;
          iClone.style.visibility = "hidden" ;

          Document.body.removeChild(iClone) ;
          delete iClone ;
        }
      }

      function EliptusOnClick()
      {
        iClone = null ;
        anOffsetCurrent = new Array() ;
        anOffsetGoal = new Array() ;

        anOffsetCurrent = anOffsetCurrent.concat(fGetWindowOffset(iEliptus)) ;
        anOffsetCurrent.push(iEliptus.offsetWidth, iEliptus.offsetHeight) ;

        iClone = iEliptus.cloneNode(true) ;
        iClone.id = "iClone" ;
        iClone.style.visibility = "hidden" ;
        iClone.style.position = "fixed" ;
        iClone.style.left = String(anOffsetCurrent[0]) + "px" ;
        iClone.style.top = String(anOffsetCurrent[1]) + "px" ;
        iClone.style.width = String(anOffsetCurrent[2]) + "px" ;
        iClone.style.height = String(anOffsetCurrent[3]) + "px" ;
        Document.body.appendChild(iClone) ;

        iClone.style.visibility = "visible" ;
        iEliptus.style.visibility = "hidden" ;

        oHeader.ContentSet(iEliptus) ;

        anOffsetGoal = anOffsetGoal.concat(fGetWindowOffset(iEliptus)) ;
        anOffsetGoal.push(iEliptus.offsetWidth, iEliptus.offsetHeight) ;

        Move(iClone, String(anOffsetGoal[0]) + "px", String(anOffsetGoal[1]) + "px", String(anOffsetGoal[2]) + "px", String(anOffsetGoal[3]) + "px", 1000, EliptusOnMove) ;
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

        oHeader.Add(Document.body) ;
        oSplash.Add(Document.body) ;
      }

      function WindowOnMouseOver()
      {
        Window.onmouseover = "" ;

        Fade(iEliptus, 1, 1000, EliptusOnFade) ;
      }

      Window.onload = WindowOnLoad ;
      Window.onmouseover = WindowOnMouseOver ;

      iEliptus.id = "ELIPTUS" ;
      iEliptus.style.opacity = 0 ;
      iEliptus.src = ".images/Eliptus Ambigram - Sharp.jpg" ;
      iEliptus.alt = "ELIPTUS" ;

      oSplash.ContentSet(iEliptus) ;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
  </body>
</html>
