import { supabase } from './supabaseClient.js'

async function cadastrarCliente() {
    const nome = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telCliente').value;
    const { data, error } = await supabase.from('clientes').insert([{ nome, telefone }]);
    if (error) return alert('Erro ao cadastrar');
    alert('Cliente cadastrado!');
    carregarClientes();
}

async function carregarClientes() {
    const { data } = await supabase.from('clientes').select();
    const select = document.getElementById('selectCliente');
    const div = document.getElementById('divClientes');
    select.innerHTML = ''; div.innerHTML = '';
    data.forEach(c => {
      select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
    });
    for (let cliente of data) {
      const { data: parcelas } = await supabase.from('parcelas')
        .select('valor, status')
        .eq('cliente_id', cliente.id)
        .eq('status', 'Pendente');
      const total = parcelas.reduce((sum, p) => sum + p.valor, 0);
      div.innerHTML += `<div class='cliente-card'><strong>${cliente.nome}</strong><br>Dívida: R$ ${total.toFixed(2)}</div>`;
    }
}

async function registrarVenda() {
    const clienteId = document.getElementById('selectCliente').value;
    const descricao = document.getElementById('descricao').value;
    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    const numParcelas = parseInt(document.getElementById('numParcelas').value);
    const dataInicial = new Date(document.getElementById('dataInicial').value);

    const { data: venda } = await supabase.from('vendas').insert([{
      cliente_id: clienteId,
      descricao,
      valor_total: valorTotal,
      num_parcelas: numParcelas,
      data_primeira: dataInicial
    }]).select();

    const parcelas = [];
    const valorParcela = parseFloat((valorTotal / numParcelas).toFixed(2));
    for (let i = 0; i < numParcelas; i++) {
      const vencimento = new Date(dataInicial);
      vencimento.setMonth(vencimento.getMonth() + i);
      parcelas.push({
        venda_id: venda[0].id,
        cliente_id: clienteId,
        numero_parcelas: i + 1,
        valor: valorParcela,
        vencimento: vencimento.toISOString().slice(0, 10),
        status: 'Pendente'
      });
    }
    await supabase.from('parcelas').insert(parcelas);
    alert('Venda registrada com sucesso!');
    carregarClientes();
}

  carregarClientes();