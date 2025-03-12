import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-center">
        About Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/FarmHarvesting.png"
            alt="Our organic farm"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div>
          <h2 className="font-playfair text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2010, Tierra Orgánica began with a simple mission: to
            bring the finest organic products from the Peruvian highlands to
            conscious consumers around the world.
          </p>
          <p className="mb-4">
            Our journey started with a small coffee plantation in the Andes
            mountains, where we discovered the extraordinary quality of
            high-altitude, shade-grown coffee. Soon after, we expanded to
            include maca and other superfoods native to the region.
          </p>
          <p>
            Today, we work directly with over 200 small-scale farmers who share
            our commitment to sustainable, organic farming practices. Every
            product in our collection is carefully selected, ethically sourced,
            and crafted to bring you the authentic flavors and benefits of
            Peru's natural bounty.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="font-playfair text-xl font-bold mb-3">Our Mission</h3>
          <p>
            To connect conscious consumers with exceptional organic products
            while supporting sustainable farming communities.
          </p>
        </div>
        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="font-playfair text-xl font-bold mb-3">Our Vision</h3>
          <p>
            A world where organic farming is the standard, not the exception,
            and where farmers receive fair compensation for their work.
          </p>
        </div>
        <div className="bg-primary/5 p-6 rounded-lg">
          <h3 className="font-playfair text-xl font-bold mb-3">Our Values</h3>
          <p>
            Sustainability, transparency, quality, and respect for both people
            and planet guide everything we do.
          </p>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="font-playfair text-2xl font-bold mb-6">
          Our Certifications
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 mb-3 bg-muted rounded-full flex items-center justify-center">
              <Image
                src="/hcca.jpeg"
                alt="Certified Organic"
                width={40}
                height={40}
              />
            </div>
            <span className="text-sm">HCCA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
