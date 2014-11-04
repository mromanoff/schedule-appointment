define (require, exports, module) ->
    AppController = require 'controllers/app_controller'

    module.exports = Marionette.AppRouter.extend(

      controller: new AppController()

      appRoutes:
        '': 'create'
        'create/:date': 'create'
        'cancel/:id': 'cancel'
        'update/:id': 'update'
        'detail/:id': 'detail'
        'error': 'error'
        '*allOthers': 'defaultPage'
    )

    return
