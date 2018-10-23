(function(hastitle,psd) {
        var width = document.documentElement.clientWidth||document.body.clientWidth;
        var height = document.documentElement.clientHeight||document.body.clientHeight;
        var rootele = document.createElement('style');
        // if(!rootele){
          document.documentElement.appendChild(rootele);
          rootele.id = 'roots';
          rootele.style='text/css';
        // }
        var fontsize = width/psd*100;
        var scalesize = Math.min(1,height/width*(hastitle? 750/1207: 750/1334));
        var htmls = 'html{font-size: '+fontsize+'px};.auto_scale{transform: scale(${scalesize})}';
        rootele.innerHTML = htmls;
})(true, 750);