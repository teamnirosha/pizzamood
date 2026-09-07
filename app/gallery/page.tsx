import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pizza Mood Photo Gallery | Store Outlets, Products & Launch Events",
  description: "Browse photos of Pizza Mood store outlets, hot pizzas, garlic breads, kitchen setup, and grand launch celebrations.",
};

const galleryCategories = [
  {
    title: "Pizzas & Fast Food",
    images: [
      { url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80", title: "Fresh Cheese Burst Pizza" },
      { url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80", title: "Tandoori Paneer Special" },
      { url: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1000&q=80", title: "Triple Cheese Melt Crust" },
      { url: "https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=1000&q=80", title: "Stuffed Garlic Bread" },
    ],
  },
  {
    title: "Franchise Outlets & Stores",
    images: [
      { url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80", title: "Pizza Mood Kharadi Store Front" },
      { url: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80", title: "Andheri Takeaway Counter" },
      { url: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=1000&q=80", title: "Viman Nagar Student Seating" },
    ],
  },
  {
    title: "Kitchen & Operations",
    images: [
      { url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80", title: "Commercial Oven Baking" },
      { url: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1000&q=80", title: "Packaging & Delivery Prep" },
    ],
  },
];

export default function GalleryPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-red-700">
            Brand Visuals
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Pizza Mood Photo Gallery
          </h1>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            A glimpse into our appetizing menu items, modern QSR store designs, and store launches.
          </p>
        </div>

        <div className="space-y-16">
          {galleryCategories.map((cat, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-3">
                {cat.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.images.map((img, i) => (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="h-56 w-full overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 bg-white">
                      <span className="text-xs font-extrabold text-slate-900">{img.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
