var gaoMoves = new Array() ;

function MoveObject()
{
}

function Move(what, nXGoal, nYGoal, nTimeToMove, fCallback, vArg)
{
  var sElementID ;
  var oMove ;

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

  if ( isNaN(nXGoal) || isNaN(nYGoal) )
  {
    var eClone ;

    eClone = what.cloneNode(true) ;
    eClone.style.visibility = "hidden" ;
    what.parentNode.appendChild(eClone) ;

    if ( isNaN(nXGoal) )
    {
      eClone.style.left = nXGoal ;
      nXGoal = eClone.offsetLeft ;
      if ( "auto" == eClone.style.left )
      {
          nXGoal += eClone.width / 2 ;
      }
    }

    if ( isNaN(nYGoal) )
    {
      eClone.style.top = nYGoal ;
      nYGoal = eClone.offsetTop ;
      if ( "auto" == eClone.style.top )
      {
          nXGoal += eClone.height / 2 ;
      }
    }

    what.parentNode.removeChild(eClone) ;
    delete eClone ;
  }

  if ( null == nTimeToMove )
  {
    nTimeToMove = 0 ;
  }

  oMove.nXGoal = nXGoal ;
  oMove.nYGoal = nYGoal ;
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

  what = document.getElementById(sElementID) ;
  oMove = gaoMoves[sElementID] ;

  nTimeCurrent = new Date().getTime() ;
  nTimeElapsed = nTimeCurrent - oMove.nTimeStarted ;

  if ( nTimeElapsed < oMove.nTimeToMove )
  {
    nXStep = oMove.nXGoal - what.width / 2 - what.offsetLeft ;
    nYStep = oMove.nYGoal - what.height / 2 - what.offsetTop ;
    nXStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
    nYStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;

    oMove.nTimeToMove -= nTimeElapsed ;
    oMove.nTimeStarted = nTimeCurrent ;

    what.style.left = String(nXStep + what.offsetLeft) + 'px' ;
    what.style.top = String(nYStep + what.offsetTop) + 'px' ;

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Fade", "Pending"), oMove.vArg) ;
    }
  }
  else
  {
    clearInterval(oMove.oInterval) ;
    delete oMove.oInterval ;

    what.style.left = String(oMove.nXGoal - what.width / 2) + 'px' ;
    what.style.top = String(oMove.nYGoal - what.height / 2) + 'px' ;

    if ( null != oMove.fCallback )
    {
      oMove.fCallback(new Array("Fade", "Complete"), oMove.vArg) ;
      delete oMove.fCallback ;
      delete oMove.vArg ;
    }
  }
}

function HCenter(what)
{
  /* Perform Horizontal Center */
  what.style.left = ( (window.innerWidth/2) - (what.width/2) ) + "px" ;
}

function VCenter(what)
{
  /* Perform Vertical Center */
  what.style.top = ( (window.innerHeight/2) - (what.height/2) ) + "px" ;
}

function Center(what)
{
  HCenter(what) ;
  VCenter(what) ;
}

function BgImg(what)
{
  what.style.position = "fixed" ;
  what.style.zIndex = -1 ;
  Center(what) ;
}
