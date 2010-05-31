function FadeObject()
{
  var This = this ;
  var oInterval = null ;
  var nOpacityGoal = null ;
  var nTimeStarted = null ;

  function _Execute()
  {
    if ( null != oInterval )
    {
      clearInterval(oInterval) ;
      delete oInterval ;
      oInterval = null ;
    }
    else if ( '' == This.Element.style.opacity)
    {
      This.Element.style.opacity = 1 ;
    }

    if ( null == This.nTimeToFade )
    {
      This.nTimeToFade = 0 ;
    }

    nOpacityGoal = This.nOpacityGoal ;

    nTimeStarted = new Date().getTime() ;
    oInterval = setInterval(_Work, 30) ;

    _Work() ;
  }

  function _Work()
  {
    var nTimeCurrent ;
    var nTimeElapsed ;
    var nOpacityStep ;

    nTimeCurrent = new Date().getTime() ;
    nTimeElapsed = nTimeCurrent - nTimeStarted ;

    if ( nTimeElapsed < This.nTimeToFade )
    {
      nOpacityStep = nOpacityGoal - This.Element.style.opacity ;
      nOpacityStep *= ( nTimeElapsed ) / This.nTimeToFade ;
      This.Element.style.opacity = Number(This.Element.style.opacity) + nOpacityStep ;

      This.nTimeToFade -= nTimeElapsed ;
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

      This.Element.style.opacity = nOpacityGoal ;

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
  This.nOpacityGoal = null ;
  This.nTimeToFade = null ;
  This.fUpdate = null ;
  This.fComplete = null ;

  This.Execute = _Execute ;
}

