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

      function HeaderOnFade(aStatus)
      {
        if ( "Complete" == aStatus[1] )
        {
          iClone.style.visibility = "hidden" ;
          Document.body.removeChild(iClone) ;
          delete iClone ;
        }
      }

      function CloneOnMove(aStatus)
      {
        if ( "Complete" == aStatus[1] )
        {
          oHeader.Element.style.opacity = 0 ;
          oHeader.Element.style.visibility = "visible" ;

          Fade(oHeader.Element, 1, 1000, HeaderOnFade) ;
        }
      }

      function EliptusOnClick()
      {
        iEliptus.onclick = null ;

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

        oSplash.Element.style.visibility = "hidden" ;

        oHeader.ContentSet(iEliptus) ;

        anOffsetGoal = anOffsetGoal.concat(fGetWindowOffset(iEliptus)) ;
        anOffsetGoal.push(iEliptus.offsetWidth, iEliptus.offsetHeight) ;

        Move(iClone, String(anOffsetGoal[0]) + "px", String(anOffsetGoal[1]) + "px", String(anOffsetGoal[2]) + "px", String(anOffsetGoal[3]) + "px", 1000, CloneOnMove) ;
      }

      function SplashOnFade(aStatus)
      {
        if ( "Complete" == aStatus[1] )
        {
          iEliptus.onclick = EliptusOnClick ;
        }
      }

      function WindowOnLoad()
      {
        Window.onload = null ;

        oHeader.Add(Document.body) ;
        oSplash.Add(Document.body) ;

        Window.onmouseover = WindowOnMouseOver ;
        Window.onclick = WindowOnClick ;
      }

      function WindowOnMouseOver()
      {
        Window.onmouseover = null ;

        SplashFadeIn() ;
      }

      function WindowOnClick()
      {
        Window.onclick = null ;

        SplashFadeIn() ;
      }

      function SplashFadeIn()
      {
        oSplash.Element.style.opacity = 0 ;
        oSplash.Element.style.visibility = "visible" ;

        Fade(oSplash.Element, 1, 1000, SplashOnFade) ;
      }

      Window.onload = WindowOnLoad ;

      iEliptus.id = "ELIPTUS" ;
      iEliptus.src = ".images/Eliptus Ambigram - Sharp.jpg" ;
      iEliptus.alt = "ELIPTUS" ;

      oHeader.Element.style.visibility = "hidden" ;

      oSplash.Element.style.visibility = "hidden" ;
      oSplash.ContentSet(iEliptus) ;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
  </body>
</html>
