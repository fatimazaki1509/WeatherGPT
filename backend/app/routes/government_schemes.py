from fastapi import APIRouter

router = APIRouter()

@router.get("/government-schemes")
async def get_schemes(state: str = "Maharashtra"):

    schemes = [
        {
            "name": "PM-KISAN",
            "benefit": "₹6000/year direct income support",
            "eligibility": "All eligible farmer families",
            "link": "https://pmkisan.gov.in"
        },
        {
            "name": "Pradhan Mantri Fasal Bima Yojana",
            "benefit": "Crop insurance against natural calamities",
            "eligibility": "All farmers",
            "link": "https://pmfby.gov.in"
        },
        {
            "name": "Kisan Credit Card",
            "benefit": "Low interest agricultural loans",
            "eligibility": "Farmers with cultivable land",
            "link": "https://www.myscheme.gov.in"
        },
        {
            "name": "Soil Health Card Scheme",
            "benefit": "Free soil testing & nutrient recommendations",
            "eligibility": "All farmers",
            "link": "https://soilhealth.dac.gov.in"
        }
    ]

    return {
        "state": state,
        "total_schemes": len(schemes),
        "schemes": schemes
    }