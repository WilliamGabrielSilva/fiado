async function cadastrarCliente(nome, telefone) {
  if (!nome.trim()) return alert('Nome obrigatório');
  const { error } = await supabase.from('clientes').insert([{ nome, telefone }]);
  if (error) return alert('Erro ao cadastrar');
  carregarClientes();
}

async function carregarClientes() {
  const { data: clientes } = await supabase.from('clientes').select();
  console.log(clientes); // Substitua com sua lógica de renderização
}
