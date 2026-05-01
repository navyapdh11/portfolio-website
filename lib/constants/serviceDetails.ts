export const serviceDetails: Record<
	string,
	{
		description: string;
		included: string[];
		addons: { label: string; value: string; price: number }[];
	}
> = {
	"domestic-cleaning": {
		description:
			"Professional home cleaning with eco-friendly products. Police-checked cleaners, flexible scheduling, and a satisfaction guarantee on every clean across Australia.",
		included: [
			"Whole-house dusting & wiping",
			"Vacuuming all carpeted areas",
			"Mopping hard floors",
			"Kitchen sanitization (benchtops, sink, stovetop)",
			"Bathroom deep clean & disinfection",
			"Toilet sanitization",
			"Rubbish removal from all rooms",
			"Surface polishing & streak-free glass",
		],
		addons: [
			{ label: "Interior Windows (per room)", value: "window_int", price: 12 },
			{
				label: "Exterior Windows (ground floor)",
				value: "window_ground",
				price: 20,
			},
			{ label: "Inside Oven Clean", value: "oven_clean", price: 35 },
			{ label: "Inside Fridge Clean", value: "fridge_clean", price: 25 },
			{ label: "Laundry Load (wash & fold)", value: "laundry", price: 30 },
			{ label: "Wall Spot Cleaning", value: "wall_spot", price: 15 },
		],
	},
	"end-of-lease-cleaning": {
		description:
			"Bond-back guaranteed end of lease cleaning compliant with all state tenancy laws. 72-hour re-clean policy, accepted by all major property managers across Australia.",
		included: [
			"Full property deep clean",
			"Kitchen: inside/outside cabinets, appliances",
			"Bathroom: tile scrubbing, grout cleaning",
			"All windows interior clean",
			"Carpet vacuuming",
			"Floor mopping",
			"Light fixture dusting",
			"Skirting boards & door frames",
			"Garage sweep (if applicable)",
		],
		addons: [
			{
				label: "Carpet Steam Clean (per room)",
				value: "carpet_steam",
				price: 45,
			},
			{ label: "External Window Clean", value: "ext_window", price: 80 },
			{ label: "Wall Wash (full property)", value: "wall_wash", price: 150 },
			{ label: "Garage Deep Clean", value: "garage", price: 95 },
			{ label: "Blind Cleaning (per set)", value: "blinds", price: 35 },
			{ label: "Gutter Clean", value: "gutters", price: 120 },
		],
	},
	"commercial-cleaning": {
		description:
			"Enterprise-grade commercial cleaning for offices, retail spaces, and industrial facilities. WHS compliant, insured, and operating across all Australian states.",
		included: [
			"Floor care (vacuuming, mopping, buffing)",
			"Restroom sanitization & restocking",
			"Kitchen/tea area cleaning",
			"Reception & common area cleaning",
			"Waste removal & bin sanitization",
			"Glass & entryway cleaning",
			"Dusting all surfaces",
			"Spot cleaning walls & doors",
		],
		addons: [
			{ label: "Carpet Extraction (per sqm)", value: "carpet_ext", price: 3.5 },
			{ label: "Window Cleaning (exterior)", value: "win_ext", price: 5 },
			{ label: "High Dusting (per hour)", value: "high_dust", price: 85 },
			{ label: "Pressure Washing (per sqm)", value: "pressure", price: 4 },
			{ label: "After-Hours Premium", value: "after_hours", price: 50 },
			{ label: "Biohazard Cleanup", value: "biohazard", price: 200 },
		],
	},
	"office-cleaning": {
		description:
			"Professional office cleaning with minimal disruption. After-hours service available, NDA-compliant staff, and eco-friendly products used across all major Australian cities.",
		included: [
			"Desk & workstation wiping",
			"Carpet vacuuming",
			"Floor mopping",
			"Kitchen sanitization",
			"Bathroom deep clean",
			"Rubbish & recycling removal",
			"Glass partition cleaning",
			"Reception area tidying",
		],
		addons: [
			{
				label: "Upholstery Clean (per chair)",
				value: "uphol_chair",
				price: 25,
			},
			{ label: "Carpet Spot Treatment", value: "carpet_spot", price: 15 },
			{ label: "Plant Care & Watering", value: "plant_care", price: 20 },
			{ label: "Air Vent Dusting", value: "air_vent", price: 40 },
			{ label: "Blind Cleaning (per set)", value: "blinds", price: 30 },
		],
	},
	"industrial-cleaning": {
		description:
			"Heavy-duty industrial cleaning for warehouses, factories, and manufacturing facilities. OHS/WHS compliant with industry-specific protocols and certified teams.",
		included: [
			"Floor scrubbing & degreasing",
			"Machinery exterior cleaning",
			"Loading dock sanitization",
			"Warehouse sweeping & mopping",
			"Restroom & change room cleaning",
			"Waste management & disposal",
			"High-bay dusting",
			"Chemical spill response",
		],
		addons: [
			{ label: "High-Pressure Wash (per hour)", value: "hp_wash", price: 120 },
			{ label: "Confined Space Cleaning", value: "confined", price: 250 },
			{ label: "Chemical Degreasing", value: "degrease", price: 180 },
			{ label: "Roof & Gutter Clean", value: "roof_gutter", price: 300 },
			{ label: "Hazardous Waste Removal", value: "haz_waste", price: 350 },
		],
	},
	"builders-cleaning": {
		description:
			"Post-construction cleaning for new builds and renovations. Debris removal, detailed finishes, safety-certified teams available across all Australian states.",
		included: [
			"Construction debris removal",
			"Dust & cobweb elimination",
			"Window & frame cleaning (inside/out)",
			"Floor deep clean & polish",
			"Kitchen & bathroom sanitization",
			"Cabinet interior cleaning",
			"Light fixture cleaning",
			"Paint splatter removal",
		],
		addons: [
			{ label: "Carpet Pre-Clean (per room)", value: "carpet_pre", price: 55 },
			{ label: "Pressure Wash Driveway", value: "driveway", price: 150 },
			{ label: "Facade Pressure Clean", value: "facade", price: 200 },
			{ label: "Scaffold-Assisted High Clean", value: "scaffold", price: 300 },
			{ label: "Final Touch-Up Clean", value: "touchup", price: 100 },
		],
	},
	"retail-cleaning": {
		description:
			"Retail store and shopping centre cleaning. Customer-safe hours, display-area precision, and compliance with Australian retail hygiene standards.",
		included: [
			"Floor cleaning & polishing",
			"Display shelf dusting",
			"Fitting room sanitization",
			"Checkout area cleaning",
			"Restroom cleaning & restocking",
			"Window & glass front cleaning",
			"Rubbish removal",
			"Entrance mat cleaning",
		],
		addons: [
			{ label: "Signage Clean (per sign)", value: "signage", price: 35 },
			{ label: "Awning Pressure Wash", value: "awning", price: 120 },
			{ label: "Carpet Extraction (per room)", value: "carpet_ext", price: 65 },
			{ label: "After-Hours Premium", value: "after_hours", price: 50 },
		],
	},
	"strata-cleaning": {
		description:
			"Strata and body corporate cleaning for common areas. Scheduled maintenance, strata-law compliant, fully insured for multi-residential buildings.",
		included: [
			"Lobby & foyer cleaning",
			"Stairwell sweeping & mopping",
			"Lift interior cleaning",
			"Common bathroom sanitization",
			"Corridor dusting & wiping",
			"Bin area washdown",
			"Garden path sweeping",
			"Mailbox area cleaning",
		],
		addons: [
			{ label: "High-Pressure Bin Area Wash", value: "bin_wash", price: 95 },
			{
				label: "Common Window Clean (per window)",
				value: "common_win",
				price: 15,
			},
			{ label: "Carpet Clean (per floor)", value: "carpet_floor", price: 120 },
			{ label: "Garage Sweep (per level)", value: "garage_sweep", price: 80 },
			{ label: "Facade Light Dusting", value: "facade_dust", price: 150 },
		],
	},
	"carpet-cleaning": {
		description:
			"Deep carpet cleaning with hot water extraction. Stain removal, odour elimination, and pet-safe products. Serving residential and commercial clients nationwide.",
		included: [
			"Pre-vacuuming all areas",
			"Hot water extraction cleaning",
			"Stain pre-treatment",
			"Deodorizer application",
			"Traffic lane focus cleaning",
			"Edge cleaning along walls",
			"Speed drying setup",
			"Post-clean inspection",
		],
		addons: [
			{
				label: "Pet Stain Treatment (per area)",
				value: "pet_stain",
				price: 25,
			},
			{
				label: "Scotchgard Protection (per room)",
				value: "scotchgard",
				price: 30,
			},
			{ label: "Stair Carpet Clean (per flight)", value: "stairs", price: 45 },
			{
				label: "Upholstery Add-On (per piece)",
				value: "upholstery",
				price: 55,
			},
			{ label: "Mould Treatment", value: "mould", price: 80 },
		],
	},
	"window-cleaning": {
		description:
			"Professional window cleaning for residential and commercial properties. High-rise certified, streak-free guarantee, and eco-friendly cleaning solutions.",
		included: [
			"Interior glass cleaning",
			"Exterior glass cleaning",
			"Frame & sill wiping",
			"Track cleaning",
			"Flyscreen dusting",
			"Streak-free polish",
			"Hard water spot removal (light)",
			"Sill & frame detail",
		],
		addons: [
			{ label: "French Window (per window)", value: "win_french", price: 20 },
			{ label: "Partitioned Window (per panel)", value: "win_part", price: 18 },
			{
				label: "Screen Pressure Wash (per sqm)",
				value: "screen_wash",
				price: 2.5,
			},
			{
				label: "Hard Water Treatment (per window)",
				value: "hw_treat",
				price: 15,
			},
			{ label: "High-Rise Access (per level)", value: "high_rise", price: 40 },
			{ label: "Skylight Clean (per unit)", value: "skylight", price: 25 },
		],
	},
	"deep-cleaning": {
		description:
			"Comprehensive deep cleaning for homes and businesses. Top-to-bottom sanitization, allergen removal, and eco-friendly products used across all Australian locations.",
		included: [
			"Top-to-bottom dusting (ceilings to floors)",
			"Inside all cabinets & drawers",
			"Behind & under movable furniture",
			"Light fixture & fan cleaning",
			"Window track & sill detail",
			"Baseboard scrubbing",
			"Door & handle sanitization",
			"Switch plate & outlet cleaning",
		],
		addons: [
			{ label: "Inside Oven Clean", value: "oven_deep", price: 45 },
			{ label: "Inside Fridge/Freezer Clean", value: "fridge_deep", price: 40 },
			{
				label: "Carpet Steam Clean (per room)",
				value: "carpet_steam",
				price: 50,
			},
			{ label: "Wall Wash", value: "wall_wash", price: 120 },
			{ label: "Garage Deep Clean", value: "garage_deep", price: 100 },
		],
	},
	"move-in-out-cleaning": {
		description:
			"Move-in and move-out cleaning for properties. Bond-back ready, landlord-approved standards, and flexible scheduling for seamless transitions.",
		included: [
			"Full property deep clean",
			"Kitchen appliance interior clean",
			"Bathroom tile & grout scrub",
			"All window interiors",
			"Wardrobe & cupboard wipe",
			"Light fixture cleaning",
			"Floor scrubbing & mopping",
			"Skirting & door frame wipe",
		],
		addons: [
			{
				label: "Carpet Steam Clean (full property)",
				value: "carpet_full",
				price: 200,
			},
			{ label: "External Window Clean", value: "ext_window", price: 90 },
			{ label: "Pressure Wash Entry", value: "entry_wash", price: 80 },
			{ label: "Blind Clean (per set)", value: "blinds", price: 30 },
			{ label: "Garden Tidy & Sweep", value: "garden", price: 60 },
		],
	},
	"oven-cleaning": {
		description:
			"Specialized oven and rangehood cleaning. Food-safe degreasers, appliance-safe techniques, and thorough results guaranteed for all oven types.",
		included: [
			"Oven interior degreasing",
			"Rack & tray soak clean",
			"Door glass clean",
			"Control panel wipe",
			"Rangehood filter clean",
			"Rangehood exterior polish",
			"Splashback cleaning",
			"Final sanitization",
		],
		addons: [
			{ label: "Second Oven Clean", value: "second_oven", price: 60 },
			{ label: "Stovetop Deep Clean", value: "stovetop", price: 40 },
			{ label: "BBQ Clean", value: "bbq", price: 55 },
			{ label: "Rangehood Duct Clean", value: "duct", price: 80 },
		],
	},
	"upholstery-cleaning": {
		description:
			"Professional furniture and upholstery cleaning. Fabric-safe methods, stain removal, and allergen reduction for all fabric types.",
		included: [
			"Fabric assessment & testing",
			"Pre-vacuuming all surfaces",
			"Stain pre-treatment",
			"Deep extraction cleaning",
			"Deodorizer application",
			"Spot & mark removal",
			"Fabric protector application",
			"Drying setup",
		],
		addons: [
			{
				label: "Leather Conditioning (per piece)",
				value: "leather",
				price: 45,
			},
			{ label: "Pet Odour Treatment", value: "pet_odour", price: 35 },
			{
				label: "Scotchgard Protection (per piece)",
				value: "scotch_uphol",
				price: 25,
			},
			{
				label: "Cushion Re-stuffing (per cushion)",
				value: "cushion",
				price: 15,
			},
		],
	},
	"tile-grout-cleaning": {
		description:
			"Professional tile and grout restoration cleaning. Deep cleaning, resealing, and colour restoration for kitchens, bathrooms, and commercial spaces.",
		included: [
			"Tile surface deep clean",
			"Grout line scrubbing",
			"Stain pre-treatment",
			"High-pressure rinse",
			"Grout colour restoration",
			"Sealant application (optional)",
			"Corner & edge detail",
			"Final inspection",
		],
		addons: [
			{ label: "Grout Resealing (per sqm)", value: "grout_seal", price: 8 },
			{
				label: "Colour Grout Coating (per sqm)",
				value: "colour_grout",
				price: 12,
			},
			{ label: "Tile & Grout Repair", value: "grout_repair", price: 50 },
			{
				label: "Silicone Replacement (per metre)",
				value: "silicone",
				price: 5,
			},
		],
	},
	"pressure-washing": {
		description:
			"High-pressure exterior cleaning for driveways, walls, and commercial facades. Eco-safe detergents, professional equipment, and guaranteed results.",
		included: [
			"Pre-treatment application",
			"High-pressure wash",
			"Edge & corner detail",
			"Gutter & drain clearing",
			"Stain spot treatment",
			"Surface rinse",
			"Runoff management",
			"Final quality check",
		],
		addons: [
			{
				label: "Soft Wash (delicate surfaces, per sqm)",
				value: "soft_wash",
				price: 3,
			},
			{ label: "Roof Wash (per sqm)", value: "roof_wash", price: 5 },
			{ label: "Gutter Clean & Flush", value: "gutter_flush", price: 60 },
			{ label: "Graffiti Removal", value: "graffiti", price: 150 },
			{ label: "Mould & Algae Treatment", value: "mould_treat", price: 80 },
		],
	},
	"disinfection-sanitization": {
		description:
			"Professional disinfection and sanitization services. Hospital-grade products, CDC-compliant protocols, and certified technicians for homes and businesses.",
		included: [
			"Pre-clean surface preparation",
			"Hospital-grade disinfectant application",
			"High-touch point focus (doorknobs, switches, rails)",
			"Bathroom deep sanitization",
			"Kitchen surface sanitization",
			"Air treatment (if applicable)",
			"Dwell time compliance",
			"Post-clean verification",
		],
		addons: [
			{
				label: "UV-C Light Treatment (per room)",
				value: "uv_treat",
				price: 40,
			},
			{ label: "Fogging Treatment (per sqm)", value: "fogging", price: 3 },
			{ label: "Air Purifier Setup", value: "air_purifier", price: 30 },
			{ label: "Certification Report", value: "cert_report", price: 50 },
			{ label: "Biohazard Cleanup", value: "biohazard", price: 250 },
		],
	},
	"laundry-services": {
		description:
			"Professional laundry services with pickup and delivery. Eco-friendly detergents, stain treatment, and careful handling of all fabric types.",
		included: [
			"Garment sorting & inspection",
			"Pre-stain treatment",
			"Machine wash (eco detergent)",
			"Tumble dry or line dry",
			"Quality check",
			"Folding & packaging",
			"Delivery to specified location",
			"Hanger service (optional)",
		],
		addons: [
			{ label: "Ironing & Pressing (per item)", value: "iron", price: 5 },
			{ label: "Dry Cleaning (per item)", value: "dry_clean", price: 12 },
			{ label: "Specialty Fabric Care", value: "specialty", price: 18 },
			{ label: "Shoe Clean (per pair)", value: "shoe_clean", price: 15 },
			{ label: "Rush Service (same day)", value: "rush", price: 25 },
		],
	},
	"school-educational-cleaning": {
		description:
			"School and educational facility cleaning with child-safe products. Term-time scheduling, health department compliant, and experienced education-sector teams.",
		included: [
			"Classroom deep clean",
			"Desk & chair sanitization",
			"Whiteboard & glass cleaning",
			"Floor vacuuming & mopping",
			"Playground area sweep",
			"Restroom sanitization & restocking",
			"Kitchen/tea area clean",
			"Rubbish & recycling removal",
		],
		addons: [
			{ label: "Gym Floor Polish", value: "gym_polish", price: 200 },
			{ label: "Science Lab Deep Clean", value: "lab_clean", price: 150 },
			{ label: "Library Book Shelf Dusting", value: "shelf_dust", price: 80 },
			{ label: "Hall Stage Clean", value: "stage", price: 100 },
			{ label: "After-Hours Premium", value: "after_hours", price: 50 },
		],
	},
	"medical-healthcare-cleaning": {
		description:
			"Medical and healthcare facility cleaning with infection control protocols. TGA-compliant products, health department certified, and experienced healthcare cleaning teams.",
		included: [
			"Clinical area sanitization",
			"Patient room deep clean",
			"Waiting area cleaning",
			"Restroom medical-grade sanitization",
			"Floor scrubbing & disinfection",
			"High-touch point focus",
			"Waste segregation (general/clinical)",
			"Final compliance inspection",
		],
		addons: [
			{ label: "Theatre/Operating Room Clean", value: "theatre", price: 300 },
			{
				label: "Isolation Room Terminal Clean",
				value: "isolation",
				price: 250,
			},
			{ label: "UV-C Disinfection (per room)", value: "uv_medical", price: 60 },
			{ label: "Compliance Audit Report", value: "audit_report", price: 80 },
			{ label: "Emergency Spill Response", value: "spill", price: 150 },
		],
	},
};
