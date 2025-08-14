import React from "react";

const popularItems = [
  { src: "https://i.pinimg.com/736x/fd/83/37/fd83372a7474aca61c03da023d234376.jpg", name: "Royal Enfield Classic 350" },
  { src: "https://i.pinimg.com/1200x/33/ae/3f/33ae3fc8d46ef77f3cc09c41db0c6987.jpg", name: "KTM Duke 390" },
  { src: "https://i.pinimg.com/736x/b5/be/1c/b5be1cb51cca93e067cba8f0bbe0181f.jpg", name: "Yamaha FZ-S FI" },
  { src: "https://i.pinimg.com/736x/3f/83/80/3f8380586372c6cebb53e4c8c371ef6d.jpg", name: "Bajaj Dominar 400" },
  { src: "https://i.pinimg.com/1200x/03/21/83/032183c14bd5013799857092b30abb5b.jpg", name: "TVS Apache RR 310" },
  { src: "https://www.kalingatv.com/wp-content/uploads/2023/11/2024-maruti-suzuki-swift.jpg", name: "Maruti Suzuki Swift" },
  { src: "https://gaadiwaadi.com/wp-content/uploads/2017/02/DC-Design-Customisation-Kits-Hyundai-Creta.png", name: "Hyundai Creta" },
  { src: "https://c4.wallpaperflare.com/wallpaper/35/876/43/2011-kia-sorento-wallpaper-preview.jpg", name: "Kia Sorento" },
  { src: "https://i.pinimg.com/736x/63/82/31/63823132e69ee1226b4aa36bfd4f41bb.jpg", name: "Mahindra Thar" },
  { src: "https://www.theindianwire.com/wp-content/uploads/2020/11/Toyota-Innova-Crysta-Facelift-Front.jpg", name: "Toyota Innova Crysta" },
];

const PopularStrip = () => {
  const duplicatedItems = [...popularItems, ...popularItems]; // Loop effect

  return (
    <div className="bg-black py-8 overflow-hidden">
      <h2 className="text-2xl font-semibold text-center text-white mb-6">
        Popular Picks
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee w-max gap-8 items-center">
          {duplicatedItems.map((item, index) => (
            <div
              key={index}
              className="relative h-64 w-56 flex items-end justify-start text-left bg-cover bg-center rounded-lg shadow-lg border border-gray-800 overflow-hidden group"
              style={{ backgroundImage: `url(${item.src})` }}
            >
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 group-hover:opacity-80 transition-all"></div>

              {/* Top row with tag & date */}
          

              {/* Bottom text */}
              <main className="p-4 z-10">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:underline"
                >
                  {item.name}
                </a>
              </main>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularStrip;
