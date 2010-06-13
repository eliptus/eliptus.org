function FadeObject()
{
}

FadeObject.prototype =
{
  Element : null ,
  nOpacityGoal : null ,
  fUpdate : null ,
  fComplete : null ,
  oInterval : null ,
  nTimeStepMs : 30 ,

  Execute : function ( nTimeToFade )
  {
    var This = this ;
    var nOpacityGoal = null ;
    var fWork = null ;

    if ( null != this.oInterval )
    {
      clearInterval(this.oInterval) ;
      delete this.oInterval ;
      this.oInterval = null ;
    }
    else if ( '' == this.Element.style.opacity)
    {
      this.Element.style.opacity = 1 ;
    }

    if ( null == nTimeToFade )
    {
      nTimeToFade = 0 ;
    }

    nOpacityGoal = this.nOpacityGoal ;

    nTimeGoal = new Date().getTime() + nTimeToFade ;

    fWork = function ()
    {
      This.Work
      (
        nOpacityGoal,
        nTimeGoal
      ) ;
    } ;

    this.oInterval = setInterval(fWork, this.nTimeStepMs) ;

    fWork() ;
  } ,

  Work : function
  (
    nOpacityGoal,
    nTimeGoal
  )
  {
    var nTimeCurrent ;
    var nOpacityStep ;

    nTimeCurrent = new Date().getTime() ;

    if ( nTimeGoal > nTimeCurrent )
    {
      nOpacityStep = nOpacityGoal - this.Element.style.opacity ;
      nOpacityStep *= ( this.nTimeStepMs ) / ( this.nTimeStepMs + nTimeGoal - nTimeCurrent ) ;
      this.Element.style.opacity = Number(this.Element.style.opacity) + nOpacityStep ;

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

      this.Element.style.opacity = nOpacityGoal ;

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
}

