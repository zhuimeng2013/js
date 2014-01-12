jQuery(function($){
    var gongshiCache = [];
    var gongshiCacheHtml = [];
    var gongshiCacheDisplayHtml = [];

    var signListNode = $('#sign-list');

    var signArry = ['(',')','+','-','*','/','back'];

    var displayContainer = $('#gongshi-list');
    var postConatiner = $('#hidden-gongshi');
    var postContainerText = $('#hidden-gongshi-txt');


    var Page = {
        init:function(){
           this._init();
           this.event();
        },
        _init:function(){
          var v1 = postConatiner.val();
          var v2 = postContainerText.val();
          var steps;
          var html = [];
          if(v1&&v2){
              gongshiCache = v1.split('|');
              gongshiCacheHtml = v2.split('|');
              if(gongshiCache.length==gongshiCacheHtml.length){
                  for(var i= 0,len=gongshiCacheHtml.length;i<len;i++){
                      if($.inArray(gongshiCacheHtml[i],signArry)){
                          gongshiCacheDisplayHtml.push('<span class="step s">'+gongshiCacheHtml[i]+'</span>');
                      }else{
                          gongshiCacheDisplayHtml.push('<span class="step">'+gongshiCacheHtml[i]+'</span>');
                      }
                  }
                  displayContainer.html(gongshiCacheDisplayHtml.join(''));
              }
          }
        },
        event:function(){
            var self = this;
            signListNode.on('click','.sign',function(e){
                e.preventDefault();
                self._signHandle($(this).data('idx'));
            });
            $('#btn-price').on('click',function(e){
                e.preventDefault();
                var v = $(this).data('v');
                self.addStepByField(v,$(this).html());
            });
            $('#btn-count').on('click',function(e){
                e.preventDefault();
                var v = $(this).data('v');
                self.addStepByField(v,$(this).html());
            });

            $('.select-field','#select-type').on('change',function(){
               if(this.selectedIndex!==0){
                   self.addStepByField($(this).val(),$(this).find('option:selected').text());
               }
            });
        },
        _signHandle:function(sign){
          if(sign==7){
            this.delStep();
          }else{
            this.addStep(signArry[sign],true);
          }
        },
        addStepByField:function(step,name){
            gongshiCache.push(step);
            postConatiner.val(gongshiCache.join('|'));

            gongshiCacheHtml.push(name);
            postContainerText.val(gongshiCacheHtml.join('|'));

            gongshiCacheDisplayHtml.push('<span class="step">'+name+'</span>');
            displayContainer.html(gongshiCacheDisplayHtml.join(''));
        },
        addStep:function(step){
            gongshiCache.push(step);
            postConatiner.val(gongshiCache.join('|'));

            gongshiCacheHtml.push(name);
            postContainerText.val(gongshiCacheHtml.join('|'));

            gongshiCacheDisplayHtml.push('<span class="step s">'+step+'</span>');
            displayContainer.html(gongshiCacheDisplayHtml.join(''));
        },
        delStep:function(step){
            gongshiCache.pop();
            gongshiCacheHtml.pop();
            gongshiCacheDisplayHtml.push();

            postConatiner.val(gongshiCache.join('|'));
            postContainerText.val(gongshiCacheHtml.join('|'));
            displayContainer.html(gongshiCacheDisplayHtml.join(''));
        },
        end:0
    };
    Page.init();
});
