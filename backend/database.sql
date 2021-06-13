CREATE TABLE stock_barang(
    id_brg SERIAL PRIMARY KEY,
    nama_brg VARCHAR(255),
    ukuran_brg VARCHAR(255),
    jumlah_brg INT
);
CREATE TABLE pelanggan(
    id_org SERIAL PRIMARY KEY,
    nama_org VARCHAR(255),
    company_org VARCHAR(255),
    alamat_org VARCHAR(255),
    nohp_org VARCHAR(255)
);
CREATE TABLE transaksi(
    saleid SERIAL PRIMARY KEY,
    productid SERIAL,
    customerid SERIAL,
    items INT,
    price INT,
    amount INT,
    paid INT,
    lunas BOOL,
    debt INT,
    notes TEXT,
    FOREIGN KEY (productid) REFERENCES stock_barang(id_brg),
    FOREIGN KEY (customerid) REFERENCES pelanggan(id_org)
);