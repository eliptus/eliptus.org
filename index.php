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
      var oState = new StateObject() ;
      var iEliptus = new Image() ;
      var oSplash = new SplashObject() ;
      var oHeader = new HeaderObject() ;
      var oFader = new FadeObject() ;
      var oMover = new MoveObject() ;

      oState.afHandlers["WINDOW_LOADING"] = function (sStateCurrent, sStateNew)
      {
        Window.onload = oState.NewTrigger(sStateNew, "SPLASH_TRANSPARENT") ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_TRANSPARENT"] = function (sStateCurrent, sStateNew)
      {
        Window.onload = null ;
        oHeader.Add(Document.body) ;
        oSplash.Add(Document.body) ;

        Window.onmouseover = oState.NewTrigger(sStateNew, "SPLASH_FADING_IN") ;
        Window.onclick = oState.NewTrigger(sStateNew, "SPLASH_FADING_IN") ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_FADING_IN"] = function (sStateCurrent, sStateNew)
      {
        Window.onmouseover = null ;
        Window.onclick = null ;

        oSplash.Element.style.opacity = 0 ;
        oSplash.Element.style.visibility = "visible" ;

        oFader.Element = oSplash.Element ;
        oFader.nOpacityGoal = 1 ;
        oFader.nTimeToFade = 1000 ;
        oFader.fComplete = oState.NewTrigger(sStateNew, "SPLASH_OPAQUE") ;
        oFader.Execute() ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_OPAQUE"] = function (sStateCurrent, sStateNew)
      {
        iEliptus.onclick = oState.NewTrigger(sStateNew, "SPLASH_HEADER_TRANSITION") ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_HEADER_TRANSITION"] = function (sStateCurrent, sStateNew)
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

        oMover.Element = iClone ;
        oMover.sXGoal = String(anOffsetGoal[0]) + "px" ;
        oMover.sYGoal = String(anOffsetGoal[1]) + "px" ;
        oMover.sWidthGoal = String(anOffsetGoal[2]) + "px" ;
        oMover.sHeightGoal = String(anOffsetGoal[3]) + "px" ;
        oMover.nTimeToMove = 1000 ;
        oMover.fComplete = oState.NewTrigger(sStateNew, "HEADER_FADING_IN") ;
        oMover.Execute() ;

        return sStateNew ;
      }

      oState.afHandlers["HEADER_FADING_IN"] = function (sStateCurrent, sStateNew)
      {
        oHeader.Element.style.opacity = 0 ;
        oHeader.Element.style.visibility = "visible" ;

        oFader.Element = oHeader.Element ;
        oFader.nOpacityGoal = 1 ;
        oFader.nTimeToFade = 1000 ;
        oFader.fComplete = oState.NewTrigger(sStateNew, "HEADER_OPAQUE") ;
        oFader.Execute() ;

        return sStateNew ;
      }

      oState.afHandlers["HEADER_OPAQUE"] = function (sStateCurrent, sStateNew)
      {
        iClone.style.visibility = "hidden" ;
        Document.body.removeChild(iClone) ;
        delete iClone ;

        return sStateNew ;
      }

      iEliptus.id = "ELIPTUS" ;
      iEliptus.src = ".images/Eliptus Ambigram - Sharp.jpg" ;
      iEliptus.alt = "ELIPTUS" ;

      oHeader.Element.style.visibility = "hidden" ;

      oSplash.Element.style.visibility = "hidden" ;
      oSplash.ContentSet(iEliptus) ;

      oState.NewTrigger(null, "WINDOW_LOADING")() ;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
  </body>
</html>
