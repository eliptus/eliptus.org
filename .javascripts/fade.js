var gaoFades = new Array() ;

function FadeObject()
{
}

function Fade(what, nOpacityGoal, nTimeToFade, sCallback)
{
  var sElementID ;
  var oFade ;

  sElementID = what.id ;

  if ( null == gaoFades[sElementID] )
  {
    gaoFades[sElementID] = new FadeObject() ;
  }

  oFade = gaoFades[sElementID] ;

  if ( null != oFade.oInterval )
  {
    clearInterval(oFade.oInterval) ;
    delete oFade.oInterval ;
  }
  else if ( '' == what.style.opacity)
  {
    what.style.opacity = 1 ;
  }

  if ( null == nTimeToFade )
  {
    nTimeToFade = 0 ;
  }

  oFade.nOpacityGoal = nOpacityGoal ;
  oFade.nTimeToFade = nTimeToFade ;
  oFade.sCallback = sCallback ;
  oFade.nTimeStarted = new Date().getTime() ;
  oFade.oInterval = setInterval('FadeWork("' + sElementID + '")', 30) ;

  FadeWork(sElementID) ;
}

function FadeWork(sElementID)
{
  var what ;
  var oFade ;
  var nTimeCurrent ;
  var nTimeElapsed ;
  var nOpacityStep ;

  what = document.getElementById(sElementID) ;
  oFade = gaoFades[sElementID] ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - oFade.nTimeStarted ;

  if ( nTimeElapsed < oFade.nTimeToFade )
  {
    nOpacityStep = oFade.nOpacityGoal - what.style.opacity ;
    nOpacityStep *= ( nTimeElapsed ) / oFade.nTimeToFade ;

    what.style.opacity = Number(what.style.opacity) + nOpacityStep ;

    oFade.nTimeToFade -= nTimeElapsed ;
    oFade.nTimeStarted = nTimeCurrent ;
  }
  else
  {
    clearInterval(oFade.oInterval) ;
    delete oFade.oInterval ;

    what.style.opacity = oFade.nOpacityGoal ;

    if ( null != oFade.sCallback )
    {
      eval(oFade.sCallback) ;
      delete oFade.sCallback ;
    }
  }
}
