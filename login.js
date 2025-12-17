// ---------------- ANIMAÇÃO ENTRE TELAS ----------------
const container = document.querySelector('.login-container');
const up = document.getElementById('signUp');
const inBtn = document.getElementById('signIn');

up.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

inBtn.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});


// ---------------- CADASTRO (BACKEND) ----------------
const formRegister = document.querySelector("#formRegister");

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#regName").value.trim();
  const email = document.querySelector("#regEmail").value.trim();
  const password = document.querySelector("#regPass").value.trim();

  if (!name || !email || !password) {
    return alert("Preencha todos os campos!");
  }

  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message);
    return;
  }

  alert("Conta criada com sucesso! Faça login agora 😉");
  container.classList.remove("right-panel-active"); // volta para login
});


// ---------------- LOGIN (BACKEND) ----------------
async function fazerLogin(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPass").value.trim();

  if (!email || !password) {
    return alert("Preencha e-mail e senha!");
  }

  const resposta = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    alert(dados.message);
    return;
  }

  // Salvar token JWT
  localStorage.setItem("token", dados.token);

  alert("Login realizado com sucesso! 🔥");
  window.location.href = "index.html";
}
