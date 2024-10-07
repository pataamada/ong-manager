import { 
  collection,
  query, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  serverTimestamp, 
  deleteDoc
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebase-secret";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

export const saveAnimalDb = async (
  nome: string,
  idade: number,
  tipo: string,
  sexo: string,
  tamanho: string,
  fotos: string[],
  observacoes: string,
  castrado: boolean,
  vacinas: string[],
  disponivel: boolean,
  atualizadoPor: string
) => {
  const document = await addDoc(collection(db, "animais"), {
    animalId: crypto.randomUUID(),
    nome: nome,
    idade: idade,
    tipo: tipo,
    sexo: sexo,
    tamanho: tamanho,
    fotos: fotos,
    observacoes: observacoes,
    castrado: castrado,
    vacinas: vacinas,
    disponivel: disponivel,
    cadastradoEm: serverTimestamp(),
    atualizadoEm: serverTimestamp(),
    atualizadoPor: atualizadoPor,
  });
  return JSON.stringify(document);
}

export const findAnimal = async () => {
  const q = query(collection(db, "animais"));
  const querySnapshot = await getDocs(q);
  const animals = querySnapshot.docs.map((doc) => doc.data());
  return animals;
}

export const findAnimalById = async (animalId: string) => {
  const document = await getDoc(doc(db, `animais/${animalId}`));
  return document.data();
}

export const updateAnimal = async (
  animalId: string,
  nome: string,
  idade: number,
  tipo: string,
  sexo: string,
  tamanho: string,
  fotos: string[],
  observacoes: string,
  castrado: boolean,
  vacinas: string[],
  disponivel: boolean,
  atualizadoPor: string
) => {
  const updatedDocument = await updateDoc(doc(db, `animais/${animalId}`), {
    nome: nome,
    idade: idade,
    tipo: tipo,
    sexo: sexo,
    tamanho: tamanho,
    fotos: fotos,
    observacoes: observacoes,
    castrado: castrado,
    vacinas: vacinas,
    disponivel: disponivel,
    atualizadoEm: serverTimestamp(),
    atualizadoPor: atualizadoPor,
  });
  return JSON.stringify(updatedDocument);
}

export const deleteAnimal = async (animalId: string) => {
  const deletedAnimal = await deleteDoc(doc(db, `animais/${animalId}`));
  return JSON.stringify(deletedAnimal);
}

export const uploadAnimalImage = async (params: FormData) => {
  if(params.get("foto") === null) {
    throw Error("Nenhuma imagem foi selecionada");
  }
  const file = params.get("foto") as File;
  const fileName = file.name.split(".")[0]
  const storageRef = ref(storage, `${params.get("tipo")}/${fileName}`);
  const upload = uploadBytesResumable(storageRef, file);
  return upload.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      throw Error("Erro ao fazer upload da imagem");
    },
    () => 
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        return url;
      })
  )
}

export const getAnimalImages = async (tipo: string) => {
  const folder = await listAll(ref(storage, tipo));

  const downloadUrls: string[] = [];
  for (const image in folder.items) {
    downloadUrls.push(await getDownloadURL(ref(storage, `${image}`)));
  }
  return downloadUrls;
}

export const deleteImage = async (params: FormData) => {
  const response = deleteObject(ref(storage, `${params.get("imageId")}`))
  .then(() => {
    console.log("Imagem deletada com sucesso");
  })
  .catch((error) => {
    throw Error("Erro ao deletar imagem");
  });
  return await response;
}