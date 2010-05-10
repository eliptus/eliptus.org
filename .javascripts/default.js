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
