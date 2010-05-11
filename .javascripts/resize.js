var gaoResizes = new Array() ;

function ResizeObject()
{
}

function Resize(what, nWidthGoal, nHeightGoal, nTimeToResize, fCallback, vArg)
{
  var sElementID ;
  var oResize ;

  sElementID = what.id ;

  if ( null == gaoResizes[sElementID] )
  {
    gaoResizes[sElementID] = new ResizeObject() ;
  }

  oResize = gaoResizes[sElementID] ;

  if ( null != oResize.oInterval )
  {
    clearInterval(oResize.oInterval) ;
    delete oResize.oInterval ;
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
    delete eClone ;
  }

  if ( null == nTimeToResize )
  {
    nTimeToResize = 0 ;
  }

  oResize.nWidthGoal = nWidthGoal ;
  oResize.nHeightGoal = nHeightGoal ;
  oResize.nTimeToResize = nTimeToResize ;
  oResize.fCallback = fCallback ;
  oResize.vArg = vArg ;
  oResize.nTimeStarted = new Date().getTime() ;
  oResize.oInterval = setInterval('ResizeWork("' + sElementID + '")', 30) ;

  ResizeWork(sElementID) ;
}

function ResizeWork(sElementID)
{
  var what ;
  var oResize ;
  var nTimeCurrent ;
  var nTimeElapsed ;
  var nWidthStep ;
  var nHeightStep ;

  what = document.getElementById(sElementID) ;
  oResize = gaoResizes[sElementID] ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - oResize.nTimeStarted ;

  if ( nTimeElapsed < oResize.nTimeToResize )
  {
    nWidthStep = oResize.nWidthGoal - what.width ;
    nHeightStep = oResize.nHeightGoal - what.height ;
    nWidthStep *= ( nTimeElapsed ) / oResize.nTimeToResize ;
    nHeightStep *= ( nTimeElapsed ) / oResize.nTimeToResize ;

    oResize.nTimeToResize -= nTimeElapsed ;
    oResize.nTimeStarted = nTimeCurrent ;

    what.width += nWidthStep ;
    what.height += nHeightStep ;

    if ( null != oResize.fCallback )
    {
      oResize.fCallback(new Array("Fade", "Pending"), oResize.vArg) ;
    }
  }
  else
  {
    clearInterval(oResize.oInterval) ;
    delete oResize.oInterval ;

    what.width = oResize.nWidthGoal ;
    what.height = oResize.nHeightGoal ;

    if ( null != oResize.fCallback )
    {
      oResize.fCallback(new Array("Fade", "Complete"), oResize.vArg) ;
      delete oResize.fCallback ;
      delete oResize.vArg ;
    }
  }
}
