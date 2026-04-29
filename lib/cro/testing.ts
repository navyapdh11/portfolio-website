export const abTestingConfig = {
  activeTests: [
    {
      id: "pricing_transparency",
      hypothesis: "Displaying 'incl. GST' badge increases booking completion by 8%.",
      variantA: { label: "Standard Price", priceDisplay: "$179" },
      variantB: { label: "Transparent Price", priceDisplay: "$179 (incl. GST)" },
      goal: "conversion_rate"
    },
    {
      id: "trust_badge_placement",
      hypothesis: "Bond-Back Guarantee badge near CTA increases EoL booking by 12%.",
      variantA: { placement: "Description area" },
      variantB: { placement: "Directly under Book Now button" },
      goal: "conversion_rate"
    },
    {
      id: "state_dynamic_cta",
      hypothesis: "State-specific CTA copy improves click-through by 10%.",
      variantA: { copy: "Book Your Clean" },
      variantB: { copy: "Book Your [State] Professional Clean" },
      goal: "click_through_rate"
    }
  ]
};