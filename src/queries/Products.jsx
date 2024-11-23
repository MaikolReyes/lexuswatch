import { collection, doc, getDoc, getDocs, setDoc, where, query, deleteDoc } from 'firebase/firestore';

const PRODUCT_COLLECTION = 'Products';

export const getAllProducts = (db) => {
    const collectionRef = collection(db, PRODUCT_COLLECTION);
    return getDocs(collectionRef)
        .then((snapshot) => {
            const products = [];
            snapshot?.docs?.forEach((item) => {
                products.push({
                    id: item.id,
                    ...item.data()
                })
            })
            return products;
        })
        .catch((error) => {
            return error;
        })
}

export const getProductById = async (db, id) => {
    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.error("No such document!");
        return {};
    }
};

export const getProductsByCategory = (db, category_id) => {
    const collectionRef = query(
        collection(db, PRODUCT_COLLECTION),
        where('marca', '==', category_id)
    )
    return getDocs(collectionRef)
        .then((snapshot) => {
            const products = [];
            snapshot?.docs?.forEach((item) => {
                products.push({
                    id: item.id,
                    ...item.data()
                })
            })
            return products;
        })
        .catch((error) => {
            return error;
        })
}

export const setProductById = (db, data, id = null) => {
    let tempId = null
    if (id) {
        tempId = id;
    } else {
        tempId = `Product-${Math.random()}`
    }
    return setDoc(doc(db, PRODUCT_COLLECTION, tempId), data)
        .then((data) => {
            console.log("Informacion guardada: ", data);
        })
        .catch((error) => {
            console.log('error:', error)
        })
}

export const deleteProductById = (db, id) => {
    return deleteDoc(doc(db, PRODUCT_COLLECTION, id))
}