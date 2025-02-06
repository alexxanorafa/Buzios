// ========== CÓDIGO DO MENU ==========
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    // Abrir/Fechar menu
    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    // Animar itens do menu
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });
});

const odus = {
    ketu: {
        combinations: [
            { open: 0, name: "Ogbè", symbol: "⛧", 
              message: "Tudo novo começa agora", 
              advice: "Inicie projetos importantes", 
              ebo: "Ofereça frutas frescas" },
            { open: 1, name: "Oyèkú", symbol: "☥", 
              message: "Cuidado com perdas materiais", 
              advice: "Evite gastos desnecessários", 
              ebo: "Velas brancas e água mineral" },
            { open: 2, name: "Ìwòrì", symbol: "𓃒", 
              message: "Mudanças positivas estão chegando", 
              advice: "Mantenha-se receptivo", 
              ebo: "Milho verde e mel" },
            { open: 3, name: "Òdí", symbol: "⚚", 
              message: "Força para superar desafios", 
              advice: "Confie em seu poder interior", 
              ebo: "Folhas verdes e frutas cítricas" },
            { open: 4, name: "Òsé", symbol: "𓋇", 
              message: "Tempo de ação e movimento", 
              advice: "Não procrastine", 
              ebo: "Feijão preto e arroz" }
        ]
    },
    jeje: {
        combinations: [
            { open: 0, name: "Fá", symbol: "⚕", 
              message: "Momento de equilíbrio espiritual", 
              advice: "Busque conexão com os ancestrais", 
              ebo: "Ervas amargas e água de rio" },
            { open: 1, name: "Hùnsi", symbol: "⚶", 
              message: "Atenção aos sinais do destino", 
              advice: "Interprete os sonhos e visões", 
              ebo: "Mel e azeite de dendê" },
            { open: 2, name: "Dàn", symbol: "𓆑", 
              message: "Proteção e sorte estão ao seu lado", 
              advice: "Agradeça pelas bênçãos", 
              ebo: "Pó de ouro e folhas de louro" },
            { open: 3, name: "Azaka", symbol: "⚖", 
              message: "Trabalho árduo trará recompensas", 
              advice: "Persista em seus esforços", 
              ebo: "Milho torrado e inhame assado" },
            { open: 4, name: "Sakpata", symbol: "☤", 
              message: "Cuidado com a saúde", 
              advice: "Fortaleça seu corpo e espírito", 
              ebo: "Banhos de ervas e velas vermelhas" }
        ]
    },
    nago: {
        combinations: [
            { open: 0, name: "Ifá", symbol: "✡", 
              message: "A sabedoria guiará seu caminho", 
              advice: "Confie no conhecimento ancestral", 
              ebo: "Folhas de algodão e obi" },
            { open: 1, name: "Xangô", symbol: "⚡", 
              message: "Justiça será feita", 
              advice: "Mantenha a retidão em suas ações", 
              ebo: "Carne de carneiro e mel" },
            { open: 2, name: "Oxum", symbol: "💧", 
              message: "O amor e a prosperidade se aproximam", 
              advice: "Valorize a beleza e a harmonia", 
              ebo: "Mel, flores amarelas e água doce" },
            { open: 3, name: "Ogum", symbol: "⚒", 
              message: "Lute pelo que deseja", 
              advice: "Não tema desafios", 
              ebo: "Aço e feijão fradinho" },
            { open: 4, name: "Iemanjá", symbol: "🌊", 
              message: "Renovação e proteção da mãe das águas", 
              advice: "Liberte-se do que não te serve mais", 
              ebo: "Conchas do mar e arroz branco" }
        ]
    }
};

let currentHouse = 'ketu';
let selectedOfferings = [];
let energyLevel = 100;

document.querySelectorAll('.house-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.house-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentHouse = btn.dataset.house;
    });
});

document.querySelectorAll('.offering-item').forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('selected');
        const offering = item.dataset.item;
        if(selectedOfferings.includes(offering)) {
            selectedOfferings = selectedOfferings.filter(o => o !== offering);
        } else {
            selectedOfferings.push(offering);
        }
        updateEnergy();
    });
});

function updateEnergy() {
    energyLevel = 100 - (selectedOfferings.length * 15);
    document.querySelector('.energy-bar').style.width = energyLevel + '%';
    document.querySelector('.energy-text').textContent = `Axé: ${energyLevel}%`;
}

function prepareCasting() {
    if(!document.getElementById('user-question').value.trim()) {
        alert("Faça sua pergunta primeiro!");
        return;
    }
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('casting-screen').classList.remove('hidden');
    startCastingAnimation();
}

function startCastingAnimation() {
    const shells = document.querySelectorAll('.cowrie-shell');
    let delay = 0;
    
    shells.forEach(shell => {
        setTimeout(() => {
            shell.style.transform = `rotateX(${Math.random()*360}deg) rotateY(${Math.random()*360}deg)`;
            shell.dataset.open = Math.random() > 0.5 ? '1' : '0';
        }, delay);
        delay += 500;
    });

    setTimeout(calculateResult, 3000);
}

function calculateResult() {
    const openShells = [...document.querySelectorAll('.cowrie-shell')]
                      .filter(s => s.dataset.open === '1').length;
    
    const result = odus[currentHouse].combinations.find(c => c.open === openShells) 
                   || odus[currentHouse].combinations[0];
    
    showResult(result);
}

function showResult(result) {
    document.getElementById('casting-screen').classList.add('hidden');
    document.getElementById('result-screen').classList.remove('hidden');
    
    document.getElementById('odu-name').textContent = result.name;
    document.getElementById('odu-symbol').textContent = result.symbol;
    document.getElementById('message').textContent = result.message;
    document.getElementById('advice').textContent = result.advice;
    document.getElementById('ebo').textContent = result.ebo;
    
    if(energyLevel < 50) {
        document.getElementById('ebo').textContent += " + Ofereça água à natureza";
    }
}

function resetReading() {
    document.getElementById('result-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    selectedOfferings = [];
    energyLevel = 100;
    document.querySelectorAll('.offering-item').forEach(i => i.classList.remove('selected'));
    document.getElementById('user-question').value = '';
    updateEnergy();
}
