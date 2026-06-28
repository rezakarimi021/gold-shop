# Accessibility Skill

# Purpose

You are responsible for making every part of the interface usable by everyone.

Accessibility is not an optional feature.

Accessibility is a core requirement of quality.

Every page, component and interaction must remain usable regardless of ability, device or input method.

Luxury means inclusive.

---

# Philosophy

Beautiful interfaces should also be usable.

Never sacrifice usability for aesthetics.

A premium experience is an accessible experience.

---

# Core Principles

Every interface must be:

Perceivable

Operable

Understandable

Robust

If any of these fail, the interface is incomplete.

---

# Semantic HTML

Always prefer semantic HTML.

Use:

header

nav

main

section

article

aside

footer

button

label

form

dialog

table

Avoid replacing semantic elements with generic divs.

---

# Heading Structure

Only one H1 per page.

Follow logical hierarchy.

Never skip heading levels without reason.

Screen readers depend on structure.

---

# Keyboard Navigation

Everything must be usable with a keyboard.

Users must be able to:

Navigate

Open menus

Close dialogs

Submit forms

Switch tabs

Select options

Never trap keyboard focus.

---

# Focus States

Every interactive element must have a visible focus state.

Focus indicators must:

Be obvious

Maintain contrast

Match the design system

Never remove outlines without replacing them.

---

# Contrast

Text must always remain readable.

Buttons must stand out.

Links must be distinguishable.

Avoid relying on subtle color differences.

---

# Color Independence

Never communicate information using only color.

Combine color with:

Icons

Labels

Patterns

Text

Status indicators

Example:

Error

❌ Icon

-

Red Color

-

Message

Not red alone.

---

# Images

Every meaningful image requires descriptive alt text.

Decorative images should use empty alt attributes.

Never repeat nearby text.

Describe purpose rather than appearance.

---

# Icons

Icons should not communicate meaning alone.

Whenever necessary provide text labels.

---

# Links

Every link should explain its destination.

Avoid:

Click Here

Read More

Use:

View Gold Collection

Track Order

Contact Support

---

# Buttons

Buttons should describe actions.

Examples:

Add To Cart

Save Changes

Continue Checkout

Avoid:

OK

Submit

Next

When better wording is possible.

---

# Forms

Every input requires:

Visible label

Helper text if needed

Accessible error messages

Proper autocomplete

Associated label element

Never hide labels.

---

# Error Messages

Errors should:

Explain the problem

Explain how to fix it

Remain visible

Be announced to assistive technologies

Never rely on color only.

---

# Success Messages

Users should receive confirmation after successful actions.

Announcements should be accessible.

---

# Tables

Use table headers.

Avoid tables for layout.

Support responsive behavior.

---

# Dialogs

Dialogs must:

Trap focus

Restore focus when closed

Support Escape key

Have accessible titles

Never surprise users.

---

# Motion

Respect reduced motion preferences.

Disable decorative animations when requested by the operating system.

Never force animation.

---

# Timing

Never force users to complete tasks within unreasonable time limits.

Warn before sessions expire.

---

# Responsive Accessibility

Touch targets should remain large enough.

Text should not become unreadable.

Scrolling should remain predictable.

---

# Screen Readers

Every interactive control should have an accessible name.

ARIA should enhance—not replace—semantic HTML.

Do not overuse ARIA.

Use native HTML whenever possible.

---

# Language

Use clear language.

Avoid unnecessary jargon.

Write concise instructions.

Microcopy should reduce confusion.

---

# Error Prevention

Prevent mistakes whenever possible.

Examples:

Input masks

Validation

Confirmation before destructive actions

Autosave

Smart defaults

---

# Notifications

Notifications should:

Be readable

Remain long enough

Not interrupt important tasks

Be announced when necessary

---

# Media

Videos should support captions.

Audio should have transcripts when appropriate.

Never autoplay with sound.

---

# Performance & Accessibility

Fast pages improve accessibility.

Slow interfaces create barriers.

Optimize loading.

Avoid layout shifts.

Maintain stable interactions.

---

# Testing Checklist

Verify with:

Keyboard only

Screen reader

Zoom to 200%

High contrast mode

Small screens

Large screens

Reduced motion enabled

---

# Never Do

Never:

Remove focus outlines

Use inaccessible color contrast

Hide labels

Use tiny tap targets

Depend only on hover

Communicate only with color

Trap keyboard focus

Autoplay audio

Flash content

Create inaccessible custom controls

---

# Final Validation

Before approving any UI ask:

Can it be used without a mouse?

Can a screen reader understand it?

Are all controls labeled?

Is the contrast sufficient?

Can users recover from mistakes?

Would every customer be able to complete the task?

If not, improve it.

Goal:

Accessibility should be invisible to most users, but invaluable to those who depend on it. Every interface should be inclusive without compromising the premium visual experience.
