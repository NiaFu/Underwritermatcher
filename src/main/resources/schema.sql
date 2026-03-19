CREATE TABLE underwriter (
    id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    web VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE industry (
    id BIGINT PRIMARY KEY,
    industry_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE insurance (
    id BIGINT PRIMARY KEY,
    insurance_name VARCHAR(255) NOT NULL UNIQUE,
    insurance_type VARCHAR(255)
);

CREATE TABLE industry_insurance_underwriter (
    id BIGINT PRIMARY KEY,
    industry_id BIGINT NOT NULL,
    insurance_id BIGINT NOT NULL,
    underwriter_id BIGINT NOT NULL,
    CONSTRAINT fk_mapping_industry FOREIGN KEY (industry_id) REFERENCES industry(id),
    CONSTRAINT fk_mapping_insurance FOREIGN KEY (insurance_id) REFERENCES insurance(id),
    CONSTRAINT fk_mapping_underwriter FOREIGN KEY (underwriter_id) REFERENCES underwriter(id)
);