import { complateOrder } from "@/actions/complete-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurency } from "@/src/utils"

type OrderCardProps ={
    order:OrderWithProducts
} 


export default function OrderCard({ order } : OrderCardProps) {


    
    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900'>Cliente: { order.name }</p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">

                {order.orderProducts.map( product =>(
                    <div 
                        className="flex items-center gap-2 border-t border-gray-200 pt-4"
                        key={product.producId}    
                    >
                        <dt className="flex items-center text-sm text-gray-600">
                            <span className="font-black">
                                ({product.quantity}){''}
                            </span>
                        </dt>
                        <dt className="text-sm font-medium text-gray-900">
                            {product.product.name}
                        </dt>
                    </div>
                ))}
        
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar:</dt>
                    <dd className="text-base font-medium text-gray-900">{formatCurency(order.total)}</dd>
                </div>
            </dl>

            <form action={complateOrder}>
                <input 
                    type="hidden"
                    value={order.id}
                    name="order_id"
                />
                <input
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value='Marcar Orden Completada'
                />
            </form>
        </section>
    )
}
