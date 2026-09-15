import os
import re
import bibtexparser


# =========================================================
# Configuration
# =========================================================

BIB_FILE = "pub_2026.bib"
OUTPUT_DIR = "content/publication"

# =========================================================
# Helper functions
# =========================================================

def clean_text(text):
    """Clean common BibTeX formatting."""
    if not text:
        return ""

    text = str(text)

    # Remove BibTeX braces
    text = text.replace("{", "").replace("}", "")

    # Common BibTeX formatting
    text = text.replace("~", " ")

    # Normalize whitespace
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def parse_authors(author_field):
    """
    Convert a BibTeX author field into a list of names.

    Also bold Sen Zhao.

    Example:
        Zhao, Sen and Li, Ning
    ->
        ["**Sen Zhao**", "Ning Li"]
    """

    if not author_field:
        return []

    authors = []

    for author in author_field.split(" and "):

        author = clean_text(author)

        if not author:
            continue

        # BibTeX format: Last, First
        if "," in author:
            last, first = author.split(",", 1)
            author = f"{first.strip()} {last.strip()}"

        # Bold Sen Zhao
        if author.strip() == "Sen Zhao":
            author = "**Sen Zhao**"

        authors.append(author)

    return authors


def yaml_quote(text):
    """Safely quote a string for YAML."""

    if text is None:
        return '""'

    text = str(text)

    text = text.replace("\\", "\\\\")
    text = text.replace('"', '\\"')

    return f'"{text}"'


def yaml_list(items):
    """Convert a Python list into a YAML list."""

    return "[" + ", ".join(yaml_quote(x) for x in items) + "]"


def parse_bool(value, default=False):
    """Convert common text representations into a Boolean."""

    if value is None:
        return default

    value = str(value).strip().lower()

    if value in ["true", "yes", "1"]:
        return True

    if value in ["false", "no", "0"]:
        return False

    return default


def parse_extra(extra):
    """
    Parse custom Hugo fields from the BibTeX 'extra' field.

    Example:

        hugo_publication_type: 2
        hugo_first_author: true
        hugo_featured: false
        hugo_summary: My summary
        hugo_tags: ENSO, El Niño, predictability
        hugo_pdf: https://example.com/paper.pdf
    """

    metadata = {}

    if not extra:
        return metadata

    for line in extra.splitlines():

        line = line.strip()

        if not line:
            continue

        match = re.match(
            r"^hugo_([A-Za-z0-9_-]+)\s*:\s*(.*)$",
            line
        )

        if not match:
            continue

        key = match.group(1)
        value = match.group(2).strip()

        metadata[key] = value

    return metadata


def format_publication(entry):
    """
    Create the publication string.

    Example:
        **_Geophysical Research Letters_**, 52, 2024GL113127
    """

    journal = clean_text(
        entry.get(
            "journaltitle",
            entry.get("journal", "")
        )
    )

    volume = clean_text(entry.get("volume", ""))
    number = clean_text(entry.get("number", ""))
    pages = clean_text(entry.get("pages", ""))

    parts = []

    if journal:
        parts.append(f"**_{journal}_**")

    if volume:
        parts.append(volume)

    if number:
        parts.append(f"({number})")

    if pages:
        parts.append(pages)

    return ", ".join(parts)


# =========================================================
# Create output directory
# =========================================================

os.makedirs(OUTPUT_DIR, exist_ok=True)


# =========================================================
# Read BibTeX file
# =========================================================

print(f"Reading: {BIB_FILE}")

with open(BIB_FILE, "r", encoding="utf-8") as bib_file:
    bib_database = bibtexparser.load(bib_file)

print(f"Found {len(bib_database.entries)} publications.")


# =========================================================
# Process every publication
# =========================================================

for entry in bib_database.entries:

    # -----------------------------------------------------
    # BibTeX key
    # -----------------------------------------------------

    key = entry.get("ID")

    if not key:
        print("WARNING: Entry without a BibTeX key. Skipping.")
        continue


    # -----------------------------------------------------
    # Basic metadata
    # -----------------------------------------------------

    title = clean_text(
        entry.get("title", "")
    )

    authors = parse_authors(
        entry.get("author", "")
    )

    # Use urldate for both date and publishDate
    urldate = clean_text(
        entry.get("urldate", "")
    )

    abstract = clean_text(
        entry.get("abstract", "")
    )

    doi = clean_text(
        entry.get("doi", "")
    )

    url = clean_text(
        entry.get("url", "")
    )


    # -----------------------------------------------------
    # Parse custom Hugo metadata
    # -----------------------------------------------------

    extra = entry.get("extra", "")

    hugo = parse_extra(extra)


    # -----------------------------------------------------
    # Hugo-specific fields
    # -----------------------------------------------------

    publication_type = hugo.get(
        "publication_type",
        "2"
    )

    first_author = parse_bool(
        hugo.get("first_author"),
        default=False
    )

    featured = parse_bool(
        hugo.get("featured"),
        default=False
    )


    # -----------------------------------------------------
    # Summary
    # -----------------------------------------------------

    summary = hugo.get(
        "summary",
        abstract
    )

    summary = clean_text(summary)


    # -----------------------------------------------------
    # Tags
    # -----------------------------------------------------

    if "tags" in hugo:

        tags = [
            clean_text(tag)
            for tag in hugo["tags"].split(",")
            if clean_text(tag)
        ]

    else:

        keywords = entry.get("keywords", "")

        if keywords:

            tags = [
                clean_text(tag)
                for tag in re.split(
                    r"[,;]",
                    keywords
                )
                if clean_text(tag)
            ]

        else:

            tags = []


    # -----------------------------------------------------
    # Publication information
    # -----------------------------------------------------

    publication = format_publication(entry)


    # -----------------------------------------------------
    # PDF URL
    # -----------------------------------------------------

    url_pdf = hugo.get(
        "pdf",
        url
    )

    url_pdf = clean_text(url_pdf)


    # -----------------------------------------------------
    # Create Hugo front matter
    # -----------------------------------------------------

    content = f"""---
title: {yaml_quote(title)}
date: {urldate}
publishDate: {urldate}
authors: {yaml_list(authors)}
publication_types: [{yaml_quote(publication_type)}]
first_author: {str(first_author).lower()}
abstract: {yaml_quote(abstract)}
featured: {str(featured).lower()}
publication: {yaml_quote(publication)}
doi: {yaml_quote(doi)}
tags: {yaml_list(tags)}
summary: {yaml_quote(summary)}
url_pdf: {yaml_quote(url_pdf)}
---

"""


    # =====================================================
    # Output file: KEY.md
    # =====================================================

    output_file = os.path.join(
        OUTPUT_DIR,
        f"{key}.md"
    )


    # -----------------------------------------------------
    # Write Markdown file
    # -----------------------------------------------------

    with open(
        output_file,
        "w",
        encoding="utf-8"
    ) as md_file:

        md_file.write(content)


    print(f"Created: {output_file}")


# =========================================================
# Finished
# =========================================================

print("")
print("Done.")