import CTitle from "../custom/CTitle";
import ProductCard from "../custom/ProductCard";

const ProductSection = () => {
    const products = [
      {
        name: "Premium Card",
        material: "White Material",
        price: "1,299.00",
        originalPrice: "3,449.00",
        image: "https://introcardbd.com/cdn/shop/files/Silver-SC-02.png?v=1722410130&width=990",
        hoverImage: "https://introcardbd.com/cdn/shop/files/Golden-FC-02.png?v=1723118153&width=990",
        sale: true
      },
      {
        name: "Premium Card",
        material: "Black Material",
        price: "1,499.00",
        originalPrice: "3,649.00",
        image: "https://introcardbd.com/cdn/shop/files/Silver-SC-02.png?v=1722410130&width=990",
        hoverImage: "https://introcardbd.com/cdn/shop/files/Golden-FC-02.png?v=1723118153&width=990",
        sale: true
      },
      {
        name: "Luxury Card",
        material: "Metal Card",
        price: "4,999.00",
        // originalPrice: "6,549.00",
        image: "https://introcardbd.com/cdn/shop/files/Silver-SC-02.png?v=1722410130&width=990",
        hoverImage: "https://introcardbd.com/cdn/shop/files/Golden-FC-02.png?v=1723118153&width=990",
        sale: false
      },
      {
        name: "Luxury Card",
        material: "Metal Card",
        price: "4,999.00",
        originalPrice: "6,549.00",
        image: "https://introcardbd.com/cdn/shop/files/Silver-SC-02.png?v=1722410130&width=990",
        hoverImage: "https://introcardbd.com/cdn/shop/files/Golden-FC-02.png?v=1723118153&width=990",
        sale: false
      }
    ];
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <CTitle title={"Our Products"} />
  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default ProductSection;