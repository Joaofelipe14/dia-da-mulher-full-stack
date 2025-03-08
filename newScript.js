// Definindo o nome da pessoa para filtrar
let nomePessoa = "joao"; // Pode alterar para o nome desejado para filtrar

// URL da API do Supabase
const SUPABASE_URL = 'https://fotsoyazuukzdoxyulxd.supabase.co/rest/v1/presents';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvdHNveWF6dXVremRveHl1bHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTM5ODAsImV4cCI6MjA1NzAyOTk4MH0.cc1AsIPj3FROMwJZenNUB1-rOMo-LJo2C6dpwAGz0Eo';

// Função para buscar os dados pelo nomePessoa
async function fetchDataByName(nomePessoa) {
    try {
        // Requisição GET para buscar os dados com base no nomePessoa
        const response = await fetch(`${SUPABASE_URL}?nomePessoa=eq.${nomePessoa}`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
            }
        });

        // Verificando se a requisição foi bem-sucedida
        if (response.ok) {
            const data = await response.json();

            console.log(data);

            // Se encontrar dados, preenche as variáveis com os valores
            if (data.length > 0) {
                const item = data[0];  // Pegando o primeiro item retornado (se houver)

                let tituloInicial = item.tituloInicial;
                let urlFoto = item.urlFoto;
                let mensagemTitulo = item.mensagemTitulo;
                let mensagemTexto = item.mensagemTexto;
                let textoFooter = item.textoFooter;
                let musicaUrl = item.urlMusica;  // Se necessário, para o iframe

                // Preencher os campos HTML com os dados obtidos
                document.getElementById('nameVariable').textContent = tituloInicial;
                document.getElementById('special-photo').src = urlFoto;
                document.getElementById('messageTitle').textContent = mensagemTitulo;
                document.getElementById('messageText').textContent = mensagemTexto;
                document.getElementById('footerText').textContent = textoFooter;

                // Criar e adicionar o iframe para a música, se houver URL
                if (musicaUrl) {
                    let iframe = document.createElement("iframe");
                    iframe.src = musicaUrl;
                    iframe.width = "0";
                    iframe.height = "0";
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                    iframe.referrerPolicy = "strict-origin-when-cross-origin";
                    iframe.allowFullscreen = true;
                    document.body.appendChild(iframe);
                }

                // Iniciar a animação de digitação após carregar os dados
                startTypingAnimation();
            } else {
                console.error('Nenhum dado encontrado para o nome fornecido.');
            }
        } else {
            console.error('Erro ao buscar dados do Supabase:', response.status);
        }
    } catch (error) {
        console.error('Erro ao fazer requisição GET:', error);
    }
}

// Função de animação de digitação
function typeWriter(text, i, fnCallback) {
    const message = document.querySelector('.message p');
    if (i < text.length) {
        message.textContent = text.substring(0, i + 1);
        setTimeout(function () {
            typeWriter(text, i + 1, fnCallback)
        }, 50);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

// Função para iniciar a animação de digitação
function startTypingAnimation() {
    const message = document.querySelector('.message p');
    const originalText = message.textContent;
    message.textContent = '';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter(originalText, 0, () => {
                        document.querySelector('.signature').style.opacity = '1';
                    });
                }, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(message);
}

// Função para obter o nome da pessoa da URL
function getNomeDaURL() {
    // Obter a URL atual
    const params = new URLSearchParams(window.location.search);
    
    // Retorna o valor do parâmetro "nome" da URL
    return params.get('nome')

}

// Chamar a função fetchDataByName com o nome extraído da URL
const nomePessoaUrl = getNomeDaURL();


fetchDataByName(nomePessoaUrl);
