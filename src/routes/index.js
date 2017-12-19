import Router from 'koa-router'
import indexCtrl from '../controllers/indexCtrl'
import cartCtrl from '../controllers/cartCtrl'
import addressCtrl from '../controllers/addressCtrl'
import addProductCtrl from '../controllers/addProductCtrl'
import getProductsCtrl from '../controllers/getProductsCtrl'
import updateProductCtrl from '../controllers/updateProductCtrl'
import delProductCtrl from '../controllers/delProductCtrl'
import searchProductCtrl from '../controllers/searchProductCtrl'

const router = Router()

router.get('/', indexCtrl)
router.get('/cart',cartCtrl)
router.get('/address',addressCtrl)
router.get('/products',getProductsCtrl)
router.get('/delProduct',delProductCtrl)
router.get('/searchProduct',searchProductCtrl)

router.post('/addProduct',addProductCtrl)
router.post("/updateProduct",updateProductCtrl)



export default router
