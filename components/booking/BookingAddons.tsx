import { serviceDetails } from "@/lib/constants/serviceDetails";

export function BookingAddons({ serviceSlug, selectedAddons, toggleAddon }: { 
  serviceSlug: string, 
  selectedAddons: string[], 
  toggleAddon: (v: string) => void 
}) {
  const details = serviceDetails[serviceSlug];
  if (!details) return null;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-lg">Custom Add-ons</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {details.addons.map((addon) => (
          <button 
            key={addon.value}
            onClick={() => toggleAddon(addon.value)}
            className={`p-4 rounded-xl border transition-all text-left ${
              selectedAddons.includes(addon.value) 
                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-zinc-200 dark:border-zinc-700 hover:border-blue-300'
            }`}
          >
            <div className="font-medium text-sm">{addon.label}</div>
            <div className="text-xs text-zinc-500">+$ {addon.price}</div>
          </button>
        ))}
      </div>
    </div>
  );
}