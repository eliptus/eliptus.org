var gaoMoves = new Array() ;

function MoveObject()
{
}

function Move(what, nXGoal, nYGoal, nWidthGoal, nHeightGoal, nTimeToMove, fCallback, vArg)
{
  var sElementID ;
  var oMove ;
  var eClone ;

  sElementID = what.id ;

  if ( null == gaoMoves[sElementID] )
  {
    gaoMoves[sElementID] = new MoveObject() ;
  }

  oMove = gaoMoves[sElementID] ;

  if ( null != oMove.oInterval )
  {
    clearInterval(oMove.oInterval) ;
    delete oMove.oInterval ;
  }

  eClone = what.cloneNode(true) ;
  eClone.style.visibility = "hidden" ;
  what.parentNode.appendChild(eClone) ;

  if ( null != nXGoal )
  {
    eClone.style.left = nXGoal ;
    nXGoal = eClone.offsetLeft ;
  }
  if ( null != nYGoal )
  {
    eClone.style.top = nYGoal ;
    nYGoal = eClone.offsetTop ;
  }
  if ( null != nWidthGoal )
  {
    eClone.style.width = nWidthGoal ;
    nWidthGoal = eClone.width ;
  }
  if ( null != nHeightGoal )
  {
    eClone.style.height = nHeightGoal ;
    nHeightGoal = eClone.height ;
  }

  if ( (null != nXGoal) && ("auto" != eClone.style.left) )
  {
      nXGoal -= eClone.width / 2 ;
  }
  if ( (null != nYGoal) && ("auto" != eClone.style.top) )
  {
      nYGoal -= eClone.height / 2 ;
  }

  what.parentNode.removeChild(eClone) ;
  delete eClone ;

  if ( null == nTimeToMove )
  {
    nTimeToMove = 0 ;
  }

  oMove.nXGoal = nXGoal ;
  oMove.nYGoal = nYGoal ;
  oMove.nWidthGoal = nWidthGoal ;
  oMove.nHeightGoal = nHeightGoal ;
  oMove.nTimeToMove = nTimeToMove ;
  oMove.fCallback = fCallback ;
  oMove.vArg = vArg ;
  oMove.nTimeStarted = new Date().getTime() ;
  oMove.oInterval = setInterval('MoveWork("' + sElementID + '")', 30) ;

  MoveWork(sElementID) ;
}

function MoveWork(sElementID)
{
  var what ;
  var oMove ;
  var nTimeCurrent ;
  var nTimeElapsed ;
  var nXStep ;
  var nYStep ;
  var nWidthStep ;
  var nHeightStep ;

  what = document.getElementById(sElementID) ;
  oMove = gaoMoves[sElementID] ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - oMove.nTimeStarted ;

  if ( nTimeElapsed < oMove.nTimeToMove )
  {
    if ( null != oMove.nXGoal )
    {
      nXStep = oMove.nXGoal - what.offsetLeft ;
      nXStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.left = String(nXStep + what.offsetLeft) + 'px' ;
    }
    if ( null != oMove.nYGoal )
    {
      nYStep = oMove.nYGoal - what.offsetTop ;
      nYStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.top = String(nYStep + what.offsetTop) + 'px' ;
    }
    if ( null != oMove.nWidthGoal )
    {
      nWidthStep = oMove.nWidthGoal - what.width ;
      nWidthStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.width = String(nWidthStep + what.width) + 'px';
    }
    if ( null != oMove.nHeightGoal )
    {
      nHeightStep = oMove.nHeightGoal - what.height ;
      nHeightStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.height = String(nHeightStep + what.height) + 'px';
    }

    oMove.nTimeToMove -= nTimeElapsed ;
    oMove.nTimeStarted = nTimeCurrent ;

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Move", "Pending"), oMove.vArg) ;
    }
  }
  else
  {
    clearInterval(oMove.oInterval) ;
    delete oMove.oInterval ;

    if ( null != oMove.nXGoal )
    {
      what.style.left = String(oMove.nXGoal) + 'px' ;
    }
    if ( null != oMove.nYGoal )
    {
      what.style.top = String(oMove.nYGoal) + 'px' ;
    }
    if ( null != oMove.nWidthGoal )
    {
      what.style.width = String(oMove.nWidthGoal) + 'px';
    }
    if ( null != oMove.nHeightGoal )
    {
      what.style.height = String(oMove.nHeightGoal) + 'px';
    }

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Move", "Complete"), oMove.vArg) ;
      delete oMove.fCallback ;
      delete oMove.vArg ;
    }
  }
}

function fGetWindowOffset(oElement)
{
  var oCurrent = oElement ;
  var nOffsetTop = 0 ;
  var nOffsetLeft = 0 ;

  while ( null != oCurrent )
  {
    nOffsetLeft += oCurrent.offsetLeft ;
    nOffsetTop += oCurrent.offsetTop ;
    oCurrent = oCurrent.offsetParent ;
  }

  return [nOffsetLeft, nOffsetTop] ;
}

