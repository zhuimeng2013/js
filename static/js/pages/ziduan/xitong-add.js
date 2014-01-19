jQuery(function($){
    var ziduanTable = $('#ziduan-table');
    var ziduanDesc = $('#ziduan-desc');

    var ziduanItems =  ziduanDesc.find('.ziduan-items');
    var showContainer = $('#mod-selected-items').find('dl');

    var Page = {
        init:function(){
            this.initTable();
            this.initCheckBox();
        },
        initTable:function(){
            ziduanTable.find('dd').on('click',function(){
                var _this = $(this);
                var idx;
                var lastSelectedNode;

                if(_this.hasClass('selected')) return;
                lastSelectedNode = ziduanTable.find('dd.selected');
                lastSelectedNode.removeClass('selected');
                idx = _this.data('idx');
                _this.addClass('selected');
                ziduanDesc.find('.selected').removeClass('selected');
                ziduanItems.eq(idx).addClass('selected');

            });
            ziduanTable.find('a').on('click',function(e){
                e.preventDefault();
            });
        },
        initCheckBox:function(){
            var self = this;
            ziduanDesc.find('input[type=checkbox]').on('click',function(){
               var _this = $(this);
               var parentNode = _this.closest('dl');
               self.hanle(parentNode);

            });
        },
        hanle:function(parentNode){
            var idx = parentNode.data('idx');
            var items = parentNode.find('input:checked');
            var cache = [],tmp;
            var myContainer =  showContainer.eq(idx);

            cache.push('<dt>'+myContainer.find('dt').html()+'</dt>');

            $.each(items,function(idx,v){
                tmp = $(v).siblings('.l').html();
                cache.push('<dd>'+tmp+'</dd>');
            });

            myContainer.html(cache.join(''));

        },

        end:0

    };

    Page.init();


});
