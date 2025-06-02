import {supabase} from './supabaseClient.js'
       
        
async function realizarLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    if (!email || !password) {
        mostrarErro('loginError', 'Email e senha são obrigatórios');
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            mostrarErro('loginError', 'Erro ao fazer login: ' + error.message);
            return;
        }

        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        errorDiv.style.display = 'none';
        
        mostrarTelaPrincipal();
        await carregarClientes();
    } catch (error) {
        console.error('Erro no login:', error);
        mostrarErro('loginError', 'Erro inesperado ao fazer login');
    }
}