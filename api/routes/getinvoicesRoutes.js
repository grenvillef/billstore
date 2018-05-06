'use strict';
module.exports = function(app) {
  var getInvoices = require('../controllers/getinvoicesController');

  // getInvoices Routes
  app.route('/tasks')
    .get(getInvoices.list_all_tasks)
    .post(getInvoices.create_a_task);


  app.route('/tasks/:taskId')
    .get(getInvoices.read_a_task)
    .put(getInvoices.update_a_task)
    .delete(getInvoices.delete_a_task);
};


