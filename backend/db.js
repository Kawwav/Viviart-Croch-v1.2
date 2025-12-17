const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://viviart:Vini00kawwa.@cluster0.npx7jym.mongodb.net/viviartDB?retryWrites=true&w=majority"
    );
    console.log("MongoDB conectado! 🚀");
  } catch (error) {
    console.error("Erro ao conectar no Mongo:", error);
  }
}

module.exports = connectDB;
