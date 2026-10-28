-- Seed event_templates (9 template) — jalankan di Supabase SQL Editor.
-- Kebutuhan teknis: Template & Publikasi menyimpan UUID pada events.template_id (FK),
-- sementara registry invitation-engine beralamat dengan slug.
-- (Bukan pengubahan struktur; hanya data awal sesuai schema.sql yang ada.)

INSERT INTO event_templates (name, slug, category, preview_image, active) VALUES
  ('Heritage Aruna', 'heritage-aruna', 'heritage', '/templates/heritage-aruna/screenshots/full-page.png', true),
  ('Heritage Sandhayu', 'heritage-sandhayu', 'heritage', '/templates/heritage-sandhayu/screenshots/full-page.png', true),
  ('Heritage Utary', 'heritage-utary', 'heritage', '/templates/heritage-utary/screenshots/full-page.png', true),
  ('Premium 01', 'premium-01', 'premium', '/templates/premium-01/screenshots/full-page.png', true),
  ('Premium 02', 'premium-02', 'premium', '/templates/premium-02/screenshots/full-page.png', true),
  ('Premium Danila', 'premium-danila', 'premium', '/templates/premium-danila/screenshots/full-page.png', true),
  ('Premium Flara', 'premium-flara', 'premium', '/templates/premium-flara/screenshots/full-page.png', true),
  ('Premium Ivanna', 'premium-ivanna', 'premium', '/templates/premium-ivanna/screenshots/full-page.png', true),
  ('Premium Kila', 'premium-kila', 'premium', '/templates/premium-kila/screenshots/full-page.png', true)
ON CONFLICT (slug) DO NOTHING;
