var express = require('express')
const pool = require('../db')
var router = express.Router()

/* GET users listing. */
router.post('/', async (req, res) => {
  try {
    const { nama_brg, ukuran_brg, jumlah_brg } = req.body
    const newItems = await pool.query(
      'INSERT INTO stock_barang (nama_brg,ukuran_brg, jumlah_brg) VALUES($1,$2, $3) RETURNING *',
      [nama_brg, ukuran_brg, jumlah_brg]
    )
    res.json(newItems)
  } catch (err) {
    console.error(err.message)
  }
})
router.get('/', async (req, res) => {
  try {
    const allItems = await pool.query('SELECT * FROM stock_barang')
    res.json(allItems.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const PerItem = await pool.query(
      ' select * from stock_barang where id_brg = $1;',
      [id]
    )
    res.json(PerItem.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nama_brg, ukuran_brg, jumlah_brg } = req.body
  try {
    const updateItem = await pool.query(
      'update stock_barang SET nama_brg=$1, ukuran_brg=$2, jumlah_brg=$3 WHERE id_brg=$4 RETURNING *',
      [nama_brg, ukuran_brg, jumlah_brg, id]
    )
    res.json(updateItem.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const deleteItem = await pool.query(
      'DELETE FROM stock_barang WHERE id_brg = $1',
      [id]
    )
    res.json('Item Deleted')
  } catch (err) {
    console.error(err.message)
  }
})
module.exports = router
