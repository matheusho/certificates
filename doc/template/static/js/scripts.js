var $ = jQuery.noConflict();

var BASE_URL = '/certificados/';

$(document).ready(function() {
    // Set current
    var url = BASE_URL + 'render/';
    var location = window.location.pathname.split('#');
    var param = location[1];
    var view = 'home';

    if (location.length != 1 || param != 'home') {
        view = param;
    }
    $.ajax({
        url: url,
        type: 'GET'
        dataType: 'html',
        success: function(data) {
            console.log(data);
        }
    })
    console.log(location.length);

    // -->
    // Send token for certified
    $("input#id_token").focus(function() {
        $("div#errors").hide(0).html("");
    });

    // Form Certified
    $("form#id_form_certified").submit(function() {
        var $this = $(this);
        var token = $("input#id_token");
        var error_message = '<br><p class="alert alert-danger">Informe um token válido.</p>';
        var success_message = '<p class="alert alert-success">Seu certificado foi emitido com sucesso e enviado para o seu e-mail cadastrado. Obrigado.</p>';

        if(token.val() == "") {
            $("div#errors").html(error_message);
            return false;
        }

        $.ajax({
            url: $this.attr("action"),
            type: 'GET',
            data: token,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if(data) {
                    $("div#errors").html("");
                    $("div#result").html(success_message);
                }
            }
        });

        return false;
    });
});
