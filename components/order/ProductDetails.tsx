import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { formatCurency } from "@/src/utils";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";

type ProductDetailsProps={
    item:OrderItem;
};

const MIN_ITEM = 1;
const MAX_ITEM = 5;

export default function ProductDetails({ item }:ProductDetailsProps) {

    const { increaseQuantity, decreaseQuantity, removeItem } = useStore((state)=> state);

    const desableDecreaseButton = useMemo(()=> item.quantity === MIN_ITEM, [item]);
    const desableIncreaseButton = useMemo(()=> item.quantity === MAX_ITEM, [item]);



  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button type="button" onClick={() => removeItem(item.id)}>
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">{item.price}</p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button 
            type="button" 
            onClick={() => decreaseQuantity(item.id)}
            disabled={desableDecreaseButton}
            className="disabled:opacity-20"
            >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">{formatCurency(item.quantity)}</p>

          <button 
            type="button" 
            onClick={() => increaseQuantity(item.id)}
            disabled={desableIncreaseButton}
            className="disabled:opacity-20"
            >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {""}
          <span className="font-normal">
            {formatCurency(item.subtotal)}
          </span>
        </p>
      </div>
    </div>
  );
}
