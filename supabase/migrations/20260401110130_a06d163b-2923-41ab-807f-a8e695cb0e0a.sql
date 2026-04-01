
-- Drop existing insert policies
DROP POLICY "Anyone can place orders" ON public.orders;
DROP POLICY "Anyone can insert order items" ON public.order_items;

-- Recreate with correct roles
CREATE POLICY "Anyone can place orders"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can insert order items"
  ON public.order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
