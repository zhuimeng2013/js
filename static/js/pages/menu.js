jQuery(function($){

    var menu = $('.mod-menu','#content');
    var nodes = $('dd.menu-nodes','#content');

    nodes.on('click',function(e){
        var self = $(this);
        if(self.hasClass('current')) return;

        menu.find('.menu-nodes.current').removeClass('current');

        self.addClass('current');
    });
    nodes.on('click','a',function(e){
        var parent = $(this)[0].parentNode;
        if(parent.tagName.toLowerCase()!=='li') e.preventDefault();
    });

});
