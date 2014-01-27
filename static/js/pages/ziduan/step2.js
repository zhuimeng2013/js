jQuery(function($){
    var tpl = $('#cfg-zd-tpl').html();
    var filedTpl = $('#cfg-zd-field-tpl').html();
    var cfgContainer = $('#cfg-items');

    function substitute(p,o){
        return p.replace(/\{(\w+)\}/g,function(s,q){
            return o[q]!==undefined?o[q]:"{"+q+"}"})
    }

    var idx = 1;
    var idx2 = 1;


    var Page = {
        init:function(){

            //cfgContainer.html(this._getHTML());
            var div = $('<div class="block" />').html(this._getHTML()).appendTo(cfgContainer);

            this.bind();
        },
        _getHTML:function(a,b){
            var html = substitute(tpl,{
                selectedName:formFieldNamePrefix.selectedName+'_'+idx,
                selectRuleType:formFieldNamePrefix.selectRuleType+'_'+idx,
                selectType1:formFieldNamePrefix.selectType1+'_'+idx+'_'+idx2,
                selectType2:formFieldNamePrefix.selectType2+'_'+idx+'_'+idx2,
                selectType3:formFieldNamePrefix.selectType3+'_'+idx+'_'+idx2,
                idx:idx
            });
            idx++;
            idx2++;
            return html;
        },
        _getFieldHTML:function(id){
            var html = substitute(filedTpl,{
                selectType1:formFieldNamePrefix.selectType1+'_'+id+'_'+idx2,
                selectType2:formFieldNamePrefix.selectType2+'_'+id+'_'+idx2,
                selectType3:formFieldNamePrefix.selectType3+'_'+id+'_'+idx2
            });
            idx2++;
            return html;
        },
        bind:function(){
            var self = this;
            cfgContainer.on('click','.op-jia',function(){
                $('<div class="block" />').html(self._getHTML()).appendTo(cfgContainer);
            });
            cfgContainer.on('click','.op-jian',function(){
                if(cfgContainer.find('.block').length>1){
                    var parent  = $(this).closest('.block').remove();
                }else{
                    alert('至少需要保留一个');
                }
            });
            cfgContainer.on('click','.select-rule-type',function(){
                var type;
                var node = $(this).closest('.block').find('.myrule');
                if($(this).hasClass('checkbox-default')){
                    node.hide();
                }else{
                    node.show();
                }
            });

            cfgContainer.on('click','.op2-jia',function(){

                var p = $(this).closest('.myrule');

                var d = $('<div/>').html(self._getFieldHTML(p.data('idx')));
                d.find('.field').appendTo(p);

            });

            cfgContainer.on('click','.op2-jian',function(){

                if($(this).closest('.myrule').find('.field').length>1){
                    $(this).closest('.field').remove();
                }else{
                    alert('至少需要保留一个');
                }

            });

        },


        end:0

    };

    Page.init();


});
