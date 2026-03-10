def generate_email(llm, first_name, job_title, company_name,
                   seller_company_description,
                   product_description,
                   website_url):

    prompt = f"""
You are a B2B sales copywriter specializing in personalized outbound emails.

Your task is to write a concise, personalized cold email using the following inputs:

Prospect Details:
- First Name: {first_name}
- Job Title: {job_title}
- Company Name: {company_name}

Seller Details:
- Company Description: {seller_company_description}
- Product / Service: {product_description}
- Website: {website_url}

Instructions:
1. Infer what the prospect’s company does based on the company name.
2. Identify the key priorities, challenges, or KPIs typically associated with the prospect’s job title.
3. Connect the seller’s product or service to a relevant challenge or opportunity for that role at that company.
4. Write a short, natural-sounding email that:
   - Opens with light personalization (role or company-based)
   - Clearly explains how the product can help *them*
   - Avoids buzzwords and salesy language
   - Ends with a low-pressure call-to-action to connect or schedule a call
5. Do not make false claims or pretend prior interactions.

Tone:
Professional, friendly, and conversational.

Length:
80–150 words.

Output only the email body.
"""
    return llm.generate(prompt, temperature=0.4)
