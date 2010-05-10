var ganTimeToResize = new Array() ;
var ganResizeTimeStarted = new Array() ;
var gasResizeCallbacks = new Array() ;
var gaResizeIntervals = new Array() ;

function Resize(what, nWidthGoal, nHeightGoal, nTimeToResize, sCallback)
{
  var sElementID ;
  var nTimeStarted ;
  var sIntervalCommand ;

  sElementID = what.id ;

  if ( null != gaResizeIntervals[sElementID] )
  {
    clearInterval(gaResizeIntervals[sElementID]) ;
    delete gaResizeIntervals[sElementID] ;
  }

  if ( isNaN(nWidthGoal) || isNaN(nHeightGoal) )
  {
    var eClone ;

    eClone = what.cloneNode(true) ;
    eClone.style.opacity = 0 ;
    what.parentNode.appendChild(eClone) ;

    if ( isNaN(nWidthGoal) )
    {
      eClone.style.width = nWidthGoal ;
      nWidthGoal = eClone.width ;
    }

    if ( isNaN(nHeightGoal) )
    {
      eClone.style.height = nHeightGoal ;
      nHeightGoal = eClone.height ;
    }

    what.parentNode.removeChild(eClone) ;
  }

  if ( null == nTimeToResize )
  {
    nTimeToResize = 0 ;
  }

  nTimeStarted = new Date().getTime() ;

  sIntervalCommand = '' ;
  sIntervalCommand += 'ResizeWork' ;
  sIntervalCommand += '("' ;
  sIntervalCommand += sElementID ;
  sIntervalCommand += '", ' ;
  sIntervalCommand += nWidthGoal ;
  sIntervalCommand += ', ' ;
  sIntervalCommand += nHeightGoal ;
  sIntervalCommand += ')' ;

  ganTimeToResize[sElementID] = nTimeToResize ;
  ganResizeTimeStarted[sElementID] = nTimeStarted ;
  gasResizeCallbacks[sElementID] = sCallback ;
  gaResizeIntervals[sElementID] = setInterval(sIntervalCommand, 30) ;

  eval(sIntervalCommand);
}

function ResizeWork(sElementID, nWidthGoal, nHeightGoal)
{
  var what ;
  var nTimeCurrent ;
  var nTimeElapsed ;
  var nWidthStep ;
  var nOffsetLeft ;
  var nHeightStep ;
  var nOffsetTop ;

  what = document.getElementById(sElementID) ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - ganResizeTimeStarted[sElementID] ;

  if ( nTimeElapsed < ganTimeToResize[sElementID] )
  {
    nWidthStep = nWidthGoal - what.width ;
    nOffsetLeft = nWidthStep / 2 ;
    nHeightStep = nHeightGoal - what.height ;
    nOffsetTop = nHeightStep / 2 ;
    nWidthStep *= ( nTimeElapsed ) / ganTimeToResize[sElementID] ;
    nOffsetLeft *= ( nTimeElapsed ) / ganTimeToResize[sElementID] ;
    nOffsetLeft = what.offsetLeft - nOffsetLeft ;
    nHeightStep *= ( nTimeElapsed ) / ganTimeToResize[sElementID] ;
    nOffsetTop *= ( nTimeElapsed ) / ganTimeToResize[sElementID] ;
    nOffsetTop = what.offsetTop - nOffsetTop ;

    what.width = what.width + nWidthStep ;
    what.style.left = nOffsetLeft + "px" ;
    what.height = what.height + nHeightStep ;
    what.style.top = nOffsetTop + "px" ;

    ganTimeToResize[sElementID] -= nTimeElapsed ;
    ganResizeTimeStarted[sElementID] = nTimeCurrent ;
  }
  else
  {
    clearInterval(gaResizeIntervals[sElementID]) ;
    delete gaResizeIntervals[sElementID] ;

    what.width = nWidthGoal ;
    what.height = nHeightGoal ;

    if ( null != gasResizeCallbacks[sElementID] )
    {
      eval(gasResizeCallbacks[sElementID]) ;
      delete gasResizeCallbacks[sElementID] ;
    }
  }

  //var debug = document.getElementById("debug") ;
  //debug.innerHTML = '' ;
  //debug.innerHTML += what.offsetLeft + what.width / 2 - window.innerWidth / 2 ;
  //debug.innerHTML += "," ;
  //debug.innerHTML += what.offsetTop + what.height / 2 - window.innerHeight / 2 ;
}
