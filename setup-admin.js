const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyB6tiqUCbcuhJi0exAHhrmhERbit7r7tWc",
  authDomain: "webkatar-b9948.firebaseapp.com",
  databaseURL: "https://webkatar-b9948-default-rtdb.firebaseio.com",
  projectId: "webkatar-b9948",
  storageBucket: "webkatar-b9948.firebasestorage.app",
  messagingSenderId: "400439315289",
  appId: "1:400439315289:web:db14f16541403479309a48",
  measurementId: "G-BB2XFFM647"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

async function setupAdmin() {
  try {
    const adminRef = ref(database, 'users/admin001');
    
    await set(adminRef, {
      namaLengkap: "Administrator",
      username: "admin",
      password: "admin123",
      role: "admin",
      tanggalLahir: "1990-01-01",
      jenisKelamin: "Laki-laki",
      noTelepon: "081234567890",
      statusKeaktifan: "Aktif",
      jabatan: "Administrator",
      createdAt: new Date().toISOString()
    });
    
    console.log("✅ Admin user berhasil dibuat!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("\nSilakan login ke dashboard dengan kredensial di atas.");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
}

setupAdmin();
