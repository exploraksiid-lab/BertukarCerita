---
name: Neo-Cartoon Brutalist
colors:
  surface: '#fff8f7'
  surface-dim: '#e3d7d8'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fdf1f1'
  surface-container: '#f7ebec'
  surface-container-high: '#f1e5e6'
  surface-container-highest: '#ebe0e0'
  on-surface: '#201a1b'
  on-surface-variant: '#514345'
  inverse-surface: '#352f30'
  inverse-on-surface: '#faeeef'
  outline: '#837375'
  outline-variant: '#d6c2c4'
  surface-tint: '#864e5a'
  primary: '#864e5a'
  on-primary: '#ffffff'
  primary-container: '#ffb7c5'
  on-primary-container: '#7b4551'
  inverse-primary: '#fbb3c1'
  secondary: '#6a5f00'
  on-secondary: '#ffffff'
  secondary-container: '#fae100'
  on-secondary-container: '#6f6300'
  tertiary: '#a53b22'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffbaaa'
  on-tertiary-container: '#98321a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#fbb3c1'
  on-primary-fixed: '#360c19'
  on-primary-fixed-variant: '#6b3743'
  secondary-fixed: '#fde400'
  secondary-fixed-dim: '#dec800'
  on-secondary-fixed: '#201c00'
  on-secondary-fixed-variant: '#504700'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0700'
  on-tertiary-fixed-variant: '#84240d'
  background: '#fff8f7'
  on-background: '#201a1b'
  surface-variant: '#ebe0e0'
typography:
  display-lg:
    fontFamily: Nunito Sans
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Nunito Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.5'
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  asymmetric-offset: 12px
---

## Brand & Style

This design system blends the raw, high-contrast energy of **Neo-Brutalism** with a **Playful Cartoon** aesthetic. It is designed for high-engagement social platforms, dating apps, or creative tools that target Gen Z and young millennial audiences. The vibe is unapologetically bold, tactile, and expressive.

The visual language relies on thick "ink-like" strokes, vibrant pops of color, and high-contrast depth to create a physical, comic-book feel. It rejects subtle gradients and soft shadows in favor of hard edges and intentional asymmetry, evoking a sense of fun, spontaneity, and confidence.

## Colors

The palette is anchored by a warm, off-white background to prevent visual fatigue from the high-contrast black elements.

- **Primary (Soft Pink):** Used for large surfaces, primary actions, and hero sections. It provides a soft, approachable counterpoint to the aggressive black borders.
- **Active Interaction (Yellow):** Reserved for hover states, selections, and secondary highlights. It represents high-energy feedback.
- **Accents:** A tertiary orange-coral is used sparingly for special high-priority interactions like "Spin" or "Win" states.
- **Neutral:** Pure black (#000000) is the structural backbone, used for all borders, shadows, and primary text to maintain maximum "cartoon" legibility.

## Typography

The design system uses **Nunito Sans** for its rounded terminals and friendly, approachable geometry. 

- **Weight as Hierarchy:** Use Black (900) and ExtraBold (800) for headlines to match the weight of the 4px borders. 
- **Character:** Headlines should feel thick and impactful. For specific "Display" moments, a slight negative letter-spacing enhances the tight, comic-book aesthetic.
- **Legibility:** Body text remains thick (SemiBold or Bold) to ensure it isn't "lost" against the strong structural lines of the UI.

## Layout & Spacing

The layout philosophy is a **Fixed-Fluid Hybrid** using an 8-column or 12-column grid, but with a twist of **Asymmetry**.

- **Asymmetric Columns:** On desktop, use uneven column distributions (e.g., a 4-column sidebar with an 8-column main area) to create visual tension.
- **The 4px Rule:** All spacing should be multiples of 4px to align with the border width.
- **Rhythm:** Use large gutters (24px+) to give elements "breathing room" amidst the heavy shadows. Elements should feel like they are floating on top of the background.
- **Reflow:** On mobile, components stack vertically into a single column, maintaining 16px side margins and consistent 4px borders.

## Elevation & Depth

This system ignores physical light source logic. Depth is conveyed through **Hard Shadowing**:

- **Shadow Style:** Use a 6px offset (x: 6px, y: 6px) with 0 blur and 100% opacity (#000000). 
- **Layering:** Elements do not "hover" with soft shadows. Instead, they "lift" by increasing the offset of the hard shadow.
- **Interactions:** When a user clicks/presses an element, the shadow offset should decrease to 2px or 0px, and the element should translate (move) diagonally to meet the shadow, simulating a physical "push."

## Shapes

The shape language is **Softly Squared**. 

While the aesthetic is "Brutalist," the "Cartoon" influence requires rounded corners to keep the UI feeling safe and playful. All containers, buttons, and input fields utilize a 0.5rem (8px) base radius. This prevents the design from feeling too aggressive or "sharp," maintaining the friendly brand personality.

## Components

### Buttons
- **Base:** 4px solid black border, 6px hard black shadow.
- **Primary:** Pink background with black text.
- **Secondary:** White background with black text.
- **Hover/Active:** Background changes to Yellow; shadow remains hard but the button shifts 2px towards it.

### Cards & Containers
- **Styling:** White or Soft Pink background.
- **Border:** Always 4px solid black.
- **Shadow:** 6px hard black shadow for interactive cards; 4px or no shadow for static informational sections.

### Input Fields
- **Styling:** White background, 4px black border. 
- **Focus State:** Border remains black, but a 4px Yellow "glow" (hard offset) appears behind the field. 
- **Placeholder:** Muted Gray (#7F7F7F).

### Chips/Tags
- Small, pill-shaped or rounded-rect containers with 2px borders. Use Primary Pink or Active Yellow to denote categories.

### Checkboxes & Radios
- Oversized (24px) with thick 4px borders. Checked state uses a bold Black checkmark or dot against the Yellow interaction color.