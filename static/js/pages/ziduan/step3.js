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

            var div = $('<div class="block" />').html(this._getHTML()).appendTo(cfgContainer);
            this._renderField(div);

            this.bind();
        },
        _getBaseFieldName:function(node){
            var baseFieldNode = $('select.base-field option:selected',node);
            var baseFieldName = baseFieldNode.text();
            return baseFieldName;
        },
        _getUnit:function(node){
            var unit = $('select.pricing-mode option:selected',node).data('unit');
            return unit;
        },
        _renderField:function(node){
            var baseFieldName = this._getBaseFieldName(node);
            //根据基数字段下拉框选中的值进行赋值
            $('span.base-field',node).html(this._getBaseFieldName(node));
            //根据调价方式下拉框选中的值进行赋值
            $('span.pricing-mode',node).html(this._getUnit(node));
            this._addTD(node,baseFieldName);
            this._event(node);

            $(".datepicker",node).datepicker({
                altFormat: "yyyyy-mm-dd",
                appendText:"yyyy-mm-dd",
                dateFormat: "yy-mm-dd"
            });
        },
        _event:function(node){
            $('select.price-type',node).on('change',function(){
                var v = $(this).val();
                if(v==1){
                    $('.biaozhun',node).hide();
                    $('.jieti',node).show();
                }else{
                    $('.biaozhun',node).show();
                    $('.jieti',node).hide();
                }
            });

            $('select.pricing-mode',node).on('change',function(){
                var txt = $(this).find('option:selected').text();
                $('span.pricing-mode',node).html(txt);

            });

            $('select.base-field',node).on('change',function(){
                var txt = $(this).find('option:selected').text();
                $('span.base-field',node).html(txt);
            });

        },
        _addTD:function(node,isFromClick){
            var table =   $('table.ladder-price-table',node);
            var tbody = table.find('tbody');
            var tag  = node.find('.base-field-tag');
            var name = tag.html();

            if(isFromClick){
                table.find('.num-end').removeClass('disable');
            }

            $('<tr/>').html(this._getFieldHTML({
                baseFieldName:name,
                id:tag.data('idx')
            })).appendTo(tbody);
        },
        _getHTML:function(a,b){
            var html = substitute(tpl,{
                priceType:formFieldNamePrefix.priceType+'_'+idx,
                baseField:formFieldNamePrefix.baseField+'_'+idx,
                amount:formFieldNamePrefix.amount+'_'+idx+'_'+idx2,
                cycleTime:formFieldNamePrefix.cycleTime+'_'+idx+'_'+idx2,
                pricingMode:formFieldNamePrefix.pricingMode+'_'+idx+'_'+idx2,
                startDate:formFieldNamePrefix.startDate+'_'+idx,
                endDate:formFieldNamePrefix.endDate+'_'+idx,
                numStart:formFieldNamePrefix.numStart+'_'+idx,
                numEnd:formFieldNamePrefix.numEnd+'_'+idx,
                jietiValue:formFieldNamePrefix.jietiValue+'_'+idx,
                idx:idx
            });
            idx++;
            idx2++;
            return html;
        },
        _getFieldHTML:function(obj){
            var html = substitute(filedTpl,{
                numStart:formFieldNamePrefix.numStart+'_'+obj.id+'_'+idx2,
                numEnd:formFieldNamePrefix.numEnd+'_'+obj.id+'_'+idx2,
                jietiValue:formFieldNamePrefix.jietiValue+'_'+obj.id+'_'+idx2,
                baseFieldName:obj.baseFieldName
            });
            idx2++;
            return html;
        },
        bind:function(){
            var self = this;
            cfgContainer.on('click','.op-jia',function(){
                var div = $('<div class="block" />').html(self._getHTML()).appendTo(cfgContainer);
                self._renderField(div);
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

                self._addTD(p,true);

            });

            cfgContainer.on('click','.op2-jian',function(){
                var p = $(this).closest('.myrule');

                var tdItems = p.find('tr');
                console.log(tdItems.length);

                if(tdItems.length>3){
                    tdItems.last().remove();
                    p.find('.num-end').last().addClass('disable');
                }else{
                    alert('删除失败，至少需要保留上下限');
                }

            });

        },


        end:0

    };

    Page.init();


});
