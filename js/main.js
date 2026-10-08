document.addEventListener('DOMContentLoaded', () => {
  // Mobile Drawer Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
    });
  }

  // Remove preventDefault that was blocking all forms
  // Web3Forms will handle submissions natively when you add the keys


  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});


// Configuração Global do Web3Forms (AJAX) - Sem Redirecionamento
document.addEventListener('DOMContentLoaded', function() {
    const web3forms = document.querySelectorAll('form[action="https://api.web3forms.com/submit"]');
    
    web3forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Estado de carregamento
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="h-5 w-5 animate-spin mx-auto"></i>';
            submitBtn.disabled = true;
            if(window.lucide) window.lucide.createIcons();

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    // Substitui o formulário pela mensagem de sucesso na mesma tela
                    form.innerHTML = `
                      <div class="text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center h-full min-h-[300px] animate-in fade-in zoom-in duration-500">
                        <div class="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 shadow-sm border border-emerald-200">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        </div>
                        <h4 class="text-2xl font-black text-slate-900 mb-3">Tudo Certo!</h4>
                        <p class="text-slate-600 font-medium leading-relaxed">
                          Muito obrigado pelo seu contato!<br>Em breve nossa equipe enviará a sua cotação detalhada diretamente no seu WhatsApp.
                        </p>
                      </div>
                    `;
                } else {
                    alert('Erro ao enviar: ' + jsonResponse.message);
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }
            })
            .catch(error => {
                alert('Erro na conexão. Verifique sua internet e tente novamente.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    });
});
