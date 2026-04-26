export const serviceDetails = {
  "domestic-cleaning": {
    description: "Standard home cleaning for immaculate results.",
    included: ["Dusting", "Vacuuming", "Mopping", "Kitchen Sanitization"],
    addons: [
      { label: "Window (Ground Floor)", value: "window_ground", price: 12 },
      { label: "Window (2nd Floor)", value: "window_2nd", price: 20 },
      { label: "Sliding Door", value: "sliding_door", price: 12 },
      { label: "Hard Water Treatment", value: "calcium_removal", price: 15 },
    ]
  },
  "window-cleaning": {
    description: "Enterprise glass care.",
    included: ["Streak-free cleaning", "Frame wipe", "Glass polishing"],
    addons: [
      { label: "French Window", value: "win_french", price: 20 },
      { label: "Partitioned Window", value: "win_part", price: 18 },
      { label: "Pressure Wash (sqm)", value: "pressure_wash", price: 2.5 }
    ]
  }
};