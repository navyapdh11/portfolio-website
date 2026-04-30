"use client";

import Image from "next/image";

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  featured: boolean;
}

interface GalleryTabProps {
  gallery: GalleryItem[];
  showNewGalleryModal: boolean;
  setShowNewGalleryModal: (show: boolean) => void;
  newGalleryItem: { title: string; description: string; imageUrl: string; category: string; featured: boolean };
  setNewGalleryItem: (item: { title: string; description: string; imageUrl: string; category: string; featured: boolean }) => void;
  addGalleryItem: () => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;
}

export default function GalleryTab({
  gallery,
  showNewGalleryModal,
  setShowNewGalleryModal,
  newGalleryItem,
  setNewGalleryItem,
  addGalleryItem,
  deleteGalleryItem,
}: GalleryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">🖼️ Gallery & Content Manager</h2>
        <button onClick={() => setShowNewGalleryModal(true)} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
          + Add Item
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden group hover:border-slate-600/50 transition-all">
            <div className="aspect-video bg-slate-700/50 overflow-hidden relative">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{item.title}</h3>
                {item.featured && <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs">Featured</span>}
              </div>
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded">{item.category}</span>
                <button onClick={() => deleteGalleryItem(item.id)} className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Gallery Modal */}
      {showNewGalleryModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Add Gallery Item</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={newGalleryItem.title}
                onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
              />
              <textarea
                placeholder="Description"
                value={newGalleryItem.description}
                onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none resize-none"
                rows={3}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newGalleryItem.imageUrl}
                onChange={e => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Category"
                value={newGalleryItem.category}
                onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-sky-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 text-white">
                <input
                  type="checkbox"
                  checked={newGalleryItem.featured}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, featured: e.target.checked })}
                  className="w-4 h-4"
                />
                Featured
              </label>
              <div className="flex gap-3">
                <button onClick={addGalleryItem} className="flex-1 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium transition-colors">
                  Add Item
                </button>
                <button onClick={() => setShowNewGalleryModal(false)} className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
