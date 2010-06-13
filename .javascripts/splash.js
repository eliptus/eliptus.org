function SplashObject()
{
  this.nIndex = SplashObject.prototype.nCount++ ;
  var eTemp = null ;

  eTemp = Document.createElement("span") ;
  eTemp.className = "SplashVerticalSpacer" ;

  this.Element = Document.createElement("div") ;
  this.Element.className = "SplashContainer" ;
  this.Element.id = this.Element.className + this.nIndex ;
  this.Element.appendChild(eTemp) ;
}


SplashObject.prototype =
{
  nCount : 0 ,

  ContentSet : function (eContent)
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
  } ,

  Add : function (eParent)
  {
    eParent.appendChild(this.Element) ;
  } ,
}

