var gaoSplashes = new Array() ;

function SplashObject()
{
  var eTemp = null ;

  this.Index = gaoSplashes.push(this) - 1 ;

  this.ContentSet = _SplashContentSet ;
  this.Add = _SplashAdd ;

  this.Element = Document.createElement("div") ;
  this.Element.className = "SplashContainer" ;
  this.Element.id = this.Element.className + this.Index ;

  eTemp = Document.createElement("span") ;
  eTemp.className = "SplashVerticalSpacer" ;
  eTemp.id = eTemp.className + this.Index ;
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

