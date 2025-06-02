const supabaseUrl = 'https://pgqrjtglzibalkjlkrxt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncXJqdGdsemliYWxramxrcnh0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzY5NDY2MSwiZXhwIjoyMDYzMjcwNjYxfQ.tlYQRgXgxpQ8YrpaP-1_9vOB547K_ZH23HkEr2g92oI'; // Proteja isso em produção
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
