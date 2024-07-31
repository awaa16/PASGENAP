import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbLsq27KJU9tD9pHC8GrPUB7LgEPEQbPU",
  authDomain: "insan-cemerlang-92ee0.firebaseapp.com",
  projectId: "insan-cemerlang-92ee0",
  storageBucket: "insan-cemerlang-92ee0.appspot.com",
  messagingSenderId: "332441427242",
  appId: "1:332441427242:web:73c31309147ef1dab15253",
  measurementId: "G-JW04DZL85R"
};
// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarabsensi() {
  const refDokumen = collection(db, "absensi");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nomor: dok.data().nomor,
      nama: dok.data().nama,
      nis: dok.data().nis,
      tanggal: dok.data().tanggal,
      alamat: dok.data().alamat,
      notlpn: dok.data().notlpn,
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahabsensi(nama, nis,tanggal, alamat, notlpn, kelas, keterangan) {
  try {
    const dokRef = await addDoc(collection(db, 'absensi'), {
  
      nama: nama,
      nis: nis,
      tanggal: tanggal,
      alamat: alamat,
      notlpn: notlpn,
      kelas: kelas,
      keterangan: keterangan,

    });
    console.log('Berhasil menambah absensi ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah absensi ' + e);
  }
}

export async function hapusabsensi(docid) {
  await deleteDoc(doc(db, "absensi", docid));
}
export async function ubahabsensi(docId, nama, nis,tanggal, alamat, notlpn, kelas, keterangan) {
  await updateDoc(doc(db, "absensi", docId), {
    nama: nama,
    nis: nis,
    tanggal: tanggal,
    alamat: alamat,
    notlpn: notlpn,
    kelas: kelas,
    keterangan: keterangan,

  });
}

export async function ambilabsensi(docId) {
  const docRef = await doc(db, "absensi", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}