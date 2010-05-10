var ganTimeToFade = new Array() ;
var ganFadeTimeStarted = new Array() ;
var gasFadeCallbacks = new Array() ;
var gaFadeIntervals = new Array() ;

function Fade(what, nOpacityGoal, sType, nTimeToFade, sCallback)
{
  var sElementID ;
  var nTimeStarted ;
  var sIntervalCommand ;

  sElementID = what.id ;

  if ( null != gaFadeIntervals[sElementID] )
  {
    clearInterval(gaFadeIntervals[sElementID]) ;
    delete gaFadeIntervals[sElementID] ;
  }
  else if ( '' == what.style.opacity)
  {
    what.style.opacity = 1 ;
  }

  if ( null == nTimeToFade )
  {
    nTimeToFade = 0 ;
  }

  nTimeStarted = new Date().getTime() ;

  sIntervalCommand = '' ;
  sIntervalCommand += sType ;
  sIntervalCommand += '("' ;
  sIntervalCommand += sElementID ;
  sIntervalCommand += '", ' ;
  sIntervalCommand += nOpacityGoal ;
  sIntervalCommand += ')' ;

  ganTimeToFade[sElementID] = nTimeToFade ;
  ganFadeTimeStarted[sElementID] = nTimeStarted ;
  gasFadeCallbacks[sElementID] = sCallback ;
  gaFadeIntervals[sElementID] = setInterval(sIntervalCommand, 30) ;

  eval(sIntervalCommand);
}

function FadeSimple(sElementID, nOpacityGoal)
{
  var what ;
  var nTimeCurrent ;
  var nTimeElapsed ;
  var nOpacityStep ;

  what = document.getElementById(sElementID) ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - ganFadeTimeStarted[sElementID] ;

  if ( nTimeElapsed < ganTimeToFade[sElementID] )
  {
    nOpacityStep = nOpacityGoal - what.style.opacity ;
    nOpacityStep *= ( nTimeElapsed ) / ganTimeToFade[sElementID] ;

    what.style.opacity = Number(what.style.opacity) + nOpacityStep ;

    ganTimeToFade[sElementID] -= nTimeElapsed ;
    ganFadeTimeStarted[sElementID] = nTimeCurrent ;
  }
  else
  {
    clearInterval(gaFadeIntervals[sElementID]) ;
    delete gaFadeIntervals[sElementID] ;

    what.style.opacity = nOpacityGoal ;

    if ( null != gasFadeCallbacks[sElementID] )
    {
      eval(gasFadeCallbacks[sElementID]) ;
      delete gasFadeCallbacks[sElementID] ;
    }
  }
}
