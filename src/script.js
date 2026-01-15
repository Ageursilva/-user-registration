$(document).ready(function () {

    var $dataInput = $('#data_nascimento');
    if ($dataInput.length) {
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
    }
    function obterUsuarios() {
        var dados = localStorage.getItem('usuarios');
        return dados ? JSON.parse(dados) : {};
    }
    function salvarUsuarios(usuarios) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios))
    }
    var $formCadastro = $('#form-cadastro');
    if ($formCadastro.length) {
        $formCadastro.on('submit', function (e) {
            e.preventDefault();
            var nome = $('#nome').val().trim();
            var email = $('#email').val().trim();
            var dataNasc = $('#data_nascimento').val().trim();

            if (!nome || !email || !dataNasc) {
                M.toast({ html: 'Preencha todos os campos.' });
                return;
            }
            var usuarios = obterUsuarios();
            usuarios.push({
                nome: nome,
                email: email,
                data_nascimento: dataNasc
            });
            salvarUsuarios(usuarios);
            this.reset();
            $('input').removeClass('valid invalid');

            M.toast({ html: 'Usuario cadastrado com sucesso!' });
        });
    }
    function calularIdade(dataNascISO) {
        var hoje = new Date();
        var nasc = new Date(dataNascISO);
        var idade = hoje.getFullYear() - nasc.getFullYear();
        var mes = hoje.getMonth() - nasc.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
            idade--;
        }
    }
    return idade;
})

function adicionarUsuarioNaTabela(usuario) {
    var idade = calcularIdade(usuario.data_nascimento);
    var linha = `
      <tr>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${idade}</td>
      </tr>
    `;
    $('#tabela-corpo').append(linha);
};


