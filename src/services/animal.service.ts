import { collection, query, getDocs, getDoc, doc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase/firebase-secret";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

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