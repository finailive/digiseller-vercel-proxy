import { parseStringPromise } from 'xml2js';

export default async function handler(req, res) {
  const sellerId = req.query.seller_id || '1393244';
  const start = req.query.start || 0;
  const pagesize = req.query.pagesize || 20;

  const url = `https://plati.market/asp/XML/browse.asp?seller_id=${sellerId}&start=${start}&pagesize=${pagesize}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Lỗi tải dữ liệu');

    const xml = await response.text();
    const json = await parseStringPromise(xml, { explicitArray: false });

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(json);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi proxy', detail: err.message });
  }
}
