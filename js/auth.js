async function checkUserOrRedirect() {
  const { data, error } = await supabase.auth.getUser();
  if (!data.user) window.location.href = 'login.html';
  return data.user;
}

async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert('Erro ao logar: ' + error.message);
  else window.location.href = 'index.html';
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}
