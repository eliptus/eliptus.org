<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <link rel="stylesheet" type="text/css" href=".stylesheets/default.css" />
    <script type="text/javascript" src=".javascripts/default.js">
    </script>
    <script type="text/javascript">

      function eliptus_onmouseover()
      {
        eliptus = this;
        eliptus.src = aImages["onmouseover"];
      }

      function eliptus_onmouseout()
      {
        eliptus = this;
        eliptus.src = aImages["onmouseout"];
      }

      function eliptus_onload()
      {
        eliptus = this;
        document.body.style.backgroundColor = aBackgrounds[eliptus.src];
        BgImg(eliptus);
      }

      function window_onload()
      {
        eliptus = document.getElementById("ELIPTUS");
        eliptus.onmouseover = eliptus_onmouseover;
        eliptus.onmouseout = eliptus_onmouseout;
        eliptus.onload = eliptus_onload;
        eliptus.style.maxWidth = "100%";
        eliptus.style.maxHeight = "100%";
        eliptus.src = aImages["onload"];
        BgImg(eliptus);
      }

      function window_onresize()
      {
        eliptus = document.getElementById("ELIPTUS");
        BgImg(eliptus);
      }

      aImages = new Array();
      aBackgrounds = new Array();
      iPreload = new Image();

<?php
class cBgInfo_t
{
  function __construct
  (
    $sImage,
    $sColor,
    $saEvents
  )
  {
    $this->sImage = $sImage;
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
  echo "      aBackgrounds[iPreload.src] = \"" . $cTmpBgInfo->sColor . "\";\n";
  while ( 0 < count($cTmpBgInfo->saEvents) )
  {
    echo "      aImages[\"" . array_shift($cTmpBgInfo->saEvents) . "\"] = iPreload.src;\n";
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
