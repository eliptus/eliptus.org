function SplashObject()
{
  var eTemp = null ;

  this.ContentSet = _SplashContentSet ;
  this.Add = _SplashAdd ;

  this.Element = Document.createElement("div") ;
  this.Element.className = "SplashContainer"

  eTemp = Document.createElement("span") ;
  eTemp.className = "SplashVerticalSpacer" ;
  this.Element.appendChild(eTemp) ;
}

function _SplashContentSet(eContent)
{
  var eFirstChild = this.Element.firstChild ;

  eContent.className = "SplashContent" ;

  if ( "SplashContent" == eFirstChild.className )
  {
    this.Element.replaceChild(eContent, eFirstChild) ;
  }
  else
  {
    this.Element.insertBefore(eContent, eFirstChild) ;
  }
}

function _SplashAdd(eParent)
{
  eParent.appendChild(this.Element) ;
}

