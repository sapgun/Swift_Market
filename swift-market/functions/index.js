
const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.createOrder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "You must be logged in to create an order.");
  }

  const { productId } = data;
  const buyerId = context.auth.uid;

  const productRef = admin.firestore().collection("products").doc(productId);
  const productDoc = await productRef.get();

  if (!productDoc.exists) {
    throw new functions.https.HttpsError("not-found", "Product not found.");
  }

  const product = productDoc.data();

  if (product.status === "sold") {
    throw new functions.https.HttpsError("already-exists", "This product has already been sold.");
  }

  if (product.sellerId === buyerId) {
      throw new functions.https.HttpsError("permission-denied", "You cannot buy your own product.");
  }


  await admin.firestore().collection("orders").add({
    productId,
    buyerId,
    sellerId: product.sellerId,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  await productRef.update({ status: "sold" });

  return { success: true };
});
