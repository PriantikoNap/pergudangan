var express = require('express')
const pool = require('../db')
var router = express.Router()

/* GET home page. */
router.post('/', async function (req, res) {
  const { nama_org, company_org, alamat_org, nohp_org } = req.body
  try {
    const addOrg = await pool.query(
      'INSERT INTO pelanggan ( nama_org, company_org, alamat_org, nohp_org) VALUES ($1,$2,$3,$4) RETURNING *',
      [nama_org, company_org, alamat_org, nohp_org]
    )
    res.json(addOrg.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})
router.get('/', async function (req, res) {
  try {
    const AllOrg = await pool.query('SELECT * FROM pelanggan')
    res.json(AllOrg.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.get('/:id', async function (req, res) {
  const { id } = req.params
  try {
    const PerOrg = await pool.query('SELECT * FROM pelanggan WHERE id_org=$1', [
      id,
    ])
    res.json(PerOrg.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.put('/:id', async function (req, res) {
  const { id } = req.params
  const { nama_org, company_org, alamat_org, nohp_org } = req.body
  try {
    const updateOrg = await pool.query(
      'update pelanggan SET nama_org=$1, company_org=$2,alamat_org=$3, nohp_org=$4 WHERE id_org=$5 RETURNING *',
      [nama_org, company_org, alamat_org, nohp_org, id]
    )
    res.json(updateOrg.rows)
  } catch (err) {
    console.error(err.message)
  }
})
router.delete('/:id', async function (req, res) {
  const { id } = req.params
  try {
    const delOrg = await pool.query('DELETE FROM pelanggan WHERE id_org = $1', [
      id,
    ])
    res.json('has been deleted')
  } catch (err) {
    console.error(err.message)
  }
})
module.exports = router
