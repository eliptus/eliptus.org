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
    nWidthGoal = eClone.offsetWidth ;
  }
  if ( null != nHeightGoal )
  {
    eClone.style.height = nHeightGoal ;
    nHeightGoal = eClone.offsetHeight ;
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
      nWidthStep = oMove.nWidthGoal - what.offsetWidth ;
      nWidthStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.width = String(nWidthStep + what.offsetWidth) + 'px';
    }
    if ( null != oMove.nHeightGoal )
    {
      nHeightStep = oMove.nHeightGoal - what.offsetHeight ;
      nHeightStep *= ( nTimeElapsed ) / oMove.nTimeToMove ;
      what.style.height = String(nHeightStep + what.offsetHeight) + 'px';
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

var gaoHeaders = new Array() ;

function HeaderObject()
{
  this.Index = gaoHeaders.push(this) - 1 ;

  this.ContentSet = _HeaderContentSet ;
  this.Add = _HeaderAdd ;

  this.Element = Document.createElement("div") ;
  this.Element.className = "HeaderContainer"
  this.Element.id = this.Element.className + this.Index ;
}

function _HeaderContentSet(eContent)
{
  var eFirstChild = this.Element.firstChild ;

  eContent.className = "HeaderContent" ;

  if ( null == eFirstChild )
  {
    this.Element.appendChild(eContent) ;
  }
  else
  {
    this.Element.replaceChild(eContent, eFirstChild) ;
  }
}

function _HeaderAdd(eParent)
{
  eParent.appendChild(this.Element) ;
}

