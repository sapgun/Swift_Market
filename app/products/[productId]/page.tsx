export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  return (
    <div>
      <h1>Product Detail Page</h1>
      <p>Product ID: {params.productId}</p>
    </div>
  );
}
