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
      var oTerminal = new TerminalObject() ;
      var nStateRepeat = 0 ;
      var oHintTimeout = null ;

      oState.afHandlers["WINDOW_LOADING"] = function (sStateCurrent, sStateNew)
      {
        Window.onload = oState.NewTrigger(sStateNew, "SPLASH_TRANSPARENT") ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_TRANSPARENT"] = function (sStateCurrent, sStateNew)
      {
        if ( sStateCurrent != sStateNew )
        {
          nStateRepeat = 0 ;
        }
        else
        {
          nStateRepeat++ ;
        }

        if ( 0 == nStateRepeat )
        {
          Window.onload = null ;

          oTerminal.Add(Document.body) ;
          oHeader.Add(Document.body) ;
          oSplash.Add(Document.body) ;

          Window.onmouseover = oState.NewTrigger(sStateNew, "SPLASH_FADING_IN") ;
          Window.onclick = oState.NewTrigger(sStateNew, "SPLASH_FADING_IN") ;
          oHintTimeout = setTimeout(oState.NewTrigger(sStateNew, sStateNew), 5000) ;
        }
        else if ( 1 == nStateRepeat )
        {
          oTerminal.Cursor("Blink") ;
          oHintTimeout = setTimeout(oState.NewTrigger(sStateNew, sStateNew), 2500) ;
        }
        else if ( 2 == nStateRepeat )
        {
          oTerminal.Cursor("Visible") ;
          oTerminal.fComplete = oState.NewTrigger(sStateNew, sStateNew) ;
          oTerminal.Type("Mouse-over or click the window...") ;
        }
        else if ( 3 == nStateRepeat )
        {
          oTerminal.fComplete = null ;
          oTerminal.Cursor("Blink") ;
        }

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_FADING_IN"] = function (sStateCurrent, sStateNew)
      {
        Window.onmouseover = null ;
        Window.onclick = null ;

        oTerminal.Cursor("Hidden") ;
        oTerminal.Clear() ;

        oSplash.Element.style.opacity = 0 ;
        oSplash.Element.style.visibility = null ;

        oFader.Element = oSplash.Element ;
        oFader.nOpacityGoal = 1 ;
        oFader.fComplete = oState.NewTrigger(sStateNew, "SPLASH_OPAQUE") ;
        oFader.Execute(1000) ;

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_OPAQUE"] = function (sStateCurrent, sStateNew)
      {
        if ( sStateCurrent != sStateNew )
        {
          nStateRepeat = 0 ;
        }
        else
        {
          nStateRepeat++ ;
        }

        if ( 0 == nStateRepeat )
        {
          oSplash.Element.style.opacity = null ;

          iEliptus.onclick = oState.NewTrigger(sStateNew, "SPLASH_HEADER_TRANSITION") ;
          oHintTimeout = setTimeout(oState.NewTrigger(sStateNew, sStateNew), 5000) ;
        }
        else if ( 1 == nStateRepeat )
        {
          oTerminal.Cursor("Blink") ;
          oHintTimeout = setTimeout(oState.NewTrigger(sStateNew, sStateNew), 2500) ;
        }
        else if ( 2 == nStateRepeat )
        {
          oTerminal.Cursor("Visible") ;
          oTerminal.fComplete = oState.NewTrigger(sStateNew, sStateNew) ;
          oTerminal.Type("Click the image...") ;
        }
        else if ( 3 == nStateRepeat )
        {
          oTerminal.fComplete = null ;
          oTerminal.Cursor("Blink") ;
        }

        return sStateNew ;
      }

      oState.afHandlers["SPLASH_HEADER_TRANSITION"] = function (sStateCurrent, sStateNew)
      {
        if ( sStateCurrent != sStateNew )
        {
          nStateRepeat = 0 ;
        }
        else
        {
          nStateRepeat++ ;
        }

        if ( 0 == nStateRepeat )
        {
          iEliptus.onclick = null ;

          oTerminal.Cursor("Hidden") ;
          oTerminal.Clear() ;

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
          iClone.style.visibility = null ;

          oSplash.Element.style.visibility = "hidden" ;

          iEliptus.style.visibility = "hidden" ;

          oHeader.Element.style.opacity = 0 ;
          oHeader.Element.style.visibility = null ;
          oHeader.ContentSet(iEliptus) ;

          anOffsetGoal = anOffsetGoal.concat(fGetWindowOffset(iEliptus)) ;
          anOffsetGoal.push(iEliptus.offsetWidth, iEliptus.offsetHeight) ;

          oMover.Element = iClone ;
          oMover.sXGoal = String(anOffsetGoal[0]) + "px" ;
          oMover.sYGoal = String(anOffsetGoal[1]) + "px" ;
          oMover.sWidthGoal = String(anOffsetGoal[2]) + "px" ;
          oMover.sHeightGoal = String(anOffsetGoal[3]) + "px" ;
          oMover.fComplete = oState.NewTrigger(sStateNew, sStateNew) ;
          oMover.Execute(1000) ;

          oFader.Element = oHeader.Element ;
          oFader.nOpacityGoal = 1 ;
          oFader.fComplete = oState.NewTrigger(sStateNew, sStateNew) ;
          oFader.Execute(1000) ;
        }
        else if ( 2 == nStateRepeat )
        {
          setTimeout(oState.NewTrigger(sStateNew, "HEADER_OPAQUE"), 0) ;
        }

        return sStateNew ;
      }

      oState.afHandlers["HEADER_OPAQUE"] = function (sStateCurrent, sStateNew)
      {
        iEliptus.style.visibility = null ;

        oHeader.Element.style.opacity = null ;

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

      oTerminal.Cursor("Hidden") ;

      oState.NewTrigger(null, "WINDOW_LOADING")() ;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
  </body>
</html>
