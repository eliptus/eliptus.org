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

  if ( null == nXGoal )
  {
    nXGoal = what.offsetLeft + what.width / 2 ;
  }
  if ( null == nYGoal )
  {
    nYGoal = what.offsetTop + what.height / 2 ;
  }
  if ( null == nWidthGoal )
  {
    nWidthGoal = what.width ;
  }
  if ( null == nHeightGoal )
  {
    nHeightGoal = what.height ;
  }

  eClone = what.cloneNode(true) ;
  eClone.style.visibility = "hidden" ;
  what.parentNode.appendChild(eClone) ;

  eClone.style.left = nXGoal ;
  eClone.style.top = nYGoal ;
  eClone.style.width = nWidthGoal ;
  eClone.style.height = nHeightGoal ;

  nXGoal = eClone.offsetLeft ;
  nYGoal = eClone.offsetTop ;
  nWidthGoal = eClone.width ;
  nHeightGoal = eClone.height ;

  if ( "auto" != eClone.style.left )
  {
      nXGoal -= eClone.width / 2 ;
  }
  if ( "auto" != eClone.style.top )
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
    nXStep = oMove.nXGoal - what.offsetLeft ;
    nYStep = oMove.nYGoal - what.offsetTop ;
    nWidthStep = oMove.nWidthGoal - what.width ;
    nHeightStep = oMove.nHeightGoal - what.height ;

    nXStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
    nYStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
    nWidthStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
    nHeightStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;

    oMove.nTimeToMove -= nTimeElapsed ;
    oMove.nTimeStarted = nTimeCurrent ;

    what.style.left = String(nXStep + what.offsetLeft) + 'px' ;
    what.style.top = String(nYStep + what.offsetTop) + 'px' ;
    what.style.width = String(nWidthStep + what.width) + 'px';
    what.style.height = String(nHeightStep + what.height) + 'px';

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Move", "Pending"), oMove.vArg) ;
    }
  }
  else
  {
    clearInterval(oMove.oInterval) ;
    delete oMove.oInterval ;

    what.style.left = String(oMove.nXGoal) + 'px' ;
    what.style.top = String(oMove.nYGoal) + 'px' ;
    what.style.width = String(oMove.nWidthGoal) + 'px';
    what.style.height = String(oMove.nHeightGoal) + 'px';

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Move", "Complete"), oMove.vArg) ;
      delete oMove.fCallback ;
      delete oMove.vArg ;
    }
  }
}

