Nicholas Benson
# Style Guide Based on Root CSS Variables

## Color Palette

### Base Colors
- **Primary Color (`--primary_color`)**: `#007A33` - A rich green that serves as the main brand color
- **Secondary Dark (`--secondary_dark`)**: `#005626` - A darker green for depth and contrast
- **Primary Light (`--primary_light`)**: `#4DC98C` - A lighter green for subtle highlights
- **Primary Soft (`--primary_soft`)**: `#E6F4EC` - An ultra-light green for backgrounds and soft elements

### Accent Colors
- **Accent Color (`--accent_color`)**: `#B8FDD7` - A bright mint green for emphasis and highlights
- **Hover Color (`--hover_color`)**: `#00994d` - A vibrant green for hover states

### Neutrals
- **White (`--white_color`)**: `#F6FFFA` - Off-white with a slight green tint
- **Black (`--black_color`)**: `#1F1F1F` - Soft black for text
- **Neutral Gray (`--neutral_gray`)**: `#9CA3AF` - Mid-tone gray for secondary text

### Status Colors
- **Success (`--success-color`)**: `#16A34A` - Green for positive actions/states
- **Danger (`--danger-color`)**: `#D32F2F` - Red for errors/warnings
- **Warning (`--warning-color`)**: `#F59E0B` - Amber for caution states

## Spacing System

| Variable | Value | Use Case |
|----------|-------|----------|
| `--space-xs` | 0.25rem (4px) | Tiny spacing, icon padding |
| `--space-sm` | 0.5rem (8px) | Small gaps, button padding |
| `--space-md` | 1rem (16px) | Standard spacing, paragraph margins |
| `--space-lg` | 2rem (32px) | Section spacing, large margins |

## Typography

### Font Sizes
- **Small (`--font-sm`)**: 0.875rem (14px) - Small text, captions
- **Medium (`--font-md`)**: 1rem (16px) - Body text
- **Large (`--font-lg`)**: 1.25rem (20px) - Subheadings
- **Extra Large (`--font-xl`)**: 1.5rem (24px) - Headings

### Font Weights
- **Light (`--font-light`)**: 300
- **Regular (`--font-regular`)**: 500
- **Bold (`--font-bold`)**: 700

## Borders & Radius

| Variable | Value | Use Case |
|----------|-------|----------|
| `--radius-sm` | 4px | Buttons, small components |
| `--radius-md` | 8px | Cards, medium components |
| `--radius-lg` | 16px | Modals, large components |

## Shadows

| Variable | Value | Use Case |
|----------|-------|----------|
| `--shadow-sm` | 0 1px 3px rgba(0, 0, 0, 0.1) | Subtle elevation |
| `--shadow-md` | 0 4px 6px rgba(0, 0, 0, 0.1) | Cards, dropdown menus |
| `--shadow-lg` | 0 10px 20px rgba(0, 0, 0, 0.15) | Modals, prominent elements |

## Transitions
- **Standard Transition (`--transition`)**: all 0.3s ease-in-out

## CSS Comment Guide

Your CSS includes a helpful commenting system:
- `/* *======== Sections =========== */` - Major sections
- `/* ? ------- Sub-sections -------- */` - Sub-sections
- `/* & ++++++++ more details ++++++++ */` - Additional details
- `/* !!!!!! Handle with care !!!!!!! */` - Warning for sensitive code
- `/* ^^^^^^^^^ Optional Section ^^^^^^ */` - Optional sections
- `/* explanation */` - General explanations
