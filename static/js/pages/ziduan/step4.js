jQuery(function($){
    var tpl = $('#cfg-zd-tpl').html();
    var cfgContainer = $('#cfg-items');

    function substitute(p,o){

        return p.replace(/\{(\w+)\}/g,function(s,q){
            console.log(q);
            return o[q]!==undefined?o[q]:"{"+q+"}"})
    }

    var idx = 1;
    var idx2 = 1;


    var Page = {
        init:function(){

            //cfgContainer.html(this._getHTML());
            var div = $('<div class="block" />').html(this._getHTML()).appendTo(cfgContainer);

            $(".datepicker",div).datepicker({
                altFormat: "yyyyy-mm-dd",
                appendText:"yyyy-mm-dd",
                dateFormat: "yy-mm-dd"
            });
            $('select.lowest-standard',div).on('change',function(){
                var v = $(this).val();
                var sibling = $(this).closest('.block').find('.dt-fields');
                if(v!=0){
                    sibling.show();
                }else{
                    sibling.hide();
                }
            });

            this.bind();
        },
        _getHTML:function(a,b){
            var html = substitute(tpl,{
                lowestStandard:formFieldNamePrefix.lowestStandard+'_'+idx,
                shoufeiType:formFieldNamePrefix.shoufeiType+'_'+idx,
                amount:formFieldNamePrefix.amount+'_'+idx+'_'+idx2,
                startDate:formFieldNamePrefix.startDate+'_'+idx,
                endDate:formFieldNamePrefix.endDate+'_'+idx,
                idx:idx
            });
            idx++;
            idx2++;
            return html;
        },

        bind:function(){
            var self = this;
            cfgContainer.on('click','.op-jia',function(){
                var div = $('<div class="block" />').html(self._getHTML()).appendTo(cfgContainer);

                $(".datepicker",div).datepicker({
                    altFormat: "yyyyy-mm-dd",
                    appendText:"yyyy-mm-dd",
                    dateFormat: "yy-mm-dd"
                });
                $('select.lowest-standard',div).on('change',function(){
                    var v = $(this).val();
                    var sibling = $(this).closest('.block').find('.dt-fields');
                    if(v!=0){
                        sibling.show();
                    }else{
                        sibling.hide();
                    }
                });
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



        },


        end:0

    };

    Page.init();


});
