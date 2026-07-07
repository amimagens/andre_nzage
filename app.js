
const CHAVE_ALUNO = "web2026"; const CHAVE_PROF = "ungimu2026";
let DADOS = {aulas:[],exercicios:[],quiz:[],faq:[],progresso:{}};
let aulaAtual = 0; let slideAtual = 0;

document.addEventListener('DOMContentLoaded',iniciar);

async function iniciar(){
    await carregarDados();
    setTimeout(()=>document.getElementById('loader').style.display='none',800);
    document.getElementById('loginForm').onsubmit = fazerLogin;
    document.getElementById('menuToggle').onclick = ()=>document.getElementById('sidebar').classList.toggle('ativo');
}

async function carregarDados(){
    DADOS.aulas = [
        {id:1,titulo:"Teu Primeiro Site no Ar",slide:"S1A1.jpg",audio:"S1A1.mp3",texto:"HTML são os ossos. Tag h1 é título principal. Toda página começa com!+TAB no VS Code.",codigo:"<!DOCTYPE html>\n<html>\n<head>\n <title>Meu Site</title>\n</head>\n<body>\n <h1>Olá Ungimu</h1>\n <p>Meu primeiro site</p>\n</body>\n</html>"},
        {id:2,titulo:"Textos, Links e Imagens",slide:"S1A2.jpg",audio:"S1A2.mp3",texto:"Tag 'a' cria link. href é endereço. Tag 'img' mostra foto. alt é descrição.",codigo:"<a href='https://wa.me/244999999999'>Fala Comigo</a>\n<img src='foto.jpg' alt='Minha foto'>"},
        {id:3,titulo:"Listas e Organização",slide:"S1A3.jpg",audio:"S1A3.mp3",texto:"ul é lista com bolinha. ol é numerada. header, main, footer organizam site.",codigo:"<ul>\n <li>HTML</li>\n <li>CSS</li>\n <li>JS</li>\n</ul>"},
        {id:4,titulo:"Tabelas e Formulários",slide:"S1A4.jpg",audio:"S1A4.mp3",texto:"table cria tabela. input pega dados do usuário. form envia.",codigo:"<table>\n <tr><td>Nome</td><td>Idade</td></tr>\n <tr><td>Ana</td><td>20</td></tr>\n</table>"},
        {id:5,titulo:"Projeto: Cartão Visita Digital",slide:"S1A5.jpg",audio:"S1A5.mp3",texto:"Junta tudo: h1 com teu nome, img tua foto, p tua bio, a link WhatsApp.",codigo:"<h1>João Silva</h1>\n<img src='eu.jpg' alt='João'>\n<p>Dev Web Luanda</p>\n<a href='https://wa.me/244'>WhatsApp</a>"}
    ];
    DADOS.exercicios = [
        {id:1,aula:1,nivel:"facil",titulo:"Troca o Título",desc:"Muda 'Olá Ungimu' para teu nome",resposta:"<h1>Teu Nome Aqui</h1>",dica:"Só trocar texto dentro da tag h1"},
        {id:2,aula:2,nivel:"facil",titulo:"Botão WhatsApp",desc:"Cria link pro teu WhatsApp",resposta:"<a href='https://wa.me/244XXXXXXXXX'>Meu WhatsApp</a>",dica:"Troca X pelo teu número com 244"},
        {id:3,aula:3,nivel:"medio",titulo:"Lista de Skills",desc:"Cria lista com 3 tecnologias que vais aprender",resposta:"<ul>\n <li>HTML</li>\n <li>CSS</li>\n <li>JavaScript</li>\n</ul>",dica:"ul por fora, li pra cada item"},
        {id:4,aula:5,nivel:"desafio",titulo:"Cartão Completo",desc:"h1 nome + img foto + p bio + a whatsapp",resposta:"<h1>Maria</h1>\n<img src='maria.jpg'>\n<p>Designer</p>\n<a href='https://wa.me/244'>Falar</a>",dica:"Junta códigos das aulas 1 e 2"}
    ];
    DADOS.quiz = [
        {p:"Qual tag cria título grande?",a:["<p>","<h1>","<img>","<a>"],c:1},
        {p:"Para que serve href no link?",a:["Cor","Endereço","Tamanho","Nome"],c:1},
        {p:"ul cria lista...",a:["Numerada","Com bolinha","De imagens","De links"],c:1}
    ];
    DADOS.faq = [
        {p:"img não aparece",r:"1. Foto tem que tá na mesma pasta do index.html 2. Nome igualzinho: FOTO.jpg ≠ foto.jpg 3. Testa caminho:./foto.jpg"},
        {p:"site todo branco",r:"Salvaste Ctrl+S? Atualiza F5. Ainda branco? Vê console F12 pra erro."},
        {p:"como centraliza texto",r:"CSS: text-align:center; na tag ou numa class"},
        {p:"link whatsapp não abre",r:"Formato certo: https://wa.me/244999999999 Sem espaço, sem + e sem -"},
        {p:"cor não muda no h1",r:"CSS ligado? <link rel='stylesheet' href='estilo.css'> no head. Testa: h1{color:red}"}
    ];
    DADOS.progresso = JSON.parse(localStorage.getItem('ungimu_progresso')) || {aulasConcluidas:[],exFeitos:[],pontos:0,sites:[]};
}

function fazerLogin(e){
    e.preventDefault();
    let senha = document.getElementById('senha').value;
    if(senha===CHAVE_ALUNO){
        document.getElementById('loginModal').classList.remove('active');
        document.getElementById('app').style.display='block';
        atualizarHome();
    } else alert('Chave incorreta! Pede pro prof.');
}

function irPara(tela){
    document.querySelectorAll('.tela').forEach(t=>t.classList.remove('active'));
    document.getElementById(tela).classList.add('active');
    document.getElementById('sidebar').classList.remove('ativo');
    if(tela==='aulas') carregarAulas();
    if(tela==='exercicios') carregarExercicios();
    if(tela==='quiz') carregarQuiz();
    if(tela==='faq') carregarFAQ();
    if(tela==='meusites') carregarMeusSites();
    if(tela==='certificado') carregarCertificado();
}

function atualizarHome(){
    let concluidas = DADOS.progresso.aulasConcluidas.length;
    let total = DADOS.aulas.length;
    let perc = Math.round(concluidas/total*100);
    document.getElementById('progressTexto').textContent = `Semana 1 • Aula ${concluidas+1} de ${total} • ${perc}%`;
    document.getElementById('progressBar').style.width = perc+'%';
    document.getElementById('exFeitosCount').textContent = DADOS.progresso.exFeitos.length;
    document.getElementById('pontuacaoTotal').textContent = DADOS.progresso.pontos;
    document.getElementById('aulasConcCount').textContent = concluidas;
}

function carregarAulas(){
    let html = ''; DADOS.aulas.forEach((a,i)=>{
        let feito = DADOS.progresso.aulasConcluidas.includes(a.id);
        html += `<div class="aula-card"><h3>Aula ${a.id}: ${a.titulo} ${feito?'✅':''}</h3>
        <button class="btn btn-primary" onclick="abrirAula(${i})">${feito?'Rever':'Começar'}</button></div>`;
    });
    document.getElementById('aulasContainer').innerHTML = html;
}

function abrirAula(i){
    aulaAtual = i; slideAtual = 0;
    let a = DADOS.aulas[i];
    document.getElementById('slideImg').src = `./arquivos/slides/${a.slide}`;
    document.getElementById('aulaTitulo').textContent = a.titulo;
    document.getElementById('audioAula').src = `./arquivos/audios/${a.audio}`;
    document.getElementById('aulaTexto').innerHTML = `<p>${a.texto}</p>`;
    document.getElementById('codigoExemplo').textContent = a.codigo;
    document.getElementById('aulaCodigoBloco').style.display = 'block';
    document.getElementById('slideCounter').textContent = `1 / 1`;
    document.getElementById('aulaBigModal').classList.add('active');
    if(!DADOS.progresso.aulasConcluidas.includes(a.id)){
        DADOS.progresso.aulasConcluidas.push(a.id);
        salvarProgresso();
    }
}

function fechaModaAula(){document.getElementById('aulaBigModal').classList.remove('active'); atualizarHome()}
function copiarCodigo(){navigator.clipboard.writeText(document.getElementById('codigoExemplo').textContent); alert('Código copiado!')}
function testarNoEditor(){fechaModaAula(); irPara('editor'); setTimeout(()=>{document.getElementById('htmlCode').value = DADOS.aulas[aulaAtual].codigo},200)}

function carregarExercicios(filtro='todos'){
    let exs = filtro==='todos'? DADOS.exercicios : DADOS.exercicios.filter(e=>e.nivel===filtro);
    let html = ''; exs.forEach(ex=>{
        let feito = DADOS.progresso.exFeitos.includes(ex.id);
        html += `<div class="ex-card"><span class="badge ${ex.nivel}">${ex.nivel.toUpperCase()}</span>
        <h3>${ex.titulo} ${feito?'✅':''}</h3><p>${ex.desc}</p>
        <button class="btn btn-primary" onclick="abrirExercicio(${ex.id})">Ver Resposta</button></div>`;
    });
    document.getElementById('exerciciosContainer').innerHTML = html;
}
function filtrarExercicios(nivel){
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    event.target.classList.add('active');
    carregarExercicios(nivel);
}
function abrirExercicio(id){
    let ex = DADOS.exercicios.find(e=>e.id===id);
    document.getElementById('exTitulo').textContent = ex.titulo;
    document.getElementById('exNivel').textContent = ex.nivel.toUpperCase();
    document.getElementById('exNivel').className = `badge ${ex.nivel}`;
    document.getElementById('exDescricao').textContent = ex.desc;
    document.getElementById('exResposta').textContent = ex.resposta;
    document.getElementById('exDicaTexto').textContent = ex.dica;
    document.getElementById('exercicioModal').classList.add('active');
    if(!DADOS.progresso.exFeitos.includes(id)){DADOS.progresso.exFeitos.push(id); salvarProgresso(); atualizarHome()}
}
function fechaModalExercicio(){document.getElementById('exercicioModal').classList.remove('active')}
function mostrarDicaEx(){document.getElementById('exDica').style.display='block'}
function copiarRespostaEx(){navigator.clipboard.writeText(document.getElementById('exResposta').textContent); alert('Copiado!')}
function testarNoEditorEx(){fechaModalExercicio(); irPara('editor')}

function carregarQuiz(){
    let html = ''; DADOS.quiz.forEach((q,i)=>{
        html += `<div class="pergunta"><h4>${i+1}. ${q.p}</h4>`;
        q.a.forEach((alt,ai)=>{
            html += `<div class="alternativa" onclick="responderQuiz(${i},${ai})">${alt}</div>`;
        });
        html += '</div>';
    });
    document.getElementById('quizContainer').innerHTML = html;
}
function responderQuiz(qi,ai){
    let q = DADOS.quiz[qi];
    let alts = event.target.parentElement.querySelectorAll('.alternativa');
    alts.forEach(a=>a.onclick=null);
    if(ai===q.c){event.target.classList.add('correta'); DADOS.progresso.pontos+=10}
    else {event.target.classList.add('errada'); alts[q.c].classList.add('correta')}
    salvarProgresso(); atualizarHome();
}
function resetarQuiz(){DADOS.progresso.pontos=0; salvarProgresso(); carregarQuiz(); atualizarHome()}

function carregarFAQ(){
    let html = ''; DADOS.faq.forEach(f=>{
        html += `<div class="faq-item"><div class="faq-pergunta" onclick="this.parentElement.classList.toggle('ativo')">
        P: ${f.p} <span>▼</span></div><div class="faq-resposta">R: ${f.r}</div></div>`;
    });
    document.getElementById('faqContainer').innerHTML = html;
}
function buscarFaq(){
    let termo = document.getElementById('buscaFaq').value.toLowerCase();
    document.querySelectorAll('.faq-item').forEach(item=>{
        let txt = item.textContent.toLowerCase();
        item.style.display = txt.includes(termo)? 'block' : 'none';
    });
}

function rodarCodigo(){
    let html = document.getElementById('htmlCode').value;
    let css = document.getElementById('cssCode').value;
    let js = document.getElementById('jsCode').value;
    let codigo = html.replace('</head>',`<style>${css}</style></head>`).replace('</body>',`<script>${js}</script></body>`);
    document.getElementById('preview').srcdoc = codigo;
}
function limparCodigo(){if(confirm('Limpar tudo?')){document.getElementById('htmlCode').value='';document.getElementById('cssCode').value='';document.getElementById('jsCode').value='';document.getElementById('preview').srcdoc=''}}
function limparConsole(){document.getElementById('console').innerHTML=''}
function salvarProjeto(){
    let nome = prompt('Nome do projeto:'); if(!nome) return;
    let projeto = {nome:nome,html:document.getElementById('htmlCode').value,css:document.getElementById('cssCode').value,js:document.getElementById('jsCode').value,data:new Date().toLocaleDateString()};
    DADOS.progresso.sites.push(projeto); salvarProgresso(); alert('Projeto salvo!'); irPara('meusites');
}
function exportarZip(){alert('Função ZIP: Copia código e cola no VS Code > Salva como index.html'); salvarProjeto()}

function novoSite(){
    let tema = prompt('Qual tema do teu site? Ex: Salão da Tia Maria, CV do João, Blog Pessoal');
    if(!tema) return;
    irPara('editor');
    setTimeout(()=>{
        document.getElementById('htmlCode').value = `<!DOCTYPE html>\n<html>\n<head>\n <title>${tema}</title>\n <style>body{font-family:Arial;text-align:center;padding:20px}</style>\n</head>\n<body>\n <h1>${tema}</h1>\n <p>Site criado no Ungimu Web Lab</p>\n <a href='https://wa.me/244'>Fala Comigo</a>\n</body>\n</html>`;
        rodarCodigo();
    },200);
}
function carregarMeusSites(){
    let html = ''; if(DADOS.progresso.sites.length===0) html = '<p>Ainda não tens sites. Cria no Editor!</p>';
    DADOS.progresso.sites.forEach((s,i)=>{
        html += `<div class="site-card"><h3>${s.nome}</h3><p>Criado: ${s.data}</p>
        <button class="btn btn-primary" onclick="abrirSite(${i})">Abrir</button></div>`;
    });
    document.getElementById('meusSitesContainer').innerHTML = html;
}
function abrirSite(i){
    let s = DADOS.progresso.sites[i]; irPara('editor');
    setTimeout(()=>{document.getElementById('htmlCode').value=s.html;document.getElementById('cssCode').value=s.css;document.getElementById('jsCode').value=s.js;rodarCodigo()},200);
}

function carregarCertificado(){
    let concluidas = DADOS.progresso.aulasConcluidas.length;
    let total = DADOS.aulas.length;
    let html = '';
    if(concluidas>=total){
        html = `<div class="certificado-card" style="background:var(--branco);padding:40px;border-radius:16px;text-align:center;border:4px solid var(--laranja)">
        <h2>🏆 CERTIFICADO DE CONCLUSÃO</h2><p style="margin:20px 0">Certificamos que</p>
        <h1 style="color:var(--laranja);margin:20px 0">[TEU NOME AQUI]</h1>
        <p>concluiu com sucesso a</p><h3>OFICINA DE CRIAÇÃO DE SITES</h3>
        <p style="margin:20px 0">UNGIMU WEB LAB - 2026</p>
        <p>Prof. André & Prof. Luisandro</p>
        <button class="btn btn-primary" onclick="alert('Print da tela pra guardar!')">📸 Salvar Certificado</button></div>`;
    } else {
        html = `<div class="aviso-card"><h3>🔒 Certificado Bloqueado</h3>
        <p>Completa ${total} aulas para liberar. Faltam: ${total-concluidas} aulas</p>
        <button class="btn btn-primary" onclick="irPara('aulas')">Ir para Aulas</button></div>`;
    }
    document.getElementById('certificadoContainer').innerHTML = html;
}

function abreModalEasterEgg(){document.getElementById('modalProf').classList.add('active')}
function fechaModalProf(){document.getElementById('modalProf').classList.remove('active')}
function entrarModoProf(){
    if(document.getElementById('senhaProf').value===CHAVE_PROF){
        document.getElementById('modalProf').classList.remove('active');
        document.getElementById('app').style.display='none';
        document.getElementById('modoProfContainer').style.display='block';
    } else alert('Senha errada!');
}
function sairModoProf(){document.getElementById('modoProfContainer').style.display='none';document.getElementById('app').style.display='block'}
function abrirProfTV(){alert('Modo TV: Abre qualquer aula e clica PROJETAR NA TV na tela da aula')}
function abrirProfChamada(){alert('Chamada: Anota no caderno. v2 terá lista')}
function abrirProfDuvida(){let p=prompt('Pergunta do aluno:'); let r=prompt('Tua resposta:'); if(p&&r){DADOS.faq.push({p:p,r:r}); salvarProgresso(); alert('FAQ adicionado! Alunos já veem.')}}
function abrirProfEstat(){alert(`Estatísticas:\nAulas: ${DADOS.progresso.aulasConcluidas.length}/${DADOS.aulas.length}\nExercícios: ${DADOS.progresso.exFeitos.length}\nPontos Quiz: ${DADOS.progresso.pontos}`)}
function abrirProfAviso(){let msg=prompt('Aviso para turma:'); if(msg) alert('Aviso salvo! v2 mostrará na Home')}

function fazerLogout(){if(confirm('Sair do app?')){document.getElementById('app').style.display='none';document.getElementById('loginModal').classList.add('active');document.getElementById('senha').value=''}}

function salvarProgresso(){localStorage.setItem('ungimu_progresso',JSON.stringify(DADOS.progresso))}

if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'))}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('App instalada!');
            }
            deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none';
        });
    }
});