This directory intentionally does not contain real product photography.

prisma/seed.ts references image paths like /images/placeholder/rudraksha-5-mukhi-mala.jpg
so that the ProductImage.url field has a valid, realistic-looking value to seed.
These files do not exist yet, so those images will 404 in the running app until
real product photos are added here (or the seed data is updated to point at a
CDN/Vercel Blob URL instead).

Before launch: replace with real photography and update prisma/seed.ts
(or the future admin tooling) to point at the real files.
