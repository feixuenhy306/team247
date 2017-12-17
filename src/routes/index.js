import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import cartCtrl from '../controllers/cartCtrl'
import addressCtrl from '../controllers/addressCtrl'
import addProductCtrl from '../controllers/addProductCtrl'
import getProductsCtrl from '../controllers/getProductsCtrl'

const router = Router()

router.get('/', indexCtrl)
router.get('/cart',cartCtrl)
router.get('/address',addressCtrl)
router.post('/addProduct',addProductCtrl)
router.get('products',getProductsCtrl)


export default router
