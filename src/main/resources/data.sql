INSERT INTO industry (id, industry_name) VALUES
(1, 'Restaurant'),
(2, 'Medical Centre / Medical Practice');

INSERT INTO insurance (id, insurance_name, insurance_type) VALUES
(1, 'Public Liability', 'Liability'),
(2, 'Property / Business Package', 'Property'),
(3, 'Professional Indemnity', 'Professional Lines'),
(4, 'Liability', 'Liability');

INSERT INTO underwriter (id, name, contact_person, email, phone, web, address) VALUES
(1, 'Better Broker', 'Chris Varkoly', 'chris@betterbroker.net.au', '1300 153 439', 'www.betterbroker.net.au', 'Brisbane'),
(2, 'Carter Newell', 'Rebecca Stevens', 'rstevens@carternewell.com', '+61 7 3000 8347', 'www.carternewell.com', 'Sydney / Brisbane / Melbourne'),
(3, 'Ivory Insurance', 'Shaun Oliver', 'shaun.oliver@ivoryinsurance.com.au', '+61 422 472 277', 'www.ivoryinsurance.com.au', 'Brisbane'),
(4, 'BizCover for Brokers', NULL, 'broker@bizcoverforbrokers.com.au', '1300 295 262', 'www.bizcoverforbrokers.com.au', 'Sydney'),
(5, 'Clover Insurance', 'Blair Nicholls', 'blair.nicholls@cloverinsure.com.au', '02 9000 6100', 'www.cloverinsure.com.au', 'Sydney'),
(6, 'Pen Underwriting', NULL, 'info.au@penunderwriting.com', '02 9323 5000', 'www.penunderwriting.com.au', 'Sydney');

INSERT INTO industry_insurance_underwriter (id, industry_id, insurance_id, underwriter_id) VALUES
(1, 2, 3, 1),
(2, 2, 3, 2),
(3, 2, 3, 3),
(4, 1, 2, 4),
(5, 1, 2, 5),
(6, 1, 2, 6);