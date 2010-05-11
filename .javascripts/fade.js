var gaoFades = new Array() ;

function FadeObject()
{
}

function Fade(what, nOpacityGoal, nTimeToFade, fCallback, vArg)
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
  oFade.fCallback = fCallback ;
  oFade.vArg = vArg ;
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

    oFade.nTimeToFade -= nTimeElapsed ;
    oFade.nTimeStarted = nTimeCurrent ;

    what.style.opacity = Number(what.style.opacity) + nOpacityStep ;

    if ( null != oFade.fCallback )
    {
      oFade.fCallback(new Array("Fade", "Pending"), oFade.vArg) ;
    }
  }
  else
  {
    clearInterval(oFade.oInterval) ;
    delete oFade.oInterval ;

    what.style.opacity = oFade.nOpacityGoal ;

    if ( null != oFade.fCallback )
    {
      oFade.fCallback(new Array("Fade", "Complete"), oFade.vArg) ;
      delete oFade.fCallback ;
      delete oFade.vArg ;
    }
  }
}
