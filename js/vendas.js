async function registrarVenda(clienteId, descricao, valorTotal, numParcelas, dataInicial) {
  const { data: venda, error } = await supabase.from('vendas').insert([{ cliente_id: clienteId, descricao, valor_total: valorTotal, num_parcelas: numParcelas, data_primeira: dataInicial }]).select();
  if (error) return alert('Erro ao registrar venda');

  const parcelas = [];
  const valorParcela = parseFloat((valorTotal / numParcelas).toFixed(2));

  for (let i = 0; i < numParcelas; i++) {
    const vencimento = new Date(dataInicial);
    vencimento.setMonth(vencimento.getMonth() + i);
    parcelas.push({
      venda_id: venda[0].id,
      cliente_id: clienteId,
      parcela: i + 1,
      valor: valorParcela,
      vencimento: vencimento.toISOString().slice(0, 10),
      status: 'Pendente'
    });
  }

  await supabase.from('parcelas').insert(parcelas);
  alert('Venda registrada!');
  carregarClientes();
}
