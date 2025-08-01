const {Router} = require("express")
const main_router = Router()
const main_ctrls = require("../contollers/main_controller")

main_router.get('/', main_ctrls.get_index)

main_router.post('/api/users', main_ctrls.signup_user)
main_router.post('/api/users/login', main_ctrls.login_user)

main_router.get('/api/session-test', main_ctrls.test_session)
module.exports = main_router