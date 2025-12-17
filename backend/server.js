const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const User = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// Conecta o MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("API + Mongo rodando! 🚀");
});

// ROTA DE CADASTRO
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Verifica se já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email já cadastrado!" });
  }

  // Criptografar senha
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json({ message: "Conta criada com sucesso!", user: newUser });
});

// ROTA DE LOGIN (gera token)
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Senha incorreta" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    "MEU_SECRET_SUPER_SEGURO",
    { expiresIn: "2h" }
  );

  res.json({ message: "Login realizado com sucesso!", token });
});

// MIDDLEWARE DE AUTENTICAÇÃO
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token ausente" });

  try {
    const decoded = jwt.verify(token, "MEU_SECRET_SUPER_SEGURO");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
}

// ROTA PRIVADA
app.get("/private", auth, (req, res) => {
  res.json({
    message: "Acesso permitido!",
    user: req.user
  });
});

app.listen(3000, () =>
  console.log("Servidor ON → http://localhost:3000")
);
