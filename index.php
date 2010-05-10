<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" type="text/css" href=".stylesheets/default.css" />
    <script type="text/javascript" src=".javascripts/default.js">
    </script>
    <script type="text/javascript" src=".javascripts/fade.js">
    </script>
    <script type="text/javascript" src=".javascripts/resize.js">
    </script>
    <script type="text/javascript">

      function eliptus_onmouseover()
      {
        var eliptus = this;

        eliptus.src = asImages["onmouseover"];
      }

      function eliptus_onmouseout()
      {
        var eliptus = this;

        eliptus.src = asImages["onmouseout"];
      }

      function eliptus_onload()
      {
        var eliptus = this;

        document.body.style.backgroundColor = asBackgroundColors[eliptus.src] ;
        document.body.style.color = asColors[eliptus.src] ;

        BgImg(eliptus) ;

        if ( "black" == document.body.style.backgroundColor )
        {
          Fade(eliptus, 1, 2000) ;
          Resize(this, "auto", "auto", 1000);
        }
        else
        {
          Fade(eliptus, 0, 2000) ;
          Resize(this, "90%", "auto", 1000);
        }
      }

      function window_onload()
      {
        var eliptus = document.getElementById("ELIPTUS");

        eliptus.style.opacity = 0 ;
        eliptus.onmouseover = eliptus_onmouseover;
        eliptus.onmouseout = eliptus_onmouseout;
        eliptus.onload = eliptus_onload;
        eliptus.style.maxWidth = "100%";
        eliptus.style.maxHeight = "100%";
        eliptus.src = asImages["onload"];
        BgImg(eliptus);
      }

      function window_onresize()
      {
        var eliptus = document.getElementById("ELIPTUS");

        BgImg(eliptus);
      }

      var asImages = new Array();
      var asBackgroundColors = new Array();
      var asColors = new Array();
      var iPreload = new Image();

<?php
class cBgInfo_t
{
  function __construct
  (
    $sImage,
    $sBackgroundColor,
    $sColor,
    $saEvents
  )
  {
    $this->sImage = $sImage;
    $this->sBackgroundColor = $sBackgroundColor;
    $this->sColor = $sColor;
    $this->saEvents = $saEvents;
  }
}

$acBgInfo = array
(
  new cBgInfo_t
  (
    ".images/Eliptus Ambigram - Sharp.jpg",
    "black",
    "red",
    array
    (
      "onload",
      "onmouseout"
    )
  ),
  new cBgInfo_t
  (
    ".images/Eliptus Ambigram - Inverted.jpg",
    "red",
    "black",
    array
    (
      "onmouseover"
    )
  ),
);

while ( 0 < count($acBgInfo) )
{
  $cTmpBgInfo = array_shift($acBgInfo);
  echo "      iPreload.src = \"" . $cTmpBgInfo->sImage . "\";\n";
  echo "      asBackgroundColors[iPreload.src] = \"" . $cTmpBgInfo->sBackgroundColor . "\";\n";
  echo "      asColors[iPreload.src] = \"" . $cTmpBgInfo->sColor . "\";\n";
  while ( 0 < count($cTmpBgInfo->saEvents) )
  {
    echo "      asImages[\"" . array_shift($cTmpBgInfo->saEvents) . "\"] = iPreload.src;\n";
  }
}
?>

      window.onload = window_onload;
      window.onresize = window_onresize;

    </script>
    <title>
      ELIPTUS
    </title>
  </head>
  <body>
    <div id="debug">
    </div>
    <div>
      <img id="ELIPTUS" alt="ELIPTUS" src="" />
    </div>
  </body>
</html>
