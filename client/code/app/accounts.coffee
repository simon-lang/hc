
window.login = ({username, password}) ->
  ss.rpc 'app.authenticate', username, password, ({success, message}) ->
    console.log 'login response', success, message
    if success
      Nav.go 'app'
    # window.location.reload()

register = ({email, username, password, chart}) ->
  ss.rpc 'app.register', {email, username, password, chart} , (res) ->
    console.log res
    if res is "ERROR: username is taken"
      $(".register__alert").text "Username taken dickhead"
      $(".register__alert")[0].classList.add('register__alert--error')
      $(".register")[0].classList.add('register--alert')
    if res is 'OK'
      login
        username: $(this).find('input#username').val()
        password: $(this).find('input#password').val()
      $('.register__window').html('You good bro, you logged in')
    
logout = ->
  ss.rpc 'app.logout', ->
    window.location.reload()

$('form#login').submit (e) ->
  e.preventDefault()
  login
    username: $(this).find('input#username').val()
    password: $(this).find('input#password').val()

$('form#register').submit (e) ->
  e.preventDefault()
  register
    email: $(this).find('input#email').val()
    username: $(this).find('input#username').val()
    password: $(this).find('input#password').val()
    chart: collectionView.model

$('a.logout').click logout
