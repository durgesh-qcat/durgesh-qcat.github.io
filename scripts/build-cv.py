#!/usr/bin/env python3
"""Build the academic CV from shared website data.

From the repository root: python scripts/build-cv.py
Options: --data content/academic-profile.json --output output/pdf/durgesh-kumar-cv.pdf
Requires reportlab. Uses installed Georgia/Times New Roman, with built-in Times
fallback; CV_FONT_DIR may point to a directory containing Georgia TTF files.
"""
from __future__ import annotations
import argparse
import json
import os
from pathlib import Path
from urllib.parse import urljoin
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

# Match the website palette; descriptive prose stays dark and metadata grey.
INK = colors.HexColor('#171717')
MUTED = colors.HexColor('#686868')
LINK_COLOR = '#8a2d3b'
BURGUNDY = colors.HexColor(LINK_COLOR)
RULE = colors.HexColor('#e6e6e6')
PAGE_W, PAGE_H = A4
MARGIN_X, MARGIN_TOP, MARGIN_BOTTOM = 43, 37, 42
CONTENT_W = PAGE_W - 2 * MARGIN_X

def register_fonts():
    candidates = [
        (Path('/System/Library/Fonts/Supplemental'), 'Georgia', ['Georgia.ttf', 'Georgia Bold.ttf', 'Georgia Italic.ttf', 'Georgia Bold Italic.ttf']),
        (Path('/System/Library/Fonts/Supplemental'), 'TNR', ['Times New Roman.ttf', 'Times New Roman Bold.ttf', 'Times New Roman Italic.ttf', 'Times New Roman Bold Italic.ttf']),
        (Path('/usr/share/fonts/truetype/msttcorefonts'), 'Georgia', ['Georgia.ttf', 'Georgia_Bold.ttf', 'Georgia_Italic.ttf', 'Georgia_Bold_Italic.ttf']),
    ]
    if os.environ.get('CV_FONT_DIR'):
        candidates.insert(0, (Path(os.environ['CV_FONT_DIR']), 'Georgia', ['Georgia.ttf', 'Georgia Bold.ttf', 'Georgia Italic.ttf', 'Georgia Bold Italic.ttf']))
    for directory, family, files in candidates:
        if all((directory / f).is_file() for f in files):
            names = [family, family + '-Bold', family + '-Italic', family + '-BoldItalic']
            for name, filename in zip(names, files):
                pdfmetrics.registerFont(TTFont(name, str(directory / filename)))
            pdfmetrics.registerFontFamily(family, normal=names[0], bold=names[1], italic=names[2], boldItalic=names[3])
            return names
    return ['Times-Roman', 'Times-Bold', 'Times-Italic', 'Times-BoldItalic']

FONT, BOLD, ITALIC, BOLD_ITALIC = register_fonts()
BODY = ParagraphStyle('Body', fontName=FONT, fontSize=10.5, leading=13.5, textColor=INK, spaceAfter=0, allowWidows=0, allowOrphans=0)
SUBTITLE = ParagraphStyle('Subtitle', parent=BODY, fontName=ITALIC, textColor=MUTED)
NAME = ParagraphStyle('Name', parent=BODY, fontName=BOLD, fontSize=25, leading=30, spaceAfter=3)
SECTION = ParagraphStyle('Section', parent=BODY, fontName=BOLD, fontSize=12, leading=15, textColor=BURGUNDY, spaceBefore=10, spaceAfter=5, keepWithNext=True)
DATE = ParagraphStyle('Date', parent=BODY, fontSize=10, leading=13.5, textColor=MUTED, alignment=TA_RIGHT)
CONTACT = ParagraphStyle('Contact', parent=BODY, fontSize=9.5, leading=12.5, textColor=MUTED, spaceBefore=6)

def esc(value):
    return escape(str(value))

def link(label, url):
    safe_url = escape(url, {'"': '&quot;'})
    return f'<a href="{safe_url}" color="{LINK_COLOR}">{esc(label)}</a>'

def p(text, style=BODY):
    return Paragraph(text, style)

def heading(label):
    return p(esc(label), SECTION)

def dated(title, date=''):
    row = Table([[p(title), p(esc(date), DATE)]], colWidths=[CONTENT_W - 106, 106], hAlign='LEFT')
    row.setStyle(TableStyle([
        ('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0), ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ]))
    return row

def entry(title, date, lines, gap=6):
    return KeepTogether([dated(title, date)] + [p(line) for line in lines] + [Spacer(1, gap)])

class CVDocument(BaseDocTemplate):
    def __init__(self, filename, profile):
        super().__init__(filename, pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X,
                         topMargin=MARGIN_TOP, bottomMargin=MARGIN_BOTTOM,
                         title=f'{profile["name"]} - Academic CV', author=profile['name'],
                         subject='Academic curriculum vitae')
        self.profile = profile
        frame = Frame(MARGIN_X, MARGIN_BOTTOM, CONTENT_W, PAGE_H - MARGIN_TOP - MARGIN_BOTTOM,
                      leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
        self.addPageTemplates(PageTemplate(id='cv', frames=frame, onPage=self.decorate))
    def decorate(self, canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(RULE)
        canvas.setLineWidth(0.4)
        canvas.line(MARGIN_X, 31, PAGE_W - MARGIN_X, 31)
        canvas.setFont(FONT, 8)
        canvas.setFillColor(MUTED)
        canvas.drawString(MARGIN_X, 19, self.profile['name'])
        canvas.drawRightString(PAGE_W - MARGIN_X, 19, str(doc.page))
        canvas.restoreState()

def build(data, output):
    profile = data['profile']
    story = [p(esc(profile['name']), NAME), heading('About')]
    for paragraph in data['about']:
        rich = ''.join(link(part['text'], part['href']) if part.get('href') else esc(part['text']) for part in paragraph)
        story.extend([p(rich), Spacer(1, 5)])
    contacts = [link(profile['email'], 'mailto:' + profile['email'])]
    if profile.get('siteUrl'):
        contacts.append(link('Website', profile['siteUrl']))
    contacts.append(link('GitHub', profile['github']))
    if profile.get('scholar'):
        contacts.append(link('Google Scholar', profile['scholar']))
    story.append(p(' &nbsp; | &nbsp; '.join(contacts), CONTACT))

    story.append(heading('Education'))
    for item in data['education']:
        lines = [esc(item['degree']) + '; ' + esc(item['location'])]
        lines += [esc(line) for line in item['details']]
        story.append(entry('<b>' + esc(item['institution']) + '</b>', item['dates'], lines))

    story.append(heading('Research experience'))
    for item in data['research']:
        lines = [esc(item['institution']) + '; ' + esc(item['location'])]
        lines += [esc(line) for line in item['details']]
        if item.get('groups'):
            lines.append(' and '.join(link(group['name'], group['url']) for group in item['groups']) + ' groups.')
        story.append(entry('<b>' + esc(item['role']) + '</b>', item['dates'], lines))

    story.append(heading('Publications'))
    for item in data['publications']:
        lines = [esc(item['authors']) + '.', link(item['venue'], item['venueUrl']) + '.', esc(item['status'])]
        story.append(entry('<b>' + link(item['title'], item['url']) + '</b>', item['year'], lines))

    thesis = data['thesis']
    story.append(heading("Master's thesis"))
    story.append(entry('<b>' + link(thesis['title'], thesis['url']) + '</b>', thesis['year'], [
        esc(thesis['author']) + '. ' + esc(thesis['degree']) + ', ' + esc(thesis['institution']) + '.',
        'Supervisor: ' + esc(thesis['supervisor']) + '.',
        '<i>' + esc(thesis['nomination']) + '</i>',
    ], gap=0))

    story.append(PageBreak())
    if data.get('workInProgress'):
        story.append(heading('Research in progress'))
        story.append(p(''.join(link(part['text'], part['href']) if part.get('href') else esc(part['text']) for part in data['workInProgress'])))
        story.append(Spacer(1, 9))

    story.append(heading('Teaching experience'))
    story.append(p('<b>' + esc(data['teachingRole']) + '</b>, ' + esc(data['teachingInstitution'])))
    story.append(Spacer(1, 5))
    for item in data['teaching']:
        story.extend([dated(esc(item['courses']), item['term']), Spacer(1, 3)])

    story.append(heading('Outreach and exposition'))
    for item in data['outreach']:
        lines = [esc(item['context']) + '. ' + esc(item['description'])]
        if item.get('authors'):
            lines.insert(0, esc(item['authors']) + '.')
        if item.get('linkLabel'):
            lines.append(link(item['linkLabel'], item['url']))
        story.append(entry('<b>' + link(item['title'], item['url']) + '</b>', item['date'], lines))

    story.append(heading('Talks, seminars, and posters'))
    for item in data['talks']:
        lines = [esc(item['kind']) + '. ' + esc(item['event']) + '; ' + esc(item['location']) + '.']
        if item.get('links'):
            lines[0] += ' &nbsp; | &nbsp; ' + ' &nbsp; | &nbsp; '.join(
                link(resource['label'], urljoin(profile['siteUrl'], resource['url']))
                for resource in item['links']
            )
        story.append(entry('<b>' + esc(item['title']) + '</b>', item['date'], lines, gap=9))

    for index, item in enumerate(data['awards']):
        description = esc(item['description'])
        if item['description'] == thesis['nomination']:
            description = '<i>' + description + '</i>'
        award = [
            dated('<b>' + esc(item['title']) + '</b>', item['date']),
            p(description),
            Spacer(1, 8),
        ]
        if index == 0:
            award.insert(0, heading('Honors and awards'))
        story.append(KeepTogether(award))

    story.append(heading('Mathematics and AI projects'))
    blogs = [data['mathAiFeaturedPost']] if data.get('mathAiFeaturedPost') else []
    blogs.extend(data.get('mathAiAdditionalPosts', []))
    for blog in blogs:
        story.append(KeepTogether([
            p('<b>' + link(blog['title'], blog['url']) + '</b>'),
            p(esc(blog['subtitle']), SUBTITLE),
            p(esc(blog['description'])),
            Spacer(1, 9),
        ]))

    for item in data['mathAi']:
        lines = []
        if item.get('authors'):
            lines.append(esc(item['authors']) + '.')
        lines.append(esc(item['description']))
        if item.get('links'):
            lines.append(' &nbsp; | &nbsp; '.join(link(x['label'], x['url']) for x in item['links']))
        story.append(KeepTogether([p('<b>' + link(item['title'], item['url']) + '</b>')] + [p(line) for line in lines] + [Spacer(1, 9)]))

    if data.get('mathAiOngoing'):
        story.append(heading('Ongoing work'))
        paragraphs = [
            ''.join(link(part['text'], part['href']) if part.get('href') else esc(part['text']) for part in item['parts'])
            for item in data['mathAiOngoing']
        ]
        story.append(p(' '.join(paragraphs)))
        story.append(Spacer(1, 9))

    patent = data['patent']
    story.append(KeepTogether([heading('Patent'), p('<b>' + esc(patent['title']) + '</b>'), p('Patent record: ' + esc(patent['number']) + '.'), Spacer(1, 4)]))

    story.append(heading('Relevant coursework'))
    story.append(p('; '.join(esc(course) for course in data['courses']) + '.'))
    output.parent.mkdir(parents=True, exist_ok=True)
    CVDocument(str(output), profile).build(story)

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--data', type=Path, default=Path('content/academic-profile.json'))
    parser.add_argument('--output', type=Path, default=Path('output/pdf/durgesh-kumar-cv.pdf'))
    args = parser.parse_args()
    with args.data.open(encoding='utf-8') as handle:
        data = json.load(handle)
    build(data, args.output)
    print(args.output.resolve())

if __name__ == '__main__':
    main()
