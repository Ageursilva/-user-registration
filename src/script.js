$(document).ready(function () {
    var $dataInput = $('#data_nascimento');
    if ($dataInput.length === 0) return;


    var hoje = new Date();
    var hojeISO = hoje.toISOString().split('T')[0];
    $dataInput.attr('max', hojeISO);

    var $helper = $dataInput.closest('.input-field').find('.helper-text');

    $dataInput.on('change', function () {
        var value = $(this).val();

        if (!value) {
            $(this).removeClass('invalid valid');
            if ($helper.length) $helper.text('');
            return;
        }

        var selected = new Date(value);
        var hojeDate = new Date();
        hojeDate.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);

        if (selected > hojeDate) {
            $(this).addClass('invalid').removeClass('valid');
            if ($helper.length) $helper.text('Data de nascimento não pode ser futura');
        } else {
            $(this).removeClass('invalid').addClass('valid');
            if ($helper.length) $helper.text('');
        }
    });
});