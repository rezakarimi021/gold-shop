# Performance UI Skill

# Purpose

You are responsible for building interfaces that feel instant.

Performance is part of the user experience.

A beautiful interface that feels slow is a bad interface.

Every interaction should feel responsive, fluid and effortless.

---

# Philosophy

Users should never wait unless absolutely necessary.

The interface should always provide immediate feedback.

Perceived performance is just as important as actual performance.

---

# Core Principles

Prioritize:

Fast loading

Fast rendering

Fast interaction

Fast navigation

Fast feedback

Every millisecond matters.

---

# Loading Experience

Users should immediately see something useful.

Prefer:

Skeleton screens

Progressive rendering

Content placeholders

Avoid blank pages.

Avoid blocking loaders.

---

# Skeleton Loading

Skeletons should resemble the final layout.

Maintain spacing.

Avoid flashy shimmer effects.

Remove skeletons immediately after content loads.

---

# Images

Use responsive image sizes.

Compress images appropriately.

Prefer modern image formats.

Lazy-load below-the-fold images.

Always define width and height to prevent layout shift.

---

# Layout Stability

Avoid unexpected layout shifts.

Reserve space before content loads.

Buttons should never move while loading.

Images should never push content downward.

---

# Fonts

Load fonts efficiently.

Limit the number of font families.

Limit the number of font weights.

Prefer system fallback fonts while custom fonts load.

Avoid invisible text during loading.

---

# Animations

Only animate:

Opacity

Transform

Never animate expensive layout properties.

Animations should remain smooth even on low-end devices.

---

# Components

Build lightweight components.

Avoid unnecessary nesting.

Avoid duplicated logic.

Reuse components whenever possible.

---

# Rendering

Avoid unnecessary re-renders.

Keep state localized.

Render only what changes.

Avoid expensive computations during rendering.

---

# Lists

Large lists should support:

Pagination

Infinite scrolling

Virtualization (when appropriate)

Never render thousands of items at once.

---

# Product Grids

Optimize product cards.

Lazy-load images.

Avoid excessive hover effects.

Maintain consistent card heights.

---

# Navigation

Navigation should feel instant.

Avoid full page reloads.

Preserve scroll position when appropriate.

---

# Search

Search should respond quickly.

Debounce user input.

Display loading feedback.

Show empty states immediately.

---

# Forms

Validate efficiently.

Avoid unnecessary network requests.

Prevent duplicate submissions.

Preserve user input after validation errors.

---

# Modals

Open immediately.

Load heavy content only when needed.

Avoid blocking the main thread.

---

# Icons

Use optimized SVG icons.

Avoid loading large icon libraries unnecessarily.

Maintain consistent sizing.

---

# Shadows

Use subtle shadows.

Avoid heavy blur values.

Too many shadows increase rendering cost.

---

# Gradients

Keep gradients simple.

Avoid multiple layered gradients.

---

# JavaScript

Do not use JavaScript when CSS can achieve the same result.

Avoid unnecessary event listeners.

Remove unused code.

---

# CSS

Prefer modern CSS features.

Avoid deeply nested selectors.

Reduce unused styles.

Keep class names consistent.

---

# Network

Minimize requests.

Combine assets where appropriate.

Cache static resources.

Lazy-load non-critical resources.

---

# Mobile Performance

Optimize for slower devices.

Reduce animation complexity.

Minimize image sizes.

Avoid unnecessary background videos.

Maintain smooth scrolling.

---

# Accessibility & Performance

Fast interfaces improve accessibility.

Do not sacrifice accessibility for speed.

Both are mandatory.

---

# Performance Budget

Every page should be mindful of:

Image size

JavaScript size

CSS size

Font size

Network requests

DOM complexity

---

# Feedback

Every user action should receive immediate visual feedback.

Buttons

Forms

Filters

Cart actions

Wishlist

Search

Never leave users wondering if something happened.

---

# Error Recovery

If something fails:

Explain the problem.

Allow retry.

Preserve user data.

Never leave users at a dead end.

---

# Monitoring Mindset

When designing, always ask:

Can this component be lighter?

Can this interaction be faster?

Can this animation be simpler?

Can this asset be optimized?

Performance is a continuous process.

---

# Things To Avoid

Never:

Load massive images

Autoplay heavy videos

Use unnecessary carousels

Overuse animations

Block rendering

Create layout shifts

Render hidden content unnecessarily

Duplicate components

Overcomplicate the interface

Ignore mobile performance

---

# Final Validation

Before approving any UI ask:

Does the page feel instant?

Can users interact immediately?

Is loading graceful?

Is scrolling smooth?

Are animations fluid?

Is every asset optimized?

Can this experience be made even faster?

If the answer is yes, optimize it.

Goal:

Every interface should feel premium not only because it looks beautiful, but because it responds immediately, loads quickly and remains smooth across all modern devices.
