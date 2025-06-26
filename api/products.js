// /api/products.js
export default async function handler(req, res) {
  const { seller_id = '1393244', category_id = '', lang = 'ru', currency = 'USD' } = req.query;

  const apiKey = 'FDA3B085C9F54DF8AF5361209C233549';

  // Tạo sign từ params + key
  const crypto = await import('crypto');
  const base = `category_id${category_id}currency${currency}lang${lang}seller_id${seller_id}${apiKey}`;
  const sign = crypto.createHash('md5').update(base).digest('hex');

  const url = `https://api.digiseller.com/api/products?seller_id=${seller_id}&category_id=${category_id}&lang=${lang}&currency=${currency}&sign=${sign}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json);
  } catch (e) {
    res.status(500).json({ error: 'Lỗi proxy' });
  }
}
