var gnSplashes = 0 ;

function SplashObject()
{
  var This = this ;
  var nIndex = gnSplashes++ ;
  var eTemp = null ;

  function _ContentSet(eContent)
  {
    var eFirstChild = This.Element.firstChild ;

    eContent.className = "SplashContent" ;

    if ( "SplashContent" == eFirstChild.className )
    {
      This.Element.replaceChild(eContent, eFirstChild) ;
    }
    else
    {
      This.Element.insertBefore(eContent, eFirstChild) ;
    }
  }

  function _Add(eParent)
  {
    eParent.appendChild(This.Element) ;
  }

  This.Element = Document.createElement("div") ;
  This.Element.className = "SplashContainer" ;
  This.Element.id = This.Element.className + This.Index ;

  eTemp = Document.createElement("span") ;
  eTemp.className = "SplashVerticalSpacer" ;
  eTemp.id = eTemp.className + This.Index ;
  This.Element.appendChild(eTemp) ;

  This.ContentSet = _ContentSet ;
  This.Add = _Add ;
}

