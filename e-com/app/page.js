import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";

async function getProducts(){

  const res = await fetch("https://fakestoreapi.com/products?limit=8");
  if(!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function Home() {

  const products = await getProducts();
  console.log(products)

  return (

    <div className="flex flex-col gap-12 pb-20">
      <Hero />

      {/*Featured Product Section*/}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Featured Products</h2>
          <button className="text-orange-600 font-medium hover:underline">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {
            products.map((product) =>
              <ProductCard 
                key={product.id}
                product = {{
                  id: product.id,
                  image: product.image,
                  title: product.title,
                  price: product.price,
                  category: product.category
                }}
              />
            )
          }
        </div>
      </section>
    </div>
    
  );
}
