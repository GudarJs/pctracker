$('.viewlog').click(function () {
  var client = $(this).parent().parent()
  $.get('/logs/'+client[0].id)
  .done(function (data) {
    $('.log-results').empty()
    $('.log-results').append('<h2>Client logs</h2>')
    if (_.isEmpty(data)) { $('.log-results').append('<p>No logs to show.</p>') }
    _.each(data, function (log, key) {
      if (log.message == 'OK') { log.message = '<span class="text-success">' + log.message + '</span>' }
      if (log.message == 'DELETE') { log.message = '<span class="text-danger">' + log.message + '</span>' }
      var message = '<i class="fa fa-circle" aria-hidden="true"></i> [' + log.date + '] ' + log.client.mac_address + ' - ' + log.message
      $('.log-results').append('<p>' + message + '</p>')
    })
    $('.log-results').append('<button id="clear-logs" class="btn btn-default" onclick="clearLogs()">Hide logs</button>')
  })
  .fail(function(err) {
    console.log('query error: ' + err);
  })
  .always(function() {
    console.log('query finished');
  });
})

function clearLogs () {
  $('.log-results').empty()
}