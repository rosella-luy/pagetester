function sprintInt2(x) {
    return x > 9 ? x : '0' + x;
}

function timeStamp2Date(timestamp) {
    var dt = new Date(timestamp * 1000);

    var options = {year: "numeric", month: "short", day: "numeric"};

    var d = dt.toLocaleDateString("en-US", options);
    var t = dt.toLocaleTimeString("en-US");
    t = t.replace(/\u200E/g, '');
    t = t.replace(/GMT[+-]\d{1,4}/g, '');
    t = t.replace(/^([^\d]*\d{1,2}:\d{1,2}):\d{1,2}([^\d]*)$/, '$1$2');
    var result = d + ' ' + t;
    return result;
}
window.onload = function () {
    var myVideo = document.getElementsByTagName('video');

    if (myVideo.length != 0) {
        for (var i = 0; i < myVideo.length; i++) {
            myVideo[i].setAttribute("controls", "1");
        }
    }
};

;(function(exports){
  var IMG_PreHandler={
    img:document.querySelectorAll("#container amp-img"),
    init:function(){
      var html=document.querySelector("html"),
          baseSize=document.defaultView.getComputedStyle(html,"").getPropertyValue("font-size");

      this.param={
        container:document.querySelector("#container"),
        ampImg:this.img.length?this.img:document.querySelectorAll("#container img"),
        iframe:document.querySelectorAll("#container iframe"),
        video:document.querySelectorAll("#container video")
      };

      this.baseSize=parseInt(baseSize);
      this.bWidth=document.body.clientWidth;

      return this;
    },
    exec:function(){
      var eleList=this.param.ampImg,
        amp_img_node;
      for(var i=0;i<eleList.length;i++){
        amp_img_node=this.warp(eleList[i],'div');
        this.setBox(amp_img_node,eleList[i]);
      }
      this.show(this.param.container);
      return this;
    },
    setVideo:function(){
      var eleList=this.param.video,
          bWidth=this.bWidth,
          baseSize=this.baseSize;

      for(var i=0;i<eleList.length;i++){
        eleList[i].style["width"]=(bWidth-0.32*baseSize)+"px";
        eleList[i].style["height"]=(bWidth*(9/16))+"px";
      }
      return this;
    },
    /*function for styling embed video to be responsive*/
    setEmbedVideo:function(){
      var iframe=this.param.iframe,
          src,w,h,ratio,iNodeParent,
          op_video_container=document.querySelectorAll(".op-video-container"),
          has_op=true&&op_video_container.length;

      for(var i=0;i<iframe.length;i++){
        src=iframe[i].getAttribute("src");

        if(/\b\/embed|video\/\b/.test(src)){
          if(has_op){
            op_video_container[i].classList.remove("op-video-container");
          }
          
          w=parseInt(iframe[i].getAttribute("width"));
          h=parseInt(iframe[i].getAttribute("height"));
          ratio=(w&&h)?h/w:0.5625;

          iframe[i].style["position"]="absolute";
          iframe[i].style["width"]="100%";
          iframe[i].style["height"]="100%";

          iNodeParent=this.warp(iframe[i],'div');
          iNodeParent.style["position"]="relative";
          iNodeParent.style["padding-bottom"]=(ratio*100)+"%";
          iNodeParent.style["height"]="0px";
        }
      }
      return this;
    },
    warp:function(ele,w){
      var clone=ele.cloneNode(true),
        parent=ele.parentNode;

      w=(typeof w=="string")?document.createElement(w):w;
      w.appendChild(clone);
      parent.replaceChild(w,ele);
      return w;
    },
    setBox:function(ele,child){
      var w=child.getAttribute("data-image-width"),
          h=child.getAttribute("data-image-height"),
          ratio=h/w;

      var baseSize=this.baseSize;
      var bWidth=this.bWidth;

      var imgW=bWidth-2*0.16*baseSize;
      var imgH=imgW*ratio;

      imgH=(ele.parentNode.tagName=="FIGURE")?imgH+0.24*baseSize:imgH;
      
      ele.style.width=imgW+"px";
      ele.style.height=imgH+"px";

      ele.style["background-color"]="#FEFEFE";
    },
    modifyImageAuto:function(){
      var images=document.querySelectorAll("#container img");
      for(var i=0;i<images.length;i++){
        images[i].parentNode.style.height="auto";
      }
    },
    show:function(ele){
      ele.style.display="block";
    }
  };

  exports.IPH=IMG_PreHandler;
})(window);

document.addEventListener('DOMContentLoaded',function(){
  IPH.init().exec().setVideo().setEmbedVideo().modifyImageAuto();
},false); 

var _md5={
  ios:'26114BF94281AFC82A15645BBD468C11',
  android:'79DDCB677A432A277F3FDF7D7DEE3F95',
  pc:'46E2D7F7ECE6FD26896B49022BFB3926',
};

(function($g,directory,md5){
  var UA=$g.navigator.userAgent,
      ios=/\biPhone|iPad|Macintosh\b/,
      android=/\bAndroid\b/,  
      href=(ios.test(UA)&&"ios-page.css?v="+md5.ios)||(android.test(UA)&&"android-page.css?v="+md5.android)||"page.css?v="+md5.pc;

  var link=document.createElement("link");
      link.setAttribute("rel","stylesheet");
      link.setAttribute("type","text/css");
      link.setAttribute("href",directory+href);

  var head=document.querySelector("head");   
      head.appendChild(link);
})(window,"css/",_md5);