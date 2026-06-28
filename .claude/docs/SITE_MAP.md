# Site Map

Project: Gold Shop

Version: 1.0

Status: Approved

---

# 1. Information Architecture

The website follows a simple, premium and scalable hierarchy.

Navigation should never overwhelm users.

The primary navigation should remain consistent across all pages.

The website structure should prioritize product discovery.

---

# 2. Primary Navigation

Home

Collections

Products

Best Sellers

New Arrivals

Blog

About

Contact

Search

Wishlist

Cart

Account

---

# 3. Public Pages

/

Homepage

---

/collections

All Collections

---

/collections/[slug]

Collection Details

---

/categories

All Categories

---

/categories/[slug]

Category Products

---

/products

All Products

---

/products/[slug]

Single Product Page

---

/search

Search Results

---

/wishlist

Wishlist

---

/cart

Shopping Cart

---

/checkout

Checkout

---

/checkout/success

Successful Payment

---

/about

About Brand

---

/contact

Contact Page

---

/faq

Frequently Asked Questions

---

/blog

Blog Homepage

---

/blog/[slug]

Article Page

---

/privacy

Privacy Policy

---

/terms

Terms of Service

---

/shipping

Shipping Policy

---

/returns

Return Policy

---

# 4. Authentication Pages

/login

Register

Forgot Password

Reset Password

Email Verification (future)

Phone Verification (future)

---

# 5. User Dashboard

/profile

User Dashboard

---

/profile/orders

Orders

---

/profile/orders/[id]

Order Details

---

/profile/wishlist

Wishlist

---

/profile/addresses

Addresses

---

/profile/settings

Settings

---

/profile/security

Security

---

/profile/notifications

Notifications

---

# 6. System Pages

/404

Not Found

---

/500

Server Error

---

/maintenance

Maintenance Mode

---

/offline

Offline Page (Future)

---

# 7. Future Admin Pages

/admin

Dashboard

---

/admin/products

---

/admin/orders

---

/admin/customers

---

/admin/blog

---

/admin/categories

---

/admin/reviews

---

/admin/settings

---

/admin/analytics

---

## These pages are outside Version 1 but the architecture must support them.

# 8. URL Design Principles

Every URL must follow these principles:

- Short
- Readable
- SEO Friendly
- Human Friendly
- Predictable
- Lowercase
- Hyphen Separated
- Stable

Never expose database IDs in URLs.

Always prefer slugs.

Example:

Good

/products/18k-gold-ring

Bad

/products?id=123

Bad

/product/123456789

---

# 9. URL Naming Rules

Always use:

kebab-case

Examples:

gold-necklace

rose-gold-ring

diamond-earrings

Never use:

CamelCase

snake_case

Spaces

Uppercase URLs

---

# 10. Dynamic Routes

Dynamic routes should include:

/products/[slug]

/collections/[slug]

/categories/[slug]

/blog/[slug]

/profile/orders/[id]

Future:

/brands/[slug]

/designers/[slug]

---

# 11. Route Groups (Next.js)

Organize the App Router using route groups.

Recommended structure:

(app)

(marketing)

(shop)

(account)

(auth)

(admin-future)

Route groups improve maintainability without affecting URLs.

---

# 12. App Router Folder Structure

Recommended structure:

app/

(layout)

(marketing)

(shop)

(account)

(auth)

api/

Each route should have:

page.tsx

loading.tsx

error.tsx

When needed:

not-found.tsx

template.tsx

route.ts

---

# 13. Loading Pages

Every important page should support loading states.

Required pages:

Homepage

Products

Product Details

Collections

Checkout

Profile

Blog

Loading UI should use skeleton components.

Avoid fullscreen spinners whenever possible.

---

# 14. Error Pages

Every major route should have:

Graceful error handling

Retry option

Helpful explanation

Navigation back to safety

Never expose technical errors to users.

---

# 15. Not Found Strategy

Unknown routes should:

Display premium 404 page.

Provide navigation back to:

Homepage

Products

Collections

Search

Never leave users trapped.

---

# 16. Navigation Hierarchy

Primary Navigation

↓

Homepage

Products

Collections

Best Sellers

New Arrivals

Blog

About

Contact

Secondary Navigation

↓

Search

Wishlist

Cart

Account

Footer Navigation

↓

Privacy

Terms

Shipping

Returns

FAQ

Support

---

# 17. Breadcrumb Strategy

Every internal page should support breadcrumbs.

Examples:

Home

↓

Collections

↓

Wedding Collection

or

Home

↓

Products

↓

Gold Ring

Breadcrumbs improve:

Navigation

SEO

User orientation

---

# 18. Internal Linking Strategy

Every page should naturally link to:

Related products

Related collections

Related blog articles

Categories

Support pages

Never create dead ends.

Every page should encourage exploration.

---

# 19. Search Index Strategy

Search should include:

Products

Collections

Categories

Blog Articles

Search should prioritize products.

Autocomplete should suggest:

Popular searches

Recent searches

Matching products

## Matching collections

# 20. User Navigation Flows

The application should encourage smooth and predictable navigation.

Primary shopping flow:

Home

↓

Collections

↓

Category

↓

Product Details

↓

Add To Cart

↓

Shopping Cart

↓

Checkout

↓

Payment

↓

Order Success

---

Alternative flow:

Home

↓

Search

↓

Search Results

↓

Product Details

↓

Wishlist

↓

Cart

↓

Checkout

---

Content discovery flow:

Home

↓

Blog

↓

Article

↓

Related Products

↓

Product Details

---

Customer support flow:

Home

↓

FAQ

↓

Contact

↓

Support

---

# 21. Mobile Navigation

Mobile navigation should prioritize simplicity.

Bottom navigation should include:

Home

Search

Wishlist

Cart

Profile

Primary menu should include:

Collections

Products

Blog

About

Contact

Large touch targets are required.

Avoid deep nested menus.

---

# 22. Footer Structure

Footer should contain:

Company

About

Contact

Careers (Future)

Blog

Shopping

Collections

Categories

Gift Cards (Future)

Customer Service

Shipping

Returns

FAQ

Support

Legal

Privacy Policy

Terms

Cookies (Future)

Newsletter

Social Media

Copyright

Trust Badges

---

# 23. Search Flow

Search should support:

Instant suggestions

Recent searches

Popular searches

Search history (optional)

Product suggestions

Collection suggestions

Blog suggestions

Empty search guidance

Search should never block navigation.

---

# 24. Checkout Flow

Recommended checkout steps:

Cart

↓

Shipping Information

↓

Billing Information

↓

Payment Method

↓

Order Review

↓

Confirmation

Users should always know:

Current step

Remaining steps

Order summary

Total price

Shipping cost

---

# 25. Authentication Flow

Guest

↓

Login / Register

↓

Verification (Future)

↓

Profile

↓

Shopping

↓

Checkout

↓

Orders

Authentication should never interrupt browsing unnecessarily.

---

# 26. Protected Routes

Authentication required:

/profile

/profile/orders

/profile/settings

/profile/security

/profile/notifications

Future:

/admin/\*

Guests attempting to access protected routes should be redirected to Login and then returned to their original destination after successful authentication.

---

# 27. Redirect Strategy

Examples:

Old URLs

↓

301 Redirect

↓

New URLs

Broken links

↓

404 Page

Successful login

↓

Return to previous destination

Successful checkout

↓

Order Success

↓

Continue Shopping

---

# 28. SEO Crawl Strategy

Search engines should be able to crawl:

Homepage

Collections

Categories

Products

Blog

About

Contact

FAQ

The following pages should generally not be indexed:

Cart

Checkout

Profile

Authentication pages

Order pages

Admin pages

---

# 29. URL Growth Strategy

The URL structure should remain stable as the platform grows.

Future URLs may include:

/brands/[slug]

/designers/[slug]

/campaigns/[slug]

/lookbook

/gift-guide

/store-locator

/compare

/price-history

The architecture should support expansion without breaking existing URLs.

---

# 30. Final Navigation Principles

Every page should answer:

Where am I?

Where can I go next?

How do I return?

Navigation should always feel effortless.

Users should never feel lost.

Every important page should link naturally to related content.

Every route should contribute to SEO, usability and business goals.

---

# Final Statement

The site structure of Gold Shop is designed to support a premium luxury e-commerce experience.

The routing architecture must remain:

Simple

Scalable

SEO Friendly

Maintainable

Predictable

Accessible

Future Ready

When uncertainty exists, choose the structure that improves long-term maintainability, user experience and discoverability.
