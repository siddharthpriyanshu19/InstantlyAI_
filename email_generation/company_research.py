from ddgs import DDGS
from urllib.parse import urlparse, urljoin
import requests
from bs4 import BeautifulSoup

BLACKLIST_DOMAINS = [
    "linkedin.com",
    "crunchbase.com",
    "wikipedia.org",
    "facebook.com",
    "twitter.com",
    "glassdoor.com"
]

IMPORTANT_PATHS = [
    "",
    "/about",
    "/about-us",
    "/company",
    "/products",
    "/solutions"
]

def search_company(company_name):
    query = f"{company_name} official website"
    results = []

    with DDGS() as ddgs:
        for r in ddgs.text(query, max_results=5):
            results.append(r.get("href"))

    return results

def is_official_site(url, company_name):
    domain = urlparse(url).netloc.lower()

    if any(bad in domain for bad in BLACKLIST_DOMAINS):
        return False

    tokens = company_name.lower().split()
    return any(token in domain for token in tokens)

def get_official_website(company_name):
    urls = search_company(company_name)

    for url in urls:
        if is_official_site(url, company_name):
            return url

    return None

def fetch_clean_text(url):
    try:
        r = requests.get(url, timeout=10, headers={"User-Agent": "Mozilla/5.0"})
        soup = BeautifulSoup(r.text, "html.parser")

        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()

        return " ".join(soup.stripped_strings)

    except Exception:
        return ""

def crawl_company_site(base_url):
    text = ""

    for path in IMPORTANT_PATHS:
        page_url = urljoin(base_url, path)
        text += fetch_clean_text(page_url) + "\n"

    return text.strip()
