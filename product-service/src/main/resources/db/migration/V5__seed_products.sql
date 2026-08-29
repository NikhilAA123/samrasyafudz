INSERT INTO products (name, category_id, created_at, updated_at) VALUES
                                                                     ('Sunflower Seeds',     (SELECT id FROM categories WHERE name = 'Oil Seeds'),      now(), now()),
                                                                     ('Pumpkin Seeds',       (SELECT id FROM categories WHERE name = 'Oil Seeds'),      now(), now()),
                                                                     ('Melon Seeds',         (SELECT id FROM categories WHERE name = 'Oil Seeds'),      now(), now()),
                                                                     ('Watermelon Seeds',    (SELECT id FROM categories WHERE name = 'Oil Seeds'),      now(), now()),
                                                                     ('Chia Seeds',          (SELECT id FROM categories WHERE name = 'Nutrient Seeds'), now(), now()),
                                                                     ('Flax Seeds (Alsi)',   (SELECT id FROM categories WHERE name = 'Nutrient Seeds'), now(), now()),
                                                                     ('Almonds',             (SELECT id FROM categories WHERE name = 'Nuts'),           now(), now()),
                                                                     ('Cashew (Kaju)',       (SELECT id FROM categories WHERE name = 'Nuts'),           now(), now()),
                                                                     ('Pistachio',           (SELECT id FROM categories WHERE name = 'Nuts'),           now(), now()),
                                                                     ('Raisins (Kishmish)',  (SELECT id FROM categories WHERE name = 'Dried Fruits'),   now(), now()),
                                                                     ('Anjeer (Fig)',        (SELECT id FROM categories WHERE name = 'Dried Fruits'),   now(), now()),
                                                                     ('Makhana (Fox Nuts)',  (SELECT id FROM categories WHERE name = 'Dried Fruits'),   now(), now()),
                                                                     ('Mixed Seeds',         (SELECT id FROM categories WHERE name = 'Mixed Seeds'),    now(), now());