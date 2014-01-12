jQuery(function($){

    var pwdForm =  $('#pwd-form');
    var oldPWD = $('#old-pwd');
    var newPWD = $('#new-pwd');
    var newPWD2 = $('#new-pwd-2');

    function init(){
        pwdForm.find('input').on('keyup',function(){
            $(this).closest('.field').find('.l').html('').removeClass('error');
        });
    }
    init();

    function validOldPWD(){
        if($.trim(oldPWD.val())==''){
            oldPWD.closest('.field').find('.l').html('旧密码不能为空!').addClass('error');
            return false;
        }else if($.trim(oldPWD.val()).length<6){
            oldPWD.closest('.field').find('.l').html('请输入不少于6个字符!').addClass('error');
            return false;
        }

        return true;
    }

    function validNewPWD(){
        if($.trim(newPWD.val())==''){
            newPWD.closest('.field').find('.l').html('新密码不能为空!').addClass('error');
            return false;
        }else if($.trim(newPWD.val()).length<6){
            newPWD.closest('.field').find('.l').html('请输入不少于6个字符!').addClass('error');
            return false;
        }
        if($.trim(newPWD2.val())==''){
            newPWD2.closest('.field').find('.l').html('确认新密码不能为空!').addClass('error');
            return false;
        }else if($.trim(newPWD2.val()).length<6){
            newPWD2.closest('.field').find('.l').html('请输入不少于6个字符!').addClass('error');
            return false;
        }
        if($.trim(newPWD2.val())!=$.trim(newPWD.val())){
            newPWD.closest('.field').find('.l').html('新密码和确认新密码输入不一致!').addClass('error');
            return false;
        }
        return true;
    }


    pwdForm.on('submit',function(){
        return validOldPWD()&&validNewPWD();
    });
});
