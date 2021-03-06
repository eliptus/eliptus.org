String.prototype.cmTrim = function ()
{
  var sResult = this ;

  rExtraSpaces = /\s{2,}/g ;
  rBeginSpaces = /^\s+/g ;
  rEndSpaces = /\s+$/g ;

  sResult = sResult.replace(rExtraSpaces, ' ') ;
  sResult = sResult.replace(rBeginSpaces, '') ;
  sResult = sResult.replace(rEndSpaces, '') ;

  if ( '' == sResult )
  {
    sResult = null ;
  }

  return sResult ;
} ;

String.prototype.cmContainsWords = function()
{
  var bResult = false ;
  var i ;

  for ( i = 0 ; arguments.length > i ; i++ )
  {
    rWord = RegExp('\\b' + arguments[i] + '\\b', 'g') ;
    if ( rWord.test(this) )
    {
      bResult = true ;
      break ;
    }
  }

  return bResult ;
}

String.prototype.cmAddWords = function()
{
  var sResult = this ;
  var i ;

  for ( i = 0 ; arguments.length > i ; i++ )
  {
    if ( !sResult.cmContainsWords(arguments[i]) )
    {
      sResult += ' ' + arguments[i] ;
    }
  }

  sResult = sResult.cmTrim() ;

  return sResult ;
}

String.prototype.cmRemoveWords = function()
{
  var sResult = this ;
  var i ;

  for ( i = 0 ; arguments.length > i ; i++ )
  {
    rWord = RegExp('\\b' + arguments[i] + '\\b', 'g') ;
    sResult = sResult.replace(rWord, '') ;
  }

  sResult = sResult.cmTrim() ;

  return sResult ;
}

function StateObject()
{
  this.afHandlers = new Array() ;
}

StateObject.prototype =
{
  sStateCurrent : null ,

  Change : function (sStateOld, sStateNew)
  {
    var err = 0 ;

    if ( !err )
    {
      if ( this.sStateCurrent != sStateOld )
      {
        err = -1 ;
      }
    }


    if ( !err )
    {
      if ( null == this.afHandlers[sStateNew] )
      {
        err = -1 ;
      }
    }

    if ( !err )
    {
      this.sStateCurrent = this.afHandlers[sStateNew](sStateOld, sStateNew) ;
      if ( this.sStateCurrent != sStateNew )
      {
        err = -1 ;
      }
    }
  } ,

  NewTrigger : function (sStateOld, sStateNew)
  {
    var This = this ;

    return function(){This.Change(sStateOld,sStateNew);} ;
  } ,
} ;

function MoveObject()
{
}

MoveObject.prototype =
{
  Element : null ,
  sXGoal : null ,
  sYGoal : null ,
  sWidthGoal : null ,
  sHeightGoal : null ,
  fUpdate : null ,
  fComplete : null ,
  oInterval : null ,
  nTimeStepMs : 30 ,

  Execute : function ( nTimeToMove )
  {
    var This = this ;
    var nXGoal = null ;
    var nYGoal = null ;
    var nWidthGoal = null ;
    var nHeightGoal = null ;
    var nTimeGoal = null ;
    var fWork = null ;

    var eClone ;

    if ( null != this.oInterval )
    {
      clearInterval(this.oInterval) ;
      delete this.oInterval ;
      this.oInterval = null ;
    }

    if ( null == nTimeToMove )
    {
      nTimeToMove = 0 ;
    }

    eClone = this.Element.cloneNode(true) ;
    eClone.style.visibility = "hidden" ;
    this.Element.parentNode.appendChild(eClone) ;
    if ( null != this.sXGoal )
    {
      eClone.style.left = this.sXGoal ;
      nXGoal = eClone.offsetLeft ;
    }
    if ( null != this.sYGoal )
    {
      eClone.style.top = this.sYGoal ;
      nYGoal = eClone.offsetTop ;
    }
    if ( null != this.sWidthGoal )
    {
      eClone.style.width = this.sWidthGoal ;
      nWidthGoal = eClone.offsetWidth ;
    }
    if ( null != this.sHeightGoal )
    {
      eClone.style.height = this.sHeightGoal ;
      nHeightGoal = eClone.offsetHeight ;
    }
    this.Element.parentNode.removeChild(eClone) ;
    delete eClone ;

    nTimeGoal = new Date().getTime() + nTimeToMove ;

    fWork = function ()
    {
      This.Work
      (
        nXGoal,
        nYGoal,
        nWidthGoal,
        nHeightGoal,
        nTimeGoal
      ) ;
    } ;

    this.oInterval = setInterval(fWork, this.nTimeStepMs) ;

    fWork() ;
  } ,

  Work : function
  (
    nXGoal,
    nYGoal,
    nWidthGoal,
    nHeightGoal,
    nTimeGoal
  )
  {
    var nTimeCurrent ;
    var nXStep ;
    var nYStep ;
    var nWidthStep ;
    var nHeightStep ;

    nTimeCurrent = new Date().getTime() ;

    if ( nTimeGoal > nTimeCurrent )
    {
      if ( null != nXGoal )
      {
        nXStep = nXGoal - this.Element.offsetLeft ;
        nXStep *= ( this.nTimeStepMs ) / ( this.nTimeStepMs + nTimeGoal - nTimeCurrent ) ;
        this.Element.style.left = String(nXStep + this.Element.offsetLeft) + 'px' ;
      }
      if ( null != nYGoal )
      {
        nYStep = nYGoal - this.Element.offsetTop ;
        nYStep *= ( this.nTimeStepMs ) / ( this.nTimeStepMs + nTimeGoal - nTimeCurrent ) ;
        this.Element.style.top = String(nYStep + this.Element.offsetTop) + 'px' ;
      }
      if ( null != nWidthGoal )
      {
        nWidthStep = nWidthGoal - this.Element.offsetWidth ;
        nWidthStep *= ( this.nTimeStepMs ) / ( this.nTimeStepMs + nTimeGoal - nTimeCurrent ) ;
        this.Element.style.width = String(nWidthStep + this.Element.offsetWidth) + 'px';
      }
      if ( null != nHeightGoal )
      {
        nHeightStep = nHeightGoal - this.Element.offsetHeight ;
        nHeightStep *= ( this.nTimeStepMs ) / ( this.nTimeStepMs + nTimeGoal - nTimeCurrent ) ;
        this.Element.style.height = String(nHeightStep + this.Element.offsetHeight) + 'px';
      }

      if ( null != this.fUpdate )
      {
        if ( "function" == typeof(this.fUpdate) )
        {
          this.fUpdate() ;
        }
        else
        {
          eval(this.fUpdate) ;
        }
      }
    }
    else
    {
      clearInterval(this.oInterval) ;
      delete this.oInterval ;
      this.oInterval = null ;

      if ( null != nXGoal )
      {
        this.Element.style.left = String(nXGoal) + 'px' ;
      }
      if ( null != nYGoal )
      {
        this.Element.style.top = String(nYGoal) + 'px' ;
      }
      if ( null != nWidthGoal )
      {
        this.Element.style.width = String(nWidthGoal) + 'px';
      }
      if ( null != nHeightGoal )
      {
        this.Element.style.height = String(nHeightGoal) + 'px';
      }

      if ( null != this.fComplete )
      {
        if ( "function" == typeof(this.fComplete) )
        {
          this.fComplete() ;
        }
        else
        {
          eval(this.fComplete) ;
        }
      }
    }
  } ,
} ;

function HeaderObject()
{
  var nIndex = HeaderObject.prototype.nCount++ ;

  this.Element = document.createElement('div') ;
  this.Element.className = "HeaderContainer" ;
  this.Element.id = this.Element.className + nIndex ;
}

HeaderObject.prototype =
{
  nCount : 0 ,

  ContentSet : function (eContent)
  {
    var sClass = "HeaderContent" ;
    var eChild = this.Element.firstChild ;

    while ( null != eChild )
    {
      if ( eChild.className.cmContainsWords(sClass) )
      {
        eChild.className = eChild.className.cmRemoveWords(sClass) ;
        this.Element.removeChild(eChild) ;
      }
      eChild = eChild.nextSibling ;
    }

    if ( null != eContent )
    {
      eContent.className = eContent.className.cmAddWords(sClass) ;
      this.Element.appendChild(eContent) ;
    }
  } ,

  Add : function (eParent)
  {
    eParent.appendChild(this.Element) ;
  } ,
}

function TerminalObject()
{

  this.nIndex = TerminalObject.prototype.nCount++ ;

  this.eText = Document.createElement("span") ;
  this.eText.className = "TerminalText" ;

  this.eCursor = Document.createElement("span") ;
  this.eCursor.className = "TerminalCursor" ;
  this.eCursor.innerHTML = "_" ;

  this.Element = Document.createElement("div") ;
  this.Element.className = "TerminalContainer"
  this.Element.id = this.Element.className + this.nIndex
  this.Element.appendChild(this.eText) ;
  this.Element.appendChild(this.eCursor) ;
}

TerminalObject.prototype =
{
  nCount : 0 ,
  eText : null ,
  eCursor : null ,
  sTextInput : '' ,
  oTextInterval : null ,
  oCursorInterval : null ,
  fUpdate : null ,
  fComplete : null ,

  TypeWork : function ()
  {
    this.eText.innerHTML += this.sTextInput.substring(0,1) ;
    this.sTextInput = this.sTextInput.substring(1) ;
    if ( '' != this.sTextInput )
    {
      if ( null != this.fUpdate )
      {
        if ( "function" == typeof(this.fUpdate) )
        {
          this.fUpdate() ;
        }
        else
        {
          eval(this.fUpdate) ;
        }
      }
    }
    else
    {
      clearInterval(this.oTextInterval) ;
      delete this.oTextInterval ;
      this.oTextInterval = null ;

      if ( null != this.fComplete )
      {
        if ( "function" == typeof(this.fComplete) )
        {
          this.fComplete() ;
        }
        else
        {
          eval(this.fComplete) ;
        }
      }
    }
  } ,

  CursorToggle : function ()
  {
    if ( "hidden" != this.eCursor.style.visibility )
    {
      this.eCursor.style.visibility = "hidden" ;
    }
    else
    {
      this.eCursor.style.visibility = null ;
    }
  } ,

  Type : function (sInput)
  {
    var This = this ;
    var fWork = null ;

    this.sTextInput += sInput ;

    if ( ('' != this.sTextInput) && (null == this.oTextInterval) )
    {
      fWork = function ()
      {
        This.TypeWork() ;
      }
      this.oTextInterval = setInterval(fWork, 100) ;
    }
  } ,

  Clear : function ()
  {
    if ( null != this.oTextInterval )
    {
      clearInterval(this.oTextInterval) ;
      delete this.oTextInterval ;
      this.oTextInterval = null ;
    }

    this.sTextInput = '' ;
    this.eText.innerHTML = '' ;
  } ,

  Cursor : function (sState)
  {
    var This = this ;
    var fWork = null ;

    if ( null != this.oCursorInterval )
    {
      clearInterval(this.oCursorInterval) ;
      delete this.oCursorInterval ;
      this.oCursorInterval = null ;
    }

    switch ( sState )
    {
      case "Visible" :
        this.eCursor.style.visibility = null ;
        break ;

      case "Hidden" :
        this.eCursor.style.visibility = "hidden" ;
        break ;

      case "Toggle" :
        this.CursorToggle() ;
        break ;

      case "Blink" :
        fWork = function ()
        {
          This.CursorToggle() ;
        }
        this.oCursorInterval = setInterval(fWork, 500) ;
        break ;
    }
  } ,

  Add : function (eParent)
  {
    eParent.appendChild(this.Element) ;
    this.eCursor.style.backgroundColor = fGetStyle(this.Element, "color") ;
  } ,

  Remove : function ()
  {
    this.Element.parentNode.removeChild(this.Element) ;
  } ,
}

function fGetStyle(oElement, sProperty)
{
    var sValue

    if ( oElement.currentStyle )
    {
        sValue = oElement.currentStyle[sProperty];
    }
    else if ( window.getComputedStyle )
    {
        sValue = document.defaultView.getComputedStyle(oElement,null).getPropertyValue(sProperty);
    }

    return sValue;
}

function fGetWindowOffset(oElement)
{
  var oCurrent = oElement.offsetParent ;
  var nOffsetLeft = oElement.offsetLeft ;
  var nOffsetTop = oElement.offsetTop ;

  while ( (null != oCurrent) && (document.body != oCurrent) )
  {
    nOffsetLeft += parseFloat(fGetStyle(oCurrent, "border-left-width")) ;
    nOffsetLeft += oCurrent.offsetLeft ;

    nOffsetTop += parseFloat(fGetStyle(oCurrent, "border-top-width")) ;
    nOffsetTop += oCurrent.offsetTop ;

    oCurrent = oCurrent.offsetParent ;
  }

  return [nOffsetLeft, nOffsetTop] ;
}

function fSetBorder(eTarget)
{
  var sClass = "BorderContainer" ;
  var eTemp = null ;
  var sRows = ["Top","Bottom"] ;
  var sColumns = ["Left","Right"] ;
  var i = 0, j = 0 ;

  eTarget.className = eTarget.className.cmAddWords(sClass) ;

  for ( i in sRows )
  {
    for ( j in sColumns )
    {
      eTemp = document.createElement('span') ;
      eTemp.className = "Border" + sRows[i] + sColumns[j] ;
      eTarget.appendChild(eTemp) ;
    }
  }
}

