import { dbStore } from '../data/store.js';
import { v4 as uuidv4 } from 'uuid';

export const getProducts = (req, res) => {
  res.json({ success: true, count: dbStore.products.length, data: dbStore.products });
};

export const createProduct = (req, res) => {
  const { name, network, affiliateUrl, commissionRate, price, category, targetAudience, approvedClaims, forbiddenClaims } = req.body;
  if (!name || !affiliateUrl) {
    return res.status(400).json({ success: false, message: 'Name and Affiliate URL are required.' });
  }

  const newProduct = {
    id: `prod_${uuidv4().slice(0, 8)}`,
    name,
    network: network || 'Custom Affiliate',
    affiliateUrl,
    commissionRate: commissionRate || '25% Recurring',
    price: price || '$29',
    epc: '$1.75',
    category: category || 'Productivity & AI',
    rating: 4.8,
    targetAudience: targetAudience || 'Digital professionals & content creators',
    approvedClaims: approvedClaims || [name + ' streamlines repetitive digital workflows.'],
    forbiddenClaims: forbiddenClaims || ['Guaranteed overnight fortune'],
    status: 'active'
  };

  dbStore.products.unshift(newProduct);
  dbStore.addAuditLog('Admin (Supervisor)', 'PRODUCT_ADDED', `Added affiliate product: ${name}`);
  res.status(201).json({ success: true, data: newProduct });
};
