
let index = 0;
const slides = document.querySelectorAll(".slide");

function updateSlides() {
    slides.forEach((slide, i) => {
        slide.classList.remove("active", "left", "right");

        if (i === index) {
            slide.classList.add("active");
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add("left");
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add("right");
        }
    });
}

function nextImage() {
    index = (index + 1) % slides.length;
    updateSlides();
}

function prevImage() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlides();
}

// inicia o slider
updateSlides();


// ===============================
// PAGINAÇÃO DA COLEÇÃO (TECIDO)
// ===============================
let paginaAtual = 0;

function mudarPagina(num, el) {
    const paginas = document.querySelectorAll('.pagina');
    const dots = document.querySelectorAll('.dot-paginacao');

    // Remove a classe 'active' de todas as páginas e bolinhas
    paginas.forEach(p => {
        p.classList.remove('active', 'tecido-right', 'tecido-left');
    });

    dots.forEach(d => {
        d.classList.remove('active', 'from-left', 'from-right');
    });

    const pagina = paginas[num];

    if (num > paginaAtual) {
        pagina.classList.add('tecido-right');
        el.classList.add('from-left');
    } else if (num < paginaAtual) {
        pagina.classList.add('tecido-left');
        el.classList.add('from-right');
    }

    // Ativa a página correta
    pagina.classList.add('active');

    // Ativa a bolinha de navegação correta
    dots[num].classList.add('active');

    paginaAtual = num;

    setTimeout(() => {
        if (window.AOS) {
            AOS.refreshHard();
        }
    }, 500);
}

// ===== MODAL =====
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-main-img");
const modalTitle = document.getElementById("modal-title");
const closeBtn = document.querySelector(".close");

// abre modal ao clicar no card
document.querySelectorAll(".colecao").forEach(card => {
    card.addEventListener("click", () => {
        const img = card.querySelector("img").src;
        const title = card.querySelector("h3").innerText;

        modal.style.display = "flex";
        modalImg.src = img;
        modalTitle.innerText = title;

        modalImg.classList.remove("zoom");
    });
});

// fechar
closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};

// trocar imagem
function trocarImagem(el) {
    modalImg.src = el.src;
    modalImg.classList.remove("zoom");
}

// zoom
modalImg.addEventListener("click", () => {
    modalImg.classList.toggle("zoom");
});



// ===============================
// TIMELINE (EVENTOS)
// ===============================
let position = 0;
const move = 200;

const btnRight = document.getElementById("btnRight");
const btnLeft = document.getElementById("btnLeft");
const timeline = document.getElementById("timeline");

if (btnRight && btnLeft && timeline) {

    btnRight.addEventListener("click", () => {
        position -= move;
        timeline.style.transform = `translateX(${position}px)`;
    });

    btnLeft.addEventListener("click", () => {
        position += move;
        timeline.style.transform = `translateX(${position}px)`;
    });

}

// ===== MODAL EVENTOS =====
const modalEvento = document.getElementById("modalEvento");
const eventoImg = document.getElementById("evento-img");
const eventoTitulo = document.getElementById("evento-titulo");
const eventoDesc = document.getElementById("evento-desc");
const eventoData = document.querySelector(".data-evento");
const closeEvento = document.querySelector(".close-evento");

let eventoAtual = null;
let imgIndex = 0;

// DADOS DOS EVENTOS (ordem = cards)
const eventos = [
    {
        titulo: "Evento 1",
        data: "10/02/2025 — 12/02/2025",
        descricao: "Descrição do evento 1.",
        imagens: ["./img/evento1.jpg"]
    },
    {
        titulo: "Evento 2",
        data: "20/03/2025 — 22/03/2025",
        descricao: "Descrição do evento 2.",
        imagens: ["./img/evento2.jpg"]
    },
    {
        titulo: "Evento 3",
        data: "05/04/2025",
        descricao: "Descrição do evento 3.",
        imagens: ["./img/evento3.jpg"]
    },
    {
        titulo: "Evento 4",
        data: "18/05/2025",
        descricao: "Descrição do evento 4.",
        imagens: ["./img/evento4.jpg"]
    },
    {
        titulo: "Evento 5",
        data: "02/06/2025",
        descricao: "Descrição do evento 5.",
        imagens: ["./img/evento5.jpg"]
    },
    {
        titulo: "Evento 6",
        data: "15/07/2025",
        descricao: "Descrição do evento 6.",
        imagens: ["./img/evento6.jpg"]
    }
];


// clique no card
document.querySelectorAll(".event .card").forEach((card, index) => {
    card.addEventListener("click", () => {
        if (!eventos[index]) return; // 🔥 proteção

        eventoAtual = eventos[index];
        imgIndex = 0;

        eventoTitulo.innerText = eventoAtual.titulo;
        eventoData.innerText = eventoAtual.data;
        eventoDesc.innerText = eventoAtual.descricao;
        eventoImg.src = eventoAtual.imagens[0];

        modalEvento.style.display = "flex";
    });
});
// fechar
closeEvento.addEventListener("click", () => {
    modalEvento.style.display = "none";
});

modalEvento.addEventListener("click", e => {
    if (e.target === modalEvento) {
        modalEvento.style.display = "none";
    }
});

// carrossel
function nextEvento() {
    if (!eventoAtual) return;

    imgIndex = (imgIndex + 1) % eventoAtual.imagens.length;
    eventoImg.src = eventoAtual.imagens[imgIndex];
}

function prevEvento() {
    if (!eventoAtual) return;

    imgIndex =
        (imgIndex - 1 + eventoAtual.imagens.length) %
        eventoAtual.imagens.length;
    eventoImg.src = eventoAtual.imagens[imgIndex];
}

const container = document.querySelector('.login-container');
document.getElementById('signUp').addEventListener('click', () => {
  container.classList.add("right-panel-active");
});
document.getElementById('signIn').addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});



