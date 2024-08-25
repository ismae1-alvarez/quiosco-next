"use client"
import { upadateProduct } from "@/actions/upadate-product-action";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditProductForm({children}:{children : React.ReactNode}) {

    const router = useRouter();
    const params = useParams();
    const id = +params.id!;

    const handleSubmit = async (formData:FormData)=>{
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        };

        console.log(data);
        const result = ProductSchema.safeParse(data);

        if(!result.success){
            result.error.issues.forEach(issues=>{
                toast.error(issues.message);
            });

            return;
        };


        const response = await upadateProduct(result.data, id);

        if(response?.errors){
            response.errors.forEach(issues=>{
                toast.error(issues.message);
            });

            return;
        };

        toast.success('Producto Actulizado Correctamente');

        router.push('/admin/products');
    };

  return (
    <>
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">

            <form 
                className="space-y-5"
                action={handleSubmit}
            >
                {children}
                <input 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 uppercase font-bold cursor-pointer mt-5"
                    value='Guardar Cambios'
                />
            </form>
        </div>
    </>
  )
}