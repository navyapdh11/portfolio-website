#!/usr/bin/env python3
"""
SBOM Generator for AASTACLEAN Portfolio Website
Generates a Software Bill of Materials in SPDX format.
Run: python scripts/generate-sbom.py
"""

import json
import os
import subprocess
import sys
from datetime import datetime

def generate_sbom():
    """Generate SBOM from package.json and package-lock.json."""
    print("📦 Generating SBOM...")
    
    if not os.path.exists("package-lock.json"):
        print("❌ package-lock.json not found!")
        sys.exit(1)
    
    try:
        with open("package-lock.json", "r") as f:
            lock_data = json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Failed to parse package-lock.json: {e}")
        sys.exit(1)
    
    packages = []
    lockfile_version = lock_data.get("lockfileVersion", 1)
    
    if lockfile_version >= 2:
        # lockfileVersion 2+ has a "packages" key
        for path, info in lock_data.get("packages", {}).items():
            if path == "":
                continue  # Skip root package
            name = info.get("name", path.split("node_modules/")[-1])
            version = info.get("version", "unknown")
            packages.append({"name": name, "version": version})
    else:
        # lockfileVersion 1 has "dependencies" key
        for name, info in lock_data.get("dependencies", {}).items():
            packages.append({"name": name, "version": info.get("version", "unknown")})
    
    sbom = {
        "spdxVersion": "SPDX-2.3",
        "dataLicense": "CC0-1.0",
        "SPDXID": "SPDXRef-DOCUMENT",
        "name": "aastaclean-portfolio-website",
        "documentNamespace": "https://aastaclean.com.au/sbom",
        "creationInfo": {
            "created": datetime.utcnow().isoformat() + "Z",
            "creators": ["Tool: generate-sbom.py"],
            "licenseListVersion": "3.21"
        },
        "packages": [
            {
                "SPDXID": f"SPDXRef-package-{i}",
                "name": pkg["name"],
                "versionInfo": pkg["version"],
                "supplier": "NOASSERTION",
                "downloadLocation": f"https://npmjs.com/package/{pkg['name']}/v/{pkg['version']}",
                "licenseConcluded": "NOASSERTION",
                "copyrightText": "NOASSERTION"
            }
            for i, pkg in enumerate(packages)
        ],
        "relationships": [
            {
                "spdxElementId": "SPDXRef-DOCUMENT",
                "relatedSpdxElement": f"SPDXRef-package-{i}",
                "relationshipType": "CONTAINS"
            }
            for i in range(len(packages))
        ]
    }
    
    output_path = "sbom.spdx.json"
    with open(output_path, "w") as f:
        json.dump(sbom, f, indent=2)
    
    print(f"✅ SBOM generated: {output_path}")
    print(f"   Total packages: {len(packages)}")
    print(f"   SPDX Version: 2.3")

if __name__ == "__main__":
    generate_sbom()
