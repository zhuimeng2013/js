jQuery(function($){
    var catList = $('#cat-list');
    var selectedList = $('#selected-list-dl');
    var btn = $('#btn-ajax-search');
    var container = $('#cat-ajax');

    var Page = {
        init:function(){
             this.initSearchBtn();
             this._bind();
        },
        initSearchBtn:function(){
            if(!btn[0]) return;
            var url = btn.data('url');
            var self = this;
            var keywords;
            btn.on('click',function(e){
                e.preventDefault();
                keywords = $('#keywords').val();
                if(!$.trim(keywords)){
                    alert('请输入搜索的关键词');
                    return;
                }
                self._ajax({
                    url:url,
                    keywords:keywords,
                    callback:self._render
                });
            });
        },
        _render:function(res){
            var html = [];
            if(res&&res.success===true){
                if(res.data.length==0){
                    catList.html('没有找到对于的搜索结果');
                }else{
                    html.push('<table>');
                    var data = res.data;
                    for(var i= 0,len = data.length;i<len;i=i+4){
                        html.push('<tr>');
                        for(var j=0;j<4;j++){
                            if(i+j<len){
                                html.push('<td><input class="box box-'+(i+j)+'" data-t="'+data[i+j]["label"]+'" data-cls="box-'+(i+j)+'" data-idx="'+(i+j)+'" type="checkbox" name="'+data[i+j]['k']+'" value="'+data[i+j]['v']+'"/><label>'+data[i+j]["label"]+'</label></td>');
                            }else{
                                html.push('<td>&nbsp;</td>');
                            }

                        }
                        html.push('</tr>');
                    }
                    html.push('</table>');
                    selectedList.find('dd').remove();
                }
                catList.html(html.join('')).show();
                $('#do-all').show();
            }else{
                alert('数据加载出错，请重试!');
            }
        },
        _bind:function(){
           var tmpNode;
           var self = this;
            container.on('click','span.cancle',function(e){
                tmpNode = $(this).closest('dd').remove();
                self._delCat($(this),0);
            });
            container.on('click','input.box',function(){
                var _this =  $(this);
               if(_this.data('tag')){
                   //console.log('del');
                  _this.data('tag',0);
                  self._delCat($(this),1);
               }else{
                   //console.log('add');
                   _this.data('tag',1);
                  self._addCat($(this),1);
               }
            });

            $('#do-all').on('click','input',function(){
                var _this =  $(this);
                selectedList.find('dd').remove();
                if(_this.data('tag')){
                    _this.data('tag',0);
                    self._delAllCat();
                }else{
                    _this.data('tag',1);
                    self._addAllCat();
                }
            });
        },
        _delCat:function(el,type){
           var cls = el.data('cls');
           if(type===0){
               catList.find('.'+cls).attr('checked',false).data('tag',0);
           }else{
               selectedList.find('.'+cls).remove();
               $('#do-all').find('input').attr('checked',false).data('tag',0);
           }
        },
        _delAllCat:function(){
         var boxes = container.find('input.box')
            boxes.data('tag',1);
            boxes.trigger('click').attr('checked',false)
        },
        _addCat:function(el,type){
            var cls = el.data('cls');
            var node;
            node = $('<dd class="'+el.data('cls')+'"><div class="item"><h4>'+el.data('t')+'</h4><span class="cancle" data-cls="'+el.data('cls')+'"></span></div></dd>').appendTo(selectedList);
        },
        _addAllCat:function(){
            var boxes =  container.find('input.box')
            boxes.data('tag',0);
            boxes.trigger('click');
            boxes.attr('checked',true)
        },
        _ajax:function(obj){
            $.ajax({
                url:obj.url,
                data:{
                    keywords:encodeURIComponent(obj.keywords)
                },
                type:'GET',
                dataType:'json'
            }).done(function(res){
                obj.callback&&obj.callback(res);
            });
        }
    };

    Page.init();

});
