function StateObject()
{
  var This = this ;
  var sStateCurrent = null ;

  function _Change(sStateOld, sStateNew)
  {
    var err = 0 ;

    if ( !err )
    {
      if ( sStateCurrent != sStateOld )
      {
        err = -1 ;
      }
    }


    if ( !err )
    {
      if ( null == This.afHandlers[sStateNew] )
      {
        err = -1 ;
      }
    }

    if ( !err )
    {
      sStateCurrent = This.afHandlers[sStateNew](sStateOld, sStateNew) ;
      if ( sStateCurrent != sStateNew )
      {
        err = -1 ;
      }
    }
  }

  function _NewTrigger(sStateOld, sStateNew)
  {
    return function(){This.Change(sStateOld,sStateNew);} ;
  }

  This.afHandlers = new Array() ;

  This.Change = _Change ;
  This.NewTrigger = _NewTrigger ;
}

function MoveObject()
{
  var This = this ;
  var oInterval = null ;
  var nXGoal = null ;
  var nYGoal = null ;
  var nWidthGoal = null ;
  var nHeightGoal = null ;
  var nTimeStarted = null ;

  function _Execute()
  {
    var eClone ;

    if ( null != oInterval )
    {
      clearInterval(oInterval) ;
      delete oInterval ;
      oInterval = null ;
    }

    if ( null == This.nTimeToMove )
    {
      This.nTimeToMove = 0 ;
    }

    eClone = This.Element.cloneNode(true) ;
    eClone.style.visibility = "hidden" ;
    This.Element.parentNode.appendChild(eClone) ;
    if ( null != This.sXGoal )
    {
      eClone.style.left = This.sXGoal ;
      nXGoal = eClone.offsetLeft ;
    }
    if ( null != This.sYGoal )
    {
      eClone.style.top = This.sYGoal ;
      nYGoal = eClone.offsetTop ;
    }
    if ( null != This.sWidthGoal )
    {
      eClone.style.width = This.sWidthGoal ;
      nWidthGoal = eClone.offsetWidth ;
    }
    if ( null != This.sHeightGoal )
    {
      eClone.style.height = This.sHeightGoal ;
      nHeightGoal = eClone.offsetHeight ;
    }
    This.Element.parentNode.removeChild(eClone) ;
    delete eClone ;

    nTimeStarted = new Date().getTime() ;
    oInterval = setInterval(_Work, 30) ;

    _Work() ;
  }

  function _Work()
  {
    var nTimeCurrent ;
    var nTimeElapsed ;
    var nXStep ;
    var nYStep ;
    var nWidthStep ;
    var nHeightStep ;

    nTimeCurrent = new Date().getTime() ;
    nTimeElapsed = nTimeCurrent - nTimeStarted ;

    if ( nTimeElapsed < This.nTimeToMove )
    {
      if ( null != nXGoal )
      {
        nXStep = nXGoal - This.Element.offsetLeft ;
        nXStep *= ( nTimeElapsed ) / This.nTimeToMove ;
        This.Element.style.left = String(nXStep + This.Element.offsetLeft) + 'px' ;
      }
      if ( null != nYGoal )
      {
        nYStep = nYGoal - This.Element.offsetTop ;
        nYStep *= ( nTimeElapsed ) / This.nTimeToMove ;
        This.Element.style.top = String(nYStep + This.Element.offsetTop) + 'px' ;
      }
      if ( null != nWidthGoal )
      {
        nWidthStep = nWidthGoal - This.Element.offsetWidth ;
        nWidthStep *= ( nTimeElapsed ) / This.nTimeToMove ;
        This.Element.style.width = String(nWidthStep + This.Element.offsetWidth) + 'px';
      }
      if ( null != nHeightGoal )
      {
        nHeightStep = nHeightGoal - This.Element.offsetHeight ;
        nHeightStep *= ( nTimeElapsed ) / This.nTimeToMove ;
        This.Element.style.height = String(nHeightStep + This.Element.offsetHeight) + 'px';
      }

      This.nTimeToMove -= nTimeElapsed ;
      nTimeStarted = nTimeCurrent ;

      if ( null != This.fUpdate )
      {
        if ( "function" == typeof(This.fUpdate) )
        {
          This.fUpdate() ;
        }
        else
        {
          eval(This.fUpdate) ;
        }
      }
    }
    else
    {
      clearInterval(oInterval) ;
      delete oInterval ;
      oInterval = null ;

      if ( null != nXGoal )
      {
        This.Element.style.left = String(nXGoal) + 'px' ;
      }
      if ( null != nYGoal )
      {
        This.Element.style.top = String(nYGoal) + 'px' ;
      }
      if ( null != nWidthGoal )
      {
        This.Element.style.width = String(nWidthGoal) + 'px';
      }
      if ( null != nHeightGoal )
      {
        This.Element.style.height = String(nHeightGoal) + 'px';
      }

      if ( null != This.fComplete )
      {
        if ( "function" == typeof(This.fComplete) )
        {
          This.fComplete() ;
        }
        else
        {
          eval(This.fComplete) ;
        }
      }
    }
  }

  This.Element = null ;
  This.sXGoal = null ;
  This.sYGoal = null ;
  This.sWidthGoal = null ;
  This.sHeightGoal = null ;
  This.nTimeToMove = null ;
  This.fUpdate = null ;
  This.fComplete = null ;

  This.Execute = _Execute ;
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

var gnHeaders = 0 ;

function HeaderObject()
{
  this.Index = gnHeaders++ ;

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

