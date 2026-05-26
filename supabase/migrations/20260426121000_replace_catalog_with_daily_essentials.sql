BEGIN;

-- Replace existing storefront catalog with requested grocery-focused inventory.
DELETE FROM public.products;
DELETE FROM public.categories;

WITH inserted_categories AS (
  INSERT INTO public.categories (name, slug, image_url)
  VALUES
    ('Chocolates', 'chocolates', NULL),
    ('Biscuits', 'biscuits', NULL),
    ('Daily Cooking Essentials', 'daily-cooking-essentials', NULL),
    ('Rice Bags', 'rice-bags', NULL),
    ('Garam Masalas', 'garam-masalas', NULL)
  RETURNING id, slug
)
INSERT INTO public.products (
  name,
  slug,
  description,
  price,
  stock,
  unit,
  image_url,
  category_id,
  is_active
)
SELECT
  p.name,
  p.slug,
  p.description,
  p.price,
  p.stock,
  p.unit,
  p.image_url,
  c.id,
  true
FROM (
  VALUES
    ('Cadbury Dairy Milk Silk', 'cadbury-dairy-milk-silk', 'Creamy milk chocolate bar.', 2.99::numeric, 120, 'bar', NULL, 'chocolates'),
    ('KitKat 4 Finger', 'kitkat-4-finger', 'Crispy wafer covered in milk chocolate.', 1.49::numeric, 160, 'pack', NULL, 'chocolates'),
    ('Oreo Original Biscuits', 'oreo-original-biscuits', 'Classic chocolate sandwich biscuits.', 1.99::numeric, 140, 'pack', NULL, 'biscuits'),
    ('Parle-G Glucose Biscuits', 'parle-g-glucose-biscuits', 'Popular daily tea-time biscuits.', 0.79::numeric, 220, 'pack', NULL, 'biscuits'),
    ('Sunflower Cooking Oil 1L', 'sunflower-cooking-oil-1l', 'Refined sunflower oil for daily cooking.', 3.49::numeric, 95, 'bottle', NULL, 'daily-cooking-essentials'),
    ('Toor Dal 1kg', 'toor-dal-1kg', 'Split pigeon peas for everyday meals.', 2.89::numeric, 110, 'pack', NULL, 'daily-cooking-essentials'),
    ('Basmati Rice Bag 5kg', 'basmati-rice-bag-5kg', 'Premium long-grain basmati rice.', 12.99::numeric, 80, 'bag', NULL, 'rice-bags'),
    ('Sona Masoori Rice Bag 10kg', 'sona-masoori-rice-bag-10kg', 'Lightweight rice for daily home cooking.', 18.49::numeric, 60, 'bag', NULL, 'rice-bags'),
    ('Garam Masala 100g', 'garam-masala-100g', 'Aromatic mixed spice blend.', 1.59::numeric, 180, 'pouch', NULL, 'garam-masalas'),
    ('Kitchen King Masala 100g', 'kitchen-king-masala-100g', 'Versatile masala blend for curries and gravies.', 1.69::numeric, 170, 'pouch', NULL, 'garam-masalas')
) AS p(name, slug, description, price, stock, unit, image_url, category_slug)
JOIN inserted_categories c ON c.slug = p.category_slug;

COMMIT;
