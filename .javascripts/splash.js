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
    var sClass = "SplashContent" ;
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

  Remove : function ()
  {
    this.ContentSet() ;
    this.Element.parentNode.removeChild(this.Element) ;
  } ,
}

