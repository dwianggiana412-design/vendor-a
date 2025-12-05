const express = require('express');
const app = express();
app.use(express.json()); // middleware = 
const PORT = 3300; 


let legacyProducts = [
    {
        "kd_produk": "A001",
        "nm_brg": "Kopi Bubuk 100g",
        "hrg": "15000", 
        "ket_stok": "ada"  
    },
    {
        "kd_produk": "A002",
        "nm_brg": "Gula Merah",
        "hrg": "12500", 
        "ket_stok": "habis" 
    },
    {
        "kd_produk": "A003",
        "nm_brg": "Minyak Goreng 1L",
        "hrg": "16500",
        "ket_stok": "ada"
  },
  {
        "kd_produk": "A004",
        "nm_brg": "Indomie Goreng",
        "hrg": "3500",
        "ket_stok": "ada"
  }
];

// implementasi endpoint
// get
app.get('/products', (req, res) => {
    res.json(legacyProducts);
});

// post
app.post('/products', (req, res) => {
    const newProduct = req.body;
    
    if (!newProduct.kd_produk || !newProduct.nm_brg || !newProduct.hrg) {
        return res.status(400).json({ message: "Data produk Legacy tidak lengkap." });
    }
    
    legacyProducts.push(newProduct);

    res.status(201).json({ 
        message: "Produk Legacy berhasil ditambahkan (POST)",
        product: newProduct 
    });
});

// put
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
    
    const index = legacyProducts.findIndex(p => p.kd_produk === productId);

    if (index === -1) {
        return res.status(404).json({ message: `Produk dengan KD ${productId} tidak ditemukan.` });
    }

    legacyProducts[index] = {
        ...legacyProducts[index], 
        ...updatedData           
    };

    res.json({ 
        message: `Produk dengan KD ${productId} berhasil diperbarui (PUT)`,
        product: legacyProducts[index]
    });
});

// delete
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const initialLength = legacyProducts.length;
    legacyProducts = legacyProducts.filter(p => p.kd_produk !== productId);

    if (legacyProducts.length === initialLength) {
        return res.status(404).json({ message: `Produk dengan KD ${productId} tidak ditemukan.` });
    }
    res.status(204).send(); 
});

app.listen(PORT, () => {
    console.log(`Vendor A (Legacy) API berjalan di http://localhost:${PORT}`);
});