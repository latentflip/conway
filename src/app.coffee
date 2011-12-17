
evolution = (world) ->
  list = []
  _.each world, (cell) ->
    _.each neighbours(cell),(neigh) ->
      list.push neigh
  f = frequencies(list)
  
  result = []
  survivors = _.each f, (count,cell) ->
               result.push cell if survives(_.include(world,cell), count)
  result

survives = (state, n) ->
  state && _.include([2,3], n) || ( !state && n==3)

neighbours = (cell) ->
  [x,y] = _.map(cell.split(','), (v) -> parseInt(v))
  _.map([
    [x-1,y+1], [x,y+1], [x+1,y+1],
    [x-1,y],            [x+1,y],
    [x-1,y-1], [x,y-1], [x+1,y-1]
  ], (c) -> c.join(','))


frequencies = (items) ->
  fs = {}
  _.each items, (item) ->
    fs[item] = (fs[item]||0) + 1
  fs

print_world = (world) ->
  $('td').removeClass 'alive'
  for cell in world
    do (cell) ->
      [x,y] = _.map(cell.split(','), (v) -> parseInt(v))
      
      row = $($('table tr')[y])
      cell = $(row.find('td')[x])
      cell.addClass 'alive'
      

calc_state = ->
  state = []

  $table = $('table').first()
  $table.find('tr').each (y,row) ->
    $row = $(row)

    $row.find('td').each (x,cell) ->
      state.push [x,y].join(',') if $(cell).hasClass('alive')

  state

run_life = (state) ->
  next_state = state
  setInterval(
    (->
      next_state = evolution(next_state)
      print_world(next_state)
    ), 100)


$ ->
  for row in [1..50]
    do (row) ->
      row = $('<tr>')
      $('table').first().append(row)
      for cell in [1..50]
        do (cell) ->
          $cell = $('<td>')
          #$cell.addClass('alive') if Math.random() > 0.5
          row.append $cell
  
  mousedown = false

  $('table').mousedown -> mousedown = true
  $('table').mouseup -> mousedown = false

  $('td').hover(
    -> $(this).addClass 'alive' if mousedown
  )
  $('button').click ->
    run_life(calc_state())

  $('button.clear').click ->
    $('.alive').removeClass('alive')
