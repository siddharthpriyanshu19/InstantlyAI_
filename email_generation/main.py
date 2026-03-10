import argparse
from llm import LLMClient
from company_research import get_official_website, crawl_company_site
from email_generator import generate_email


def extract_company_description(llm, company_name, raw_text):
    prompt = f"""
You are a business research assistant.

Based on the following website content, write a concise description
of what the company does in 2–3 sentences.

If the content is unclear, infer conservatively.

Company name: {company_name}

Website content:
{raw_text}
"""
    return llm.generate(prompt, temperature=0.2)


def llm_fallback_description(llm, company_name):
    prompt = f"""
You are a business research assistant.

Infer what the following company likely does based on its name.
Be conservative and general.

Company name: {company_name}

Return a 2–3 sentence description.
"""
    return llm.generate(prompt, temperature=0.2)


def run_pipeline(
    first_name,
    job_title,
    company_name,
    seller_company_description,
    product_description,
    seller_website
):
    llm = LLMClient()

    website = get_official_website(company_name)
    raw_text = crawl_company_site(website) if website else ""

    if len(raw_text) > 1500:
        company_description = extract_company_description(llm, company_name, raw_text)
    else:
        company_description = llm_fallback_description(llm, company_name)

    email = generate_email(
        llm,
        first_name,
        job_title,
        company_name,
        seller_company_description,
        product_description,
        seller_website
    )

    return company_description, email


def main():
    parser = argparse.ArgumentParser(
        description="CLI tool to generate personalized B2B cold emails"
    )

    # Prospect details
    parser.add_argument("--first_name", required=True, help="Prospect first name")
    parser.add_argument("--company_name", required=True, help="Prospect company name")
    parser.add_argument(
        "--job_title",
        default="Marketing Lead",
        help="Prospect job title (optional)"
    )

    # Seller details
    parser.add_argument(
        "--seller_company_description",
        required=True,
        help="Seller company description"
    )

    parser.add_argument(
        "--product_description",
        required=True,
        help="Product or service description"
    )

    parser.add_argument(
        "--seller_website",
        required=True,
        help="Seller website URL"
    )

    args = parser.parse_args()

    company_description, email = run_pipeline(
        first_name=args.first_name,
        job_title=args.job_title,
        company_name=args.company_name,
        seller_company_description=args.seller_company_description,
        product_description=args.product_description,
        seller_website=args.seller_website
    )

    print("\nCompany Description:\n")
    print(company_description)

    print("\nFinal Email:\n")
    print(email)


if __name__ == "__main__":
    main()


#python main.py \
#  --first_name "Alex" \
#  --job_title "Head of Marketing" \
#  --company_name "Freshworks" \
#  --seller_company_description "We help B2B teams personalize outbound emails at scale." \
#  --product_description "AI-powered outbound personalization platform" \
#  --seller_website "https://www.example.com"