# HealthLife Metrics · Clinical Science

The approved homepage is the visual reference. All pages load `design-system.css` followed by `interior-system.css` for interior layouts. Page-specific CSS retains only the geometry and behavior needed for its research content.

## Tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--ds-bg` | `#000000` | Page background |
| `--ds-surface` | `#0B0B0B` | Content panels |
| `--ds-surface-raised` | `#111111` | Secondary surfaces |
| `--ds-text` | `#FFFFFF` | Headings and primary text |
| `--ds-muted` | `#DEDEDE` | Supporting text |
| `--ds-accent` | `#69DDF2` | Links, bullets and primary actions |
| `--ds-on-accent` | `#000000` | Text on cyan buttons |
| `--ds-border` | `#303030` | Structural boundaries |
| `--ds-width` | `1120px` | Maximum content width |
| `--ds-gutter` | `clamp(24px, 6vw, 88px)` | Page margins |
| `--ds-radius` | `8px` | Content panels |

Space Grotesk is used for headings; IBM Plex Sans for body text, controls and navigation. Use weights 400 and 500. Keep chart palettes and original research images when they encode evidence; never recolor chart marks without checking their legends and labels.

## Shared components

- Full navigation: six original service links and Get a quote, visible without a dropdown
- Centered homepage hero; left-aligned interior-page titles
- Dark content panels with consistent spacing and white headings
- Cyan bullet lists and links
- Cyan primary button with black text
- Shared footer and form controls
- Responsive layouts that stack at 900px and 520px

## Change rules

Update shared styles before adding a page-specific override. Preserve URLs, canonical tags, structured data, research text, downloads, chart data, anchor IDs and scripts. The legacy Patient/HCP URL remains a redirect. Only email is required on inquiry forms. Marketing consent remains optional.
