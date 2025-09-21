import { LiveOrderStatus } from "@/components/realtime/live-order-status"
import { ChatWidget } from "@/components/realtime/chat-widget"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  // Mock order data - in production, fetch from Firestore
  const order = {
    id: params.id,
    sellerId: "seller123",
    sellerName: "John Smith",
    status: "shipped",
    escrowAddress: "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Order Details</h1>

        <LiveOrderStatus orderId={params.id} />

        <ChatWidget receiverId={order.sellerId} receiverName={order.sellerName} orderId={params.id} />
      </div>
    </div>
  )
}
