INSERT INTO product_variants (product_id, weight_grams, price, stock_quantity) VALUES
                                                                                   -- Sunflower Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Sunflower Seeds'), 200, 132, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Sunflower Seeds'), 400, 216, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Sunflower Seeds'), 500, 262, 50),

                                                                                   -- Pumpkin Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Pumpkin Seeds'), 200, 151, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Pumpkin Seeds'), 400, 254, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Pumpkin Seeds'), 500, 309, 50),

                                                                                   -- Melon Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Melon Seeds'), 200, 146, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Melon Seeds'), 400, 243, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Melon Seeds'), 500, 296, 50),

                                                                                   -- Watermelon Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Watermelon Seeds'), 200, 138, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Watermelon Seeds'), 400, 227, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Watermelon Seeds'), 500, 275, 50),

                                                                                   -- Chia Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Chia Seeds'), 200, 143, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Chia Seeds'), 400, 238, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Chia Seeds'), 500, 289, 50),

                                                                                   -- Flax Seeds (Alsi)
                                                                                   ((SELECT id FROM products WHERE name = 'Flax Seeds (Alsi)'), 200, 105, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Flax Seeds (Alsi)'), 400, 162, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Flax Seeds (Alsi)'), 500, 194, 50),

                                                                                   -- Almonds
                                                                                   ((SELECT id FROM products WHERE name = 'Almonds'), 200, 273, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Almonds'), 400, 497, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Almonds'), 500, 613, 50),

                                                                                   -- Cashew (Kaju)
                                                                                   ((SELECT id FROM products WHERE name = 'Cashew (Kaju)'), 200, 205, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Cashew (Kaju)'), 400, 362, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Cashew (Kaju)'), 500, 444, 50),

                                                                                   -- Pistachio
                                                                                   ((SELECT id FROM products WHERE name = 'Pistachio'), 200, 367, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Pistachio'), 400, 686, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Pistachio'), 500, 849, 50),

                                                                                   -- Raisins (Kishmish)
                                                                                   ((SELECT id FROM products WHERE name = 'Raisins (Kishmish)'), 200, 132, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Raisins (Kishmish)'), 400, 216, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Raisins (Kishmish)'), 500, 262, 50),

                                                                                   -- Anjeer (Fig)
                                                                                   ((SELECT id FROM products WHERE name = 'Anjeer (Fig)'), 200, 178, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Anjeer (Fig)'), 400, 308, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Anjeer (Fig)'), 500, 377, 50),

                                                                                   -- Makhana (Fox Nuts)
                                                                                   ((SELECT id FROM products WHERE name = 'Makhana (Fox Nuts)'), 200, 159, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Makhana (Fox Nuts)'), 400, 270, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Makhana (Fox Nuts)'), 500, 329, 50),

                                                                                   -- Mixed Seeds
                                                                                   ((SELECT id FROM products WHERE name = 'Mixed Seeds'), 200, 132, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Mixed Seeds'), 400, 216, 50),
                                                                                   ((SELECT id FROM products WHERE name = 'Mixed Seeds'), 500, 262, 50);